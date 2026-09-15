import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Trophy, AlertCircle } from 'lucide-react';
import { useTournamentStore } from '../store/tournamentStore';
import KnockoutBracket from '../components/tournament/KnockoutBracket';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Bracket() {
  const { matches } = useTournamentStore();

  const knockoutMatches = useMemo(
    () =>
      matches.filter(
        (m) =>
          m.round === 'Quarterfinal' ||
          m.round === 'Semifinal' ||
          m.round === 'Final',
      ),
    [matches],
  );

  const hasTeamsAssigned = useMemo(
    () => knockoutMatches.some((m) => m.teamAId || m.teamBId),
    [knockoutMatches],
  );

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8 pb-12"
    >
      {/* Page Header */}
      <motion.div variants={item}>
        <h1 className="flex items-center gap-3 text-2xl font-bold text-white md:text-3xl">
          <Trophy className="h-7 w-7 text-amber-400" />
          Knockout Stage
        </h1>
        <p className="mt-1 text-sm text-indigo-300/50">
          Quarterfinals, Semifinals, and the Grand Final.
        </p>
      </motion.div>

      {/* Bracket or Placeholder */}
      {!hasTeamsAssigned ? (
        <motion.div
          variants={item}
          className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-indigo-800/30 py-20 text-center"
        >
          <AlertCircle className="mb-4 h-16 w-16 text-indigo-700" />
          <h2 className="text-xl font-semibold text-indigo-300/50">
            Knockout Draw Pending
          </h2>
          <p className="mt-2 max-w-md text-sm text-indigo-400/40">
            Knockout draw will be determined after group stage completes. The top
            2 teams from each group will advance to the quarterfinals.
          </p>
        </motion.div>
      ) : (
        <motion.div variants={item} className="w-full overflow-x-auto">
          <KnockoutBracket />
        </motion.div>
      )}
    </motion.div>
  );
}
