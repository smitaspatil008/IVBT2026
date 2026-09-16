import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { useTournamentStore } from '../store/tournamentStore';
import GroupTable from '../components/tournament/GroupTable';
import MatchCard from '../components/tournament/MatchCard';

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

export default function Groups() {
  const { groups, matches } = useTournamentStore();
  const [activeGroup, setActiveGroup] = useState<string>(
    groups[0]?.id ?? '',
  );

  // On desktop show all groups, on mobile use tabs
  const groupMatches = useMemo(() => {
    const map: Record<string, typeof matches> = {};
    for (const group of groups) {
      map[group.id] = matches.filter((m) => m.group === group.id);
    }
    return map;
  }, [groups, matches]);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8 pb-12"
    >
      {/* Page Header */}
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold text-white md:text-3xl">
          Group Stage
        </h1>
        <p className="mt-1 text-sm text-indigo-300/50">
          Round-robin format. Top 2 from each group qualify for knockouts.
        </p>
      </motion.div>

      {/* Mobile Tabs */}
      <motion.div
        variants={item}
        className="flex gap-2 overflow-x-auto pb-2 md:hidden"
      >
        {groups.map((group) => (
          <button
            key={group.id}
            onClick={() => setActiveGroup(group.id)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
              activeGroup === group.id
                ? 'bg-[#1e1b4b] text-white shadow-md'
                : 'bg-[#1e1b4b]/30 text-indigo-300/70 hover:bg-[#1e1b4b]/30 border border-[#1e1b4b]/20'
            }`}
          >
            {group.name}
          </button>
        ))}
      </motion.div>

      {/* Mobile: Show only active group */}
      <div className="space-y-6 md:hidden">
        {groups
          .filter((g) => g.id === activeGroup)
          .map((group) => (
            <motion.div key={group.id} variants={item} className="space-y-4">
              <GroupTable groupId={group.id} groupName={group.name} />

              {/* Group Matches */}
              {(groupMatches[group.id]?.length ?? 0) > 0 && (
                <div>
                  <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-indigo-100">
                    <Users className="h-4 w-4" />
                    Matches
                  </h3>
                  <div className="grid gap-3">
                    {groupMatches[group.id].map((match) => (
                      <MatchCard key={match.id} match={match} />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
      </div>

      {/* Desktop: Show all groups */}
      <div className="hidden space-y-10 md:block">
        {groups.map((group) => (
          <motion.div key={group.id} variants={item} className="space-y-4">
            <GroupTable groupId={group.id} groupName={group.name} />

            {/* Group Matches */}
            {(groupMatches[group.id]?.length ?? 0) > 0 && (
              <div>
                <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-indigo-100">
                  <Users className="h-4 w-4" />
                  {group.name} Matches
                </h3>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {groupMatches[group.id].map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
