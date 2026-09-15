import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { useTournamentStore } from '../store/tournamentStore';
import TeamCard from '../components/tournament/TeamCard';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

type FilterTab = 'all' | 'g1' | 'g2' | 'g3' | 'g4';

const filterTabs: { key: FilterTab; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'g1', label: 'Group A' },
  { key: 'g2', label: 'Group B' },
  { key: 'g3', label: 'Group C' },
  { key: 'g4', label: 'Group D' },
];

export default function Teams() {
  const { teams, groups } = useTournamentStore();
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');

  const filteredTeams = useMemo(() => {
    if (activeFilter === 'all') return teams;
    const group = groups.find((g) => g.id === activeFilter);
    if (!group) return teams;
    return teams.filter((t) => group.teamIds.includes(t.id));
  }, [teams, groups, activeFilter]);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6 pb-12"
    >
      {/* Page Header */}
      <motion.div variants={item}>
        <h1 className="flex items-center gap-3 text-2xl font-bold text-white md:text-3xl">
          <Shield className="h-7 w-7 text-indigo-400" />
          Teams
        </h1>
        <p className="mt-1 text-sm text-indigo-300/50">
          {teams.length} teams competing in the tournament.
        </p>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        variants={item}
        className="flex gap-2 overflow-x-auto pb-2"
      >
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveFilter(tab.key)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
              activeFilter === tab.key
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-indigo-900/30 text-indigo-300/70 hover:bg-indigo-800/30 border border-indigo-800/20'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Teams Grid */}
      <motion.div
        variants={container}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {filteredTeams.map((team) => (
          <motion.div key={team.id} variants={item}>
            <TeamCard team={team} />
          </motion.div>
        ))}
      </motion.div>

      {filteredTeams.length === 0 && (
        <motion.div
          variants={item}
          className="py-12 text-center text-indigo-300/50"
        >
          No teams found for this filter.
        </motion.div>
      )}
    </motion.div>
  );
}
