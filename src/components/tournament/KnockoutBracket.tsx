import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy } from 'lucide-react';
import type { Match } from '../../types';
import { useTournamentStore } from '../../store/tournamentStore';

const ROUND_COLORS: Record<string, { bg: string; label: string }> = {
  sf:    { bg: 'bg-[#ff167a]',   label: 'Semi Finals' },
  final: { bg: 'bg-[#ffc857]', label: 'Final' },
};

function BracketMatchCard({ match, round, isChampion }: {
  match: Match; round: string; isChampion?: boolean;
}) {
  const teams = useTournamentStore((s) => s.teams);
  const teamA = teams.find((t) => t.id === match.teamAId);
  const teamB = teams.find((t) => t.id === match.teamBId);
  const isLive = match.status === 'live';
  const isDone = match.status === 'completed';
  const rc = ROUND_COLORS[round] ?? ROUND_COLORS.sf;

  const renderTeam = (team: typeof teamA, _teamId: string, isWinner: boolean, pos: 'top' | 'bottom') => (
    <div className={`flex items-center justify-between px-2.5 py-2 ${pos === 'top' ? 'border-b border-[#293452]/30' : ''} ${isWinner && isDone ? 'bg-[#ff167a]/10' : ''}`}>
      <div className="flex items-center gap-2 min-w-0">
        {team ? (
          <>
            <span className="w-6 h-6 rounded text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 shadow-sm"
              style={{ background: isWinner && isDone ? '#ff167a' : team.color }}>
              {team.name.charAt(0)}
            </span>
            <span className={`truncate text-xs sm:text-sm ${isWinner && isDone ? 'font-bold text-[#ff167a]' : 'font-medium text-indigo-100'}`}>
              {team.name}
            </span>
            {isWinner && <span className="text-[#ff167a] text-xs">✓</span>}
          </>
        ) : (
          <>
            <span className="w-6 h-6 rounded bg-[#293452]/50 text-[#7a8aaa]/40 text-[10px] font-bold flex items-center justify-center flex-shrink-0">?</span>
            <span className="text-[#7a8aaa]/40 italic text-xs sm:text-sm">TBD</span>
          </>
        )}
      </div>
    </div>
  );

  const matchLink = match.teamAId || match.teamBId ? `/match/${match.id}` : '#';

  return (
    <Link to={matchLink} className="block w-[160px] sm:w-[220px]">
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className={`rounded-lg overflow-hidden cursor-pointer transition-shadow ${
          isDone ? 'ring-1 ring-pink-400/50 shadow-md shadow-[#ff167a]/10' :
          isLive ? 'ring-2 ring-red-500 shadow-lg shadow-red-500/20' :
          'ring-1 ring-[#293452]/40'
        } ${isChampion ? 'ring-2 ring-[#ffc857] shadow-lg shadow-[#ffc857]/20' : ''}`}
      >
        <div className={`px-2.5 py-1 text-[9px] sm:text-[10px] font-bold text-white flex items-center justify-between ${rc.bg}`}>
          <span>{match.round}</span>
          {isLive && <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> LIVE</span>}
          {isDone && !isChampion && <span className="text-white/70">✓</span>}
          {isChampion && <span>🏆</span>}
        </div>
        <div className="bg-[#111a35]">
          {renderTeam(teamA, match.teamAId, match.winner === match.teamAId, 'top')}
          {renderTeam(teamB, match.teamBId, match.winner === match.teamBId, 'bottom')}
        </div>
      </motion.div>
    </Link>
  );
}

export default function KnockoutBracket() {
  const matches = useTournamentStore((s) => s.matches);
  const teams = useTournamentStore((s) => s.teams);

  const sf1 = matches.find((m) => m.id === 'sf1');
  const sf2 = matches.find((m) => m.id === 'sf2');
  const final = matches.find((m) => m.id === 'f1');
  const champion = final?.winner ? teams.find((t) => t.id === final.winner) : null;

  return (
    <div className="overflow-x-auto pb-4">
      {/* Desktop horizontal bracket */}
      <div className="hidden sm:flex items-center justify-center gap-4 md:gap-8">
        {/* Semis column */}
        <div className="flex flex-col gap-8">
          {sf1 && <BracketMatchCard match={sf1} round="sf" />}
          {sf2 && <BracketMatchCard match={sf2} round="sf" />}
        </div>

        {/* Connector lines */}
        <div className="flex flex-col items-center gap-8">
          <div className="h-px w-8 bg-[#293452]/40" />
          <div className="h-px w-8 bg-[#293452]/40" />
        </div>

        {/* Final + Champion */}
        <div className="flex flex-col items-center gap-4">
          {final && <BracketMatchCard match={final} round="final" isChampion={final.status === 'completed'} />}
          {champion && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, type: 'spring' }}
              className="w-[160px] sm:w-[220px] rounded-2xl p-4 text-center bg-gradient-to-b from-[#ffc857]/10 to-amber-500/5 border-2 border-[#ffc857]/40 shadow-lg shadow-[#ffc857]/10"
            >
              <Trophy className="w-8 h-8 text-[#ffc857] mx-auto mb-2" />
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm mx-auto mb-2 shadow-md"
                style={{ background: champion.color }}>
                {champion.name.charAt(0)}
              </div>
              <div className="font-bold text-sm text-[#ffc857]">{champion.name}</div>
              <div className="text-[10px] text-[#ffc857]/70 font-semibold mt-1 uppercase tracking-wider">Champion</div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile vertical layout */}
      <div className="space-y-6 sm:hidden">
        <div>
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#7a8aaa]/40">
            Semifinals
          </h4>
          <div className="grid grid-cols-1 gap-3">
            {sf1 && <BracketMatchCard match={sf1} round="sf" />}
            {sf2 && <BracketMatchCard match={sf2} round="sf" />}
          </div>
        </div>

        <div className="flex justify-center">
          <div className="h-6 w-px bg-[#293452]/40" />
        </div>

        <div>
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#7a8aaa]/40">
            Final
          </h4>
          <div className="flex flex-col items-start gap-3">
            {final && <BracketMatchCard match={final} round="final" isChampion={final.status === 'completed'} />}
            {champion && (
              <div className="flex items-center gap-1.5 rounded-full bg-[#ffc857]/10 px-3 py-1 text-sm font-bold text-[#ffc857]">
                <Trophy className="w-4 h-4" /> {champion.name}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
