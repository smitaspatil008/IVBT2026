import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Clock, Bird } from 'lucide-react';
import { useTournamentStore } from '../store/tournamentStore';
import MatchCard from '../components/tournament/MatchCard';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function LiveMatches() {
  const { matches } = useTournamentStore();

  const liveMatches = useMemo(
    () => matches.filter((m) => m.status === 'live'),
    [matches],
  );

  const upcomingNext = useMemo(() => {
    const now = new Date();
    return matches
      .filter((m) => m.status === 'upcoming' && new Date(m.scheduledAt) > now)
      .sort(
        (a, b) =>
          new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime(),
      )
      .slice(0, 3);
  }, [matches]);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8 pb-12"
    >
      {/* Page Header */}
      <motion.div variants={item} className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-white md:text-3xl">
          Live Matches
        </h1>
        {liveMatches.length > 0 && (
          <span className="flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700 bg-red-900/30 text-red-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
            {liveMatches.length} Live
          </span>
        )}
      </motion.div>

      {/* Live Matches Grid */}
      {liveMatches.length > 0 ? (
        <motion.div
          variants={item}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {liveMatches.map((match) => (
            <motion.div key={match.id} variants={item}>
              <MatchCard match={match} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          variants={item}
          className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-indigo-800/30 py-20 text-center"
        >
          <Bird className="mb-4 h-16 w-16 text-indigo-700" />
          <h2 className="text-xl font-semibold text-indigo-300/50">
            No Live Matches
          </h2>
          <p className="mt-2 max-w-sm text-sm text-indigo-400/40">
            There are no matches being played right now. Check the schedule for
            upcoming matches.
          </p>
        </motion.div>
      )}

      {/* Upcoming Next */}
      {upcomingNext.length > 0 && (
        <motion.section variants={item}>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
            <Clock className="h-5 w-5 text-amber-500" />
            Upcoming Next
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingNext.map((match) => (
              <motion.div key={match.id} variants={item}>
                <MatchCard match={match} />
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}
    </motion.div>
  );
}
