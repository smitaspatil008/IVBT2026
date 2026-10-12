import { useMemo, useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTournamentStore } from '../store/tournamentStore';
import type { Match } from '../types';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

/* ── mini group card (used in the graphical bracket) ────────────────────── */
function MiniGroup({ groupId, groupName, qualifyRef }: {
  groupId: string; groupName: string;
  qualifyRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const { getGroupStandings, teams, matches } = useTournamentStore();
  const standings = getGroupStandings(groupId);
  const groupMatches = matches.filter((m) => m.group === groupId);
  const completed = groupMatches.filter((m) => m.status === 'completed').length;
  const total = groupMatches.length;
  const getTeam = (id: string) => teams.find((t) => t.id === id);

  return (
    <div className="rounded-xl border border-[#293452]/40 bg-[#111a35] overflow-hidden w-full">
      <div className="px-3 py-2 bg-[#293452]/40 flex items-center justify-between">
        <span className="text-sm font-bold text-white">{groupName}</span>
        <span className="text-[10px] text-[#aab4cc]/50">{completed}/{total} played</span>
      </div>

      <div className="divide-y divide-[#293452]/20">
        {standings.map((s, i) => {
          const team = getTeam(s.teamId);
          const isLeader = i === 0 && completed > 0;
          const isFirst = i === 0;
          return (
            <div
              key={s.teamId}
              ref={isFirst ? qualifyRef : undefined}
              className={`flex items-center justify-between px-3 py-2 ${
                isLeader ? 'bg-[#ff167a]/5 border-l-2 border-[#ff167a]' :
                isFirst ? 'border-l-2 border-[#293452]/30' : ''
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[10px] font-bold text-[#7a8aaa]/40 w-3">{i + 1}</span>
                <span
                  className="w-5 h-5 rounded flex items-center justify-center text-white text-[8px] font-bold flex-shrink-0"
                  style={{ background: team?.color ?? '#6366f1' }}
                >
                  {team?.name?.charAt(0) ?? '?'}
                </span>
                <span className={`text-xs font-medium truncate ${isLeader ? 'text-pink-300' : 'text-indigo-100'}`}>
                  {team?.name ?? 'TBD'}
                </span>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-[#aab4cc]/50 flex-shrink-0">
                <span>{s.played}P</span>
                <span className="text-emerald-400">{s.won}W</span>
                <span className="text-red-400">{s.lost}L</span>
                <span className="font-bold text-white w-4 text-right">{s.points}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-[#293452]/30 px-3 py-2 space-y-1">
        {groupMatches.map((m) => {
          const tA = getTeam(m.teamAId);
          const tB = getTeam(m.teamBId);
          const isDone = m.status === 'completed';
          const isLive = m.status === 'live';
          return (
            <Link
              key={m.id}
              to={`/match/${m.id}`}
              className={`flex items-center justify-between rounded-lg px-2 py-1 text-[10px] transition hover:bg-[#293452]/30 ${
                isLive ? 'bg-red-500/10 ring-1 ring-red-500/30' : isDone ? 'bg-[#293452]/10' : ''
              }`}
            >
              <div className="flex items-center gap-1.5 min-w-0 flex-1">
                <span className={`font-semibold truncate ${isDone && m.winner === m.teamAId ? 'text-[#ff167a]' : 'text-[#aab4cc]/70'}`}>
                  {tA?.name ?? '?'}
                </span>
                <span className="text-[#7a8aaa]/30 flex-shrink-0">vs</span>
                <span className={`font-semibold truncate ${isDone && m.winner === m.teamBId ? 'text-[#ff167a]' : 'text-[#aab4cc]/70'}`}>
                  {tB?.name ?? '?'}
                </span>
              </div>
              {isLive && (
                <span className="flex items-center gap-1 text-red-400 font-bold flex-shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />LIVE
                </span>
              )}
              {isDone && <span className="text-emerald-400 font-medium flex-shrink-0">Done</span>}
              {!isDone && !isLive && (
                <span className="text-[#7a8aaa]/30 flex-shrink-0">
                  {new Date(m.scheduledAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/* ── knockout match card ────────────────────────────────────────────────── */
function MatchCard({ match, label, accent, innerRef }: {
  match: Match | undefined; label: string; accent: string;
  innerRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const teams = useTournamentStore((s) => s.teams);
  if (!match) return null;

  const teamA = teams.find((t) => t.id === match.teamAId);
  const teamB = teams.find((t) => t.id === match.teamBId);
  const isDone = match.status === 'completed';
  const isLive = match.status === 'live';
  const hasTeams = match.teamAId || match.teamBId;

  const renderSide = (team: typeof teamA, isWinner: boolean) => (
    <div className={`flex items-center gap-2 px-3 py-2 ${isWinner && isDone ? 'bg-[#ff167a]/10' : ''}`}>
      {team ? (
        <>
          <span
            className="w-6 h-6 rounded flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0"
            style={{ background: isWinner && isDone ? '#ff167a' : team.color }}
          >
            {team.name.charAt(0)}
          </span>
          <span className={`text-xs font-medium truncate ${isWinner && isDone ? 'text-[#ff167a] font-bold' : 'text-indigo-100'}`}>
            {team.name}
          </span>
          {isWinner && isDone && <span className="text-[#ff167a] text-xs ml-auto flex-shrink-0">✓</span>}
        </>
      ) : (
        <>
          <span className="w-6 h-6 rounded bg-[#293452]/50 text-[#7a8aaa]/30 text-[9px] font-bold flex items-center justify-center flex-shrink-0">?</span>
          <span className="text-[#7a8aaa]/30 italic text-xs">TBD</span>
        </>
      )}
    </div>
  );

  return (
    <div ref={innerRef}>
      <Link to={hasTeams ? `/match/${match.id}` : '#'} className="block">
        <motion.div
          whileHover={hasTeams ? { scale: 1.02 } : undefined}
          className={`rounded-xl overflow-hidden border transition-shadow ${
            isLive ? 'border-red-500 shadow-lg shadow-red-500/20' :
            isDone ? 'border-pink-400/30 shadow-md shadow-[#ff167a]/10' :
            'border-[#293452]/40'
          }`}
        >
          <div className={`px-3 py-1.5 text-[10px] font-bold text-white flex items-center justify-between ${accent}`}>
            <span>{label}</span>
            {isLive && <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> LIVE</span>}
            {isDone && <span className="text-white/70">✓ Complete</span>}
            {!isLive && !isDone && match.scheduledAt && (
              <span className="text-white/60">
                {new Date(match.scheduledAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })},{' '}
                {new Date(match.scheduledAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
          </div>
          <div className="bg-[#111a35] divide-y divide-[#293452]/20">
            {renderSide(teamA, match.winner === match.teamAId)}
            {renderSide(teamB, match.winner === match.teamBId)}
          </div>
        </motion.div>
      </Link>
    </div>
  );
}

/* ── SVG connector lines ────────────────────────────────────────────────── */
function BracketConnectors({ wrapperRef, points }: {
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  points: { from: React.RefObject<HTMLDivElement | null>; to: React.RefObject<HTMLDivElement | null>; color: string }[];
}) {
  const [lines, setLines] = useState<{ x1: number; y1: number; x2: number; y2: number; color: string }[]>([]);

  useEffect(() => {
    function calc() {
      if (!wrapperRef.current) return;
      const wr = wrapperRef.current.getBoundingClientRect();
      const next: typeof lines = [];
      for (const p of points) {
        if (!p.from.current || !p.to.current) continue;
        const fr = p.from.current.getBoundingClientRect();
        const tr = p.to.current.getBoundingClientRect();
        next.push({
          x1: fr.right - wr.left,
          y1: fr.top + fr.height / 2 - wr.top,
          x2: tr.left - wr.left,
          y2: tr.top + tr.height / 2 - wr.top,
          color: p.color,
        });
      }
      setLines(next);
    }
    calc();
    window.addEventListener('resize', calc);
    const timer = setTimeout(calc, 500);
    return () => { window.removeEventListener('resize', calc); clearTimeout(timer); };
  }, [wrapperRef, points]);

  if (lines.length === 0) return null;

  return (
    <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
      <defs>
        <marker id="arrowPink" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" fill="none" stroke="#ff167a" strokeWidth="1.5" />
        </marker>
        <marker id="arrowGold" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" fill="none" stroke="#ffc857" strokeWidth="1.5" />
        </marker>
      </defs>
      {lines.map((l, i) => {
        const midX = (l.x1 + l.x2) / 2;
        return (
          <path
            key={i}
            d={`M${l.x1},${l.y1} C${midX},${l.y1} ${midX},${l.y2} ${l.x2},${l.y2}`}
            fill="none"
            stroke={l.color}
            strokeWidth="2"
            strokeDasharray="6 3"
            opacity="0.5"
            markerEnd={l.color.includes('eab') ? 'url(#arrowGold)' : 'url(#arrowPink)'}
          />
        );
      })}
    </svg>
  );
}

/* ── main bracket page ──────────────────────────────────────────────────── */
export default function Bracket() {
  const { matches, teams } = useTournamentStore();

  const sf1 = matches.find((m) => m.id === 'sf1');
  const sf2 = matches.find((m) => m.id === 'sf2');
  const final = matches.find((m) => m.id === 'f1');
  const champion = final?.winner ? teams.find((t) => t.id === final.winner) : null;

  const groupMatches = useMemo(() => matches.filter((m) => m.group), [matches]);
  const groupsDone = useMemo(() => groupMatches.filter((m) => m.status === 'completed').length, [groupMatches]);
  const allGroupsDone = groupsDone === groupMatches.length && groupMatches.length > 0;

  // Refs for SVG connectors (desktop bracket view)
  const bracketWrapRef = useRef<HTMLDivElement>(null);
  const gARef = useRef<HTMLDivElement>(null);
  const gBRef = useRef<HTMLDivElement>(null);
  const gCRef = useRef<HTMLDivElement>(null);
  const gDRef = useRef<HTMLDivElement>(null);
  const sf1Ref = useRef<HTMLDivElement>(null);
  const sf2Ref = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLDivElement>(null);

  const connectorPoints = useMemo(() => [
    { from: gARef, to: sf1Ref, color: '#ff167a' },
    { from: gBRef, to: sf1Ref, color: '#ff167a' },
    { from: gCRef, to: sf2Ref, color: '#ff167a' },
    { from: gDRef, to: sf2Ref, color: '#ff167a' },
    { from: sf1Ref, to: finalRef, color: '#ffc857' },
    { from: sf2Ref, to: finalRef, color: '#ffc857' },
  ], []);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 pb-12">
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="flex items-center gap-3 text-2xl font-bold text-white md:text-3xl">
          <Trophy className="h-7 w-7 text-[#ff167a]" />
          Tournament Bracket
        </h1>
        <p className="mt-1 text-sm text-[#aab4cc]/50">
          4 Groups → 4 Winners → Semifinals → Final → Champion
        </p>
      </motion.div>

      {/* Progress flow pills */}
      <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-2 text-xs">
        <span className="px-3 py-1.5 rounded-full bg-[#293452]/50 text-[#aab4cc] font-medium">
          Group Stage ({groupsDone}/{groupMatches.length})
        </span>
        <ChevronRight className="w-4 h-4 text-[#7a8aaa]/30" />
        <span className={`px-3 py-1.5 rounded-full font-medium ${allGroupsDone ? 'bg-[#ff167a]/20 text-pink-300' : 'bg-[#293452]/30 text-[#7a8aaa]/40'}`}>
          Semifinals
        </span>
        <ChevronRight className="w-4 h-4 text-[#7a8aaa]/30" />
        <span className={`px-3 py-1.5 rounded-full font-medium ${sf1?.status === 'completed' && sf2?.status === 'completed' ? 'bg-[#ffc857]/20 text-[#ffc857]' : 'bg-[#293452]/30 text-[#7a8aaa]/40'}`}>
          Final
        </span>
        <ChevronRight className="w-4 h-4 text-[#7a8aaa]/30" />
        <span className={`px-3 py-1.5 rounded-full font-medium ${champion ? 'bg-[#ffc857]/20 text-[#ffc857]' : 'bg-[#293452]/30 text-[#7a8aaa]/40'}`}>
          🏆 Champion
        </span>
      </motion.div>

      {/* Tiebreaker info */}
      <motion.div variants={item} className="rounded-lg border border-[#293452]/20 bg-[#293452]/5 px-4 py-2.5 text-xs text-[#aab4cc]/60">
        <span className="font-semibold text-[#aab4cc]/80">Tiebreaker rule:</span> In case of a tie in group stage, a decider match (1 set, 11 points) will determine the group winner.
      </motion.div>

      {/* ═══════════ DESKTOP GRAPHICAL BRACKET ═══════════ */}
      <motion.div variants={item} className="hidden lg:block">
        <div ref={bracketWrapRef} className="relative">
          <BracketConnectors wrapperRef={bracketWrapRef} points={connectorPoints} />

          <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] gap-x-8 items-start">
            {/* Column 1: Groups */}
            <div className="space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#7a8aaa]/40 mb-2">Group Stage — Sat, 24 Oct</div>
              <MiniGroup groupId="g1" groupName="Group A" qualifyRef={gARef} />
              <MiniGroup groupId="g2" groupName="Group B" qualifyRef={gBRef} />
              <MiniGroup groupId="g3" groupName="Group C" qualifyRef={gCRef} />
              <MiniGroup groupId="g4" groupName="Group D" qualifyRef={gDRef} />
            </div>

            {/* Column 2: gap for connector lines */}
            <div className="w-16" />

            {/* Column 3: Semifinals */}
            <div className="flex flex-col justify-center min-h-full space-y-6 py-20">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#7a8aaa]/40 mb-2">Semifinals — Sun, 25 Oct</div>
              <div>
                <div className="text-[10px] text-[#ff167a]/60 mb-1 font-medium">Winner A vs Winner B</div>
                <MatchCard match={sf1} label="Semi-Final 1" accent="bg-[#ff167a]" innerRef={sf1Ref} />
              </div>
              <div className="h-8" />
              <div>
                <div className="text-[10px] text-[#ff167a]/60 mb-1 font-medium">Winner C vs Winner D</div>
                <MatchCard match={sf2} label="Semi-Final 2" accent="bg-[#ff167a]" innerRef={sf2Ref} />
              </div>
            </div>

            {/* Column 4: gap for connector lines */}
            <div className="w-16" />

            {/* Column 5: Final + Champion */}
            <div className="flex flex-col justify-center min-h-full space-y-6 py-48">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#7a8aaa]/40 mb-2">Final — Sun, 25 Oct</div>
              <MatchCard match={final} label="Grand Final" accent="bg-gradient-to-r from-[#ffc857] to-amber-500" innerRef={finalRef} />

              {champion ? (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
                  className="rounded-2xl p-5 text-center bg-gradient-to-b from-[#ffc857]/10 via-amber-500/5 to-transparent border-2 border-[#ffc857]/30 shadow-xl shadow-[#ffc857]/10"
                >
                  <Trophy className="w-10 h-10 text-[#ffc857] mx-auto mb-2" />
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold mx-auto mb-2 shadow-lg"
                    style={{ background: champion.color }}
                  >
                    {champion.name.charAt(0)}
                  </div>
                  <div className="font-bold text-[#ffc857]">{champion.name}</div>
                  <div className="text-[10px] text-[#ffc857]/60 font-semibold mt-1 uppercase tracking-widest">Champion</div>
                </motion.div>
              ) : (
                <div className="rounded-2xl p-5 text-center border-2 border-dashed border-[#293452]/30">
                  <Trophy className="w-8 h-8 text-indigo-700 mx-auto mb-2" />
                  <div className="text-sm font-semibold text-[#aab4cc]/40">Champion TBD</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ═══════════ MOBILE / TABLET VERTICAL FLOW ═══════════ */}
      <div className="lg:hidden space-y-6">
        {/* Groups */}
        <motion.div variants={item}>
          <h2 className="text-base font-bold text-white mb-1 flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-[#293452] text-[#aab4cc] text-[10px] font-bold flex items-center justify-center">1</span>
            Group Stage
            <span className="text-[10px] font-normal text-[#aab4cc]/50 ml-1">Sat, 24 Oct</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
            <MiniGroup groupId="g1" groupName="Group A" />
            <MiniGroup groupId="g2" groupName="Group B" />
            <MiniGroup groupId="g3" groupName="Group C" />
            <MiniGroup groupId="g4" groupName="Group D" />
          </div>
        </motion.div>

        {/* Connector */}
        <div className="flex flex-col items-center py-1">
          <div className="w-px h-4 bg-gradient-to-b from-[#293452]/40 to-[#ff167a]/40" />
          <div className="w-6 h-6 rounded-full bg-[#ff167a]/10 border border-[#ff167a]/30 flex items-center justify-center">
            <ChevronRight className="w-3 h-3 text-[#ff167a] rotate-90" />
          </div>
          <span className="text-[9px] text-[#ff167a]/60 mt-1 font-medium">Group Winners advance</span>
          <div className="w-px h-4 bg-gradient-to-b from-[#ff167a]/40 to-[#293452]/40" />
        </div>

        {/* Semifinals */}
        <motion.div variants={item}>
          <h2 className="text-base font-bold text-white mb-1 flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-[#ff167a] text-white text-[10px] font-bold flex items-center justify-center">2</span>
            Semifinals
            <span className="text-[10px] font-normal text-[#aab4cc]/50 ml-1">Sun, 25 Oct</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
            <div>
              <div className="text-[10px] text-[#ff167a]/60 mb-1 font-medium">Winner A vs Winner B</div>
              <MatchCard match={sf1} label="Semi-Final 1" accent="bg-[#ff167a]" />
            </div>
            <div>
              <div className="text-[10px] text-[#ff167a]/60 mb-1 font-medium">Winner C vs Winner D</div>
              <MatchCard match={sf2} label="Semi-Final 2" accent="bg-[#ff167a]" />
            </div>
          </div>
        </motion.div>

        {/* Connector */}
        <div className="flex flex-col items-center py-1">
          <div className="w-px h-4 bg-gradient-to-b from-[#293452]/40 to-[#ffc857]/40" />
          <div className="w-6 h-6 rounded-full bg-[#ffc857]/10 border border-[#ffc857]/30 flex items-center justify-center">
            <ChevronRight className="w-3 h-3 text-[#ffc857] rotate-90" />
          </div>
          <span className="text-[9px] text-[#ffc857]/60 mt-1 font-medium">Winners advance</span>
          <div className="w-px h-4 bg-gradient-to-b from-[#ffc857]/40 to-[#293452]/40" />
        </div>

        {/* Final */}
        <motion.div variants={item}>
          <h2 className="text-base font-bold text-white mb-1 flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-[#ffc857] text-white text-[10px] font-bold flex items-center justify-center">3</span>
            Grand Final
            <span className="text-[10px] font-normal text-[#aab4cc]/50 ml-1">Sun, 25 Oct</span>
          </h2>
          <div className="max-w-sm mt-3">
            <MatchCard match={final} label="Grand Final" accent="bg-gradient-to-r from-[#ffc857] to-amber-500" />
          </div>
        </motion.div>

        {/* Champion */}
        {champion ? (
          <motion.div variants={item} className="flex flex-col items-center py-4">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
              className="rounded-2xl p-6 text-center bg-gradient-to-b from-[#ffc857]/10 via-amber-500/5 to-transparent border-2 border-[#ffc857]/30 shadow-xl shadow-[#ffc857]/10 max-w-xs w-full"
            >
              <Trophy className="w-12 h-12 text-[#ffc857] mx-auto mb-3" />
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg mx-auto mb-3 shadow-lg"
                style={{ background: champion.color }}
              >
                {champion.name.charAt(0)}
              </div>
              <div className="font-bold text-lg text-[#ffc857]">{champion.name}</div>
              <div className="text-xs text-[#ffc857]/60 font-semibold mt-1 uppercase tracking-widest">IVBT 2026 Champion</div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div variants={item} className="flex flex-col items-center py-4">
            <div className="rounded-2xl p-5 text-center border-2 border-dashed border-[#293452]/30 max-w-xs w-full">
              <Trophy className="w-8 h-8 text-indigo-700 mx-auto mb-2" />
              <div className="text-sm font-semibold text-[#aab4cc]/40">Champion TBD</div>
              <div className="text-[10px] text-[#7a8aaa]/30 mt-1">Will be decided after the Final</div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
