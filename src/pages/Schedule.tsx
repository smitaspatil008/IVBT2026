import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Trophy } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import { useTournamentStore } from '../store/tournamentStore';
import type { Match } from '../types';
import LiveBadge from '../components/ui/LiveBadge';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

function getRoundLabel(match: Match): string {
  if (match.group) {
    const groupLetter = match.group === 'g1' ? 'A' : match.group === 'g2' ? 'B' : match.group === 'g3' ? 'C' : 'D';
    return `Group ${groupLetter}`;
  }
  if (match.id === 'sf1') return 'Semi-Final 1';
  if (match.id === 'sf2') return 'Semi-Final 2';
  if (match.id === 'f1') return 'Grand Final';
  return match.round;
}

function getRoundColor(match: Match): string {
  if (match.group === 'g1') return '#6366f1';
  if (match.group === 'g2') return '#ff167a';
  if (match.group === 'g3') return '#10b981';
  if (match.group === 'g4') return '#ffc857';
  if (match.id.startsWith('sf')) return '#ff167a';
  if (match.id === 'f1') return '#ffc857';
  return '#6366f1';
}

function MatchRow({ match, index }: { match: Match; index: number }) {
  const { teams } = useTournamentStore(useShallow((s) => ({ teams: s.teams })));
  const teamA = teams.find((t) => t.id === match.teamAId);
  const teamB = teams.find((t) => t.id === match.teamBId);
  const isDone = match.status === 'completed';
  const isLive = match.status === 'live';
  const roundLabel = getRoundLabel(match);
  const roundColor = getRoundColor(match);

  const currentGame = match.games?.[match.currentGame];

  return (
    <motion.div variants={item}>
      <Link to={`/match/${match.id}`}>
        <div
          className={`group rounded-xl border p-3 sm:p-4 transition-all hover:shadow-lg hover:-translate-y-0.5 ${
            isLive
              ? 'border-red-500/50 bg-red-950/20 shadow-md shadow-red-500/10'
              : isDone
              ? 'border-[#ff167a]/20 bg-[#111a35]'
              : 'border-[#293452]/30 bg-[#111a35] hover:border-[#293452]/60'
          }`}
        >
          {/* Top row: match number, round label, time, status */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                style={{ background: roundColor }}
              >
                {roundLabel}
              </span>
              <span className="text-[10px] text-[#7a8aaa]/40 font-medium">
                Match {index + 1}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {isLive && <LiveBadge />}
              {isDone && (
                <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                  Completed
                </span>
              )}
              {!isLive && !isDone && (
                <span className="flex items-center gap-1 text-[10px] text-[#7a8aaa]/50">
                  <Clock className="h-3 w-3" />
                  {formatTime(match.scheduledAt)}
                </span>
              )}
            </div>
          </div>

          {/* Teams row */}
          <div className="flex items-center gap-3">
            {/* Team A */}
            <div className="shrink-0 w-[30%] sm:w-auto sm:min-w-[160px]">
              <div className="flex items-center gap-2">
                <div
                  className="h-8 w-8 sm:h-9 sm:w-9 shrink-0 rounded-lg flex items-center justify-center text-white text-[10px] font-bold"
                  style={{ backgroundColor: teamA?.color ?? '#333' }}
                >
                  {teamA?.name?.charAt(0) ?? '?'}
                </div>
                <div className="min-w-0">
                  <p className={`truncate text-sm font-semibold ${
                    isDone && match.winner === match.teamAId ? 'text-[#ff167a]' : 'text-white'
                  }`}>
                    {teamA?.name ?? 'TBD'}
                  </p>
                </div>
              </div>
            </div>

            {/* Score / VS / Animation */}
            <div className="flex-1 text-center min-w-[5rem]">
              {isDone && match.games && match.games.length > 0 ? (
                <div className="flex items-center justify-center gap-1">
                  {match.games.map((g, i) => (
                    <span key={i} className="text-[11px] font-mono font-medium text-[#aab4cc]/60">
                      {g.scoreA}-{g.scoreB}
                    </span>
                  ))}
                </div>
              ) : isLive && currentGame ? (
                <div>
                  <p className="text-base font-bold text-red-400">
                    {currentGame.scoreA} - {currentGame.scoreB}
                  </p>
                </div>
              ) : (
                <div className="relative h-12 flex items-center justify-center">
                  <svg viewBox="0 0 120 50" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    {/* Player A - swinging */}
                    <g className="animate-pulse" style={{ animationDuration: '2s' }}>
                      {/* Body */}
                      <circle cx="25" cy="14" r="5" fill="#818cf8" />
                      <line x1="25" y1="19" x2="25" y2="32" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" />
                      {/* Legs */}
                      <line x1="25" y1="32" x2="19" y2="42" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" />
                      <line x1="25" y1="32" x2="31" y2="42" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" />
                      {/* Arm with racket */}
                      <line x1="25" y1="23" x2="35" y2="16" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round">
                        <animateTransform attributeName="transform" type="rotate" values="0 25 23;-20 25 23;0 25 23" dur="1.2s" repeatCount="indefinite" />
                      </line>
                      {/* Racket */}
                      <ellipse cx="38" cy="12" rx="4" ry="5" fill="none" stroke="#c084fc" strokeWidth="1.2">
                        <animateTransform attributeName="transform" type="rotate" values="0 25 23;-20 25 23;0 25 23" dur="1.2s" repeatCount="indefinite" />
                      </ellipse>
                      {/* Other arm */}
                      <line x1="25" y1="23" x2="18" y2="28" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" />
                    </g>

                    {/* Shuttlecock flying */}
                    <g>
                      <circle cx="60" cy="15" r="2.5" fill="#fbbf24">
                        <animate attributeName="cx" values="38;82;38" dur="1.2s" repeatCount="indefinite" />
                        <animate attributeName="cy" values="12;12;12" dur="1.2s" repeatCount="indefinite" />
                      </circle>
                      {/* Feathers */}
                      <line x1="60" y1="17" x2="57" y2="22" stroke="#fbbf24" strokeWidth="0.8" opacity="0.6">
                        <animate attributeName="x1" values="38;82;38" dur="1.2s" repeatCount="indefinite" />
                        <animate attributeName="x2" values="35;79;35" dur="1.2s" repeatCount="indefinite" />
                        <animate attributeName="y1" values="14;14;14" dur="1.2s" repeatCount="indefinite" />
                        <animate attributeName="y2" values="19;19;19" dur="1.2s" repeatCount="indefinite" />
                      </line>
                    </g>

                    {/* Player B - swinging */}
                    <g className="animate-pulse" style={{ animationDuration: '2s', animationDelay: '0.6s' }}>
                      {/* Body */}
                      <circle cx="95" cy="14" r="5" fill="#f472b6" />
                      <line x1="95" y1="19" x2="95" y2="32" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" />
                      {/* Legs */}
                      <line x1="95" y1="32" x2="89" y2="42" stroke="#f472b6" strokeWidth="1.5" strokeLinecap="round" />
                      <line x1="95" y1="32" x2="101" y2="42" stroke="#f472b6" strokeWidth="1.5" strokeLinecap="round" />
                      {/* Arm with racket */}
                      <line x1="95" y1="23" x2="85" y2="16" stroke="#f472b6" strokeWidth="1.5" strokeLinecap="round">
                        <animateTransform attributeName="transform" type="rotate" values="0 95 23;20 95 23;0 95 23" dur="1.2s" repeatCount="indefinite" begin="0.6s" />
                      </line>
                      {/* Racket */}
                      <ellipse cx="82" cy="12" rx="4" ry="5" fill="none" stroke="#fb7185" strokeWidth="1.2">
                        <animateTransform attributeName="transform" type="rotate" values="0 95 23;20 95 23;0 95 23" dur="1.2s" repeatCount="indefinite" begin="0.6s" />
                      </ellipse>
                      {/* Other arm */}
                      <line x1="95" y1="23" x2="102" y2="28" stroke="#f472b6" strokeWidth="1.5" strokeLinecap="round" />
                    </g>

                    {/* Net */}
                    <line x1="60" y1="5" x2="60" y2="48" stroke="#4f46e5" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.4" />
                  </svg>
                </div>
              )}
            </div>

            {/* Team B */}
            <div className="shrink-0 w-[30%] sm:w-auto sm:min-w-[160px]">
              <div className="flex items-center gap-2 justify-end">
                <div className="min-w-0 text-right">
                  <p className={`truncate text-sm font-semibold ${
                    isDone && match.winner === match.teamBId ? 'text-[#ff167a]' : 'text-white'
                  }`}>
                    {teamB?.name ?? 'TBD'}
                  </p>
                </div>
                <div
                  className="h-8 w-8 sm:h-9 sm:w-9 shrink-0 rounded-lg flex items-center justify-center text-white text-[10px] font-bold"
                  style={{ backgroundColor: teamB?.color ?? '#333' }}
                >
                  {teamB?.name?.charAt(0) ?? '?'}
                </div>
              </div>
            </div>
          </div>

          {/* Footer: court */}
          {match.court && (
            <div className="mt-2.5 flex items-center gap-1 text-[10px] text-[#7a8aaa]/40">
              <MapPin className="h-3 w-3" />
              {match.court}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

export default function Schedule() {
  const { matches } = useTournamentStore(useShallow((s) => ({ matches: s.matches })));

  const { day1, day2 } = useMemo(() => {
    const sorted = [...matches].sort(
      (a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime(),
    );
    const d1: Match[] = [];
    const d2: Match[] = [];
    for (const m of sorted) {
      const d = new Date(m.scheduledAt);
      if (d.getDate() === 24) d1.push(m);
      else d2.push(m);
    }
    return { day1: d1, day2: d2 };
  }, [matches]);

  const liveCount = matches.filter((m) => m.status === 'live').length;
  const doneCount = matches.filter((m) => m.status === 'completed').length;

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 pb-12">
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="flex items-center gap-3 text-2xl font-bold text-white md:text-3xl">
          <Calendar className="h-7 w-7 text-[#ff167a]" />
          Match Schedule
        </h1>
        <p className="mt-1 text-sm text-[#aab4cc]/50">
          {matches.length} matches across 2 days
          {liveCount > 0 && <span className="text-red-400 font-medium"> · {liveCount} live now</span>}
          {doneCount > 0 && <span> · {doneCount} completed</span>}
        </p>
      </motion.div>

      {/* Day 1 */}
      <motion.div variants={item}>
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-2 rounded-xl bg-[#293452]/40 px-4 py-2">
            <Calendar className="h-4 w-4 text-[#aab4cc]" />
            <div>
              <div className="text-sm font-bold text-white">Day 1 — Saturday, 24 Oct</div>
              <div className="text-[10px] text-[#aab4cc]/50">Group Stage · {day1.length} matches</div>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          {day1.map((m, i) => (
            <MatchRow key={m.id} match={m} index={i} />
          ))}
        </div>
      </motion.div>

      {/* Day 2 */}
      <motion.div variants={item}>
        <div className="flex items-center gap-3 mb-4 mt-4">
          <div className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ff167a]/10 to-[#ffc857]/10 border border-[#ff167a]/20 px-4 py-2">
            <Trophy className="h-4 w-4 text-[#ffc857]" />
            <div>
              <div className="text-sm font-bold text-white">Day 2 — Sunday, 25 Oct</div>
              <div className="text-[10px] text-[#aab4cc]/50">Semifinals & Final · {day2.length} matches</div>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          {day2.map((m, i) => (
            <MatchRow key={m.id} match={m} index={day1.length + i} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
