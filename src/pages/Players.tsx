import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, User } from 'lucide-react';
import { useTournamentStore } from '../store/tournamentStore';
import PlayerCard from '../components/tournament/PlayerCard';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Players() {
  const { players, teams } = useTournamentStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [groupByTeam, setGroupByTeam] = useState(false);

  const filteredPlayers = useMemo(() => {
    if (!searchQuery.trim()) return players;
    const q = searchQuery.toLowerCase();
    return players.filter((p) => p.name.toLowerCase().includes(q));
  }, [players, searchQuery]);

  const playersByTeam = useMemo(() => {
    if (!groupByTeam) return null;
    const map = new Map<string, typeof players>();
    for (const player of filteredPlayers) {
      const teamPlayers = map.get(player.teamId) ?? [];
      teamPlayers.push(player);
      map.set(player.teamId, teamPlayers);
    }
    return map;
  }, [filteredPlayers, groupByTeam]);

  const getTeamName = (teamId: string) =>
    teams.find((t) => t.id === teamId)?.name ?? 'Unknown';

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
          <Users className="h-7 w-7 text-indigo-400" />
          Players
        </h1>
        <p className="mt-1 text-sm text-indigo-300/50">
          {players.length} players across {teams.length} teams.
        </p>
      </motion.div>

      {/* Search & Controls */}
      <motion.div
        variants={item}
        className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-indigo-400/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search players..."
            className="w-full rounded-lg border border-indigo-700/40 bg-indigo-950/50 py-2.5 pl-10 pr-4 text-sm text-white placeholder-indigo-400/40 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <button
          onClick={() => setGroupByTeam(!groupByTeam)}
          className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
            groupByTeam
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-indigo-900/30 text-indigo-300/70 hover:bg-indigo-800/30 border border-indigo-800/20'
          }`}
        >
          <User className="h-4 w-4" />
          Group by Team
        </button>
      </motion.div>

      {/* Players Grid or Grouped */}
      {groupByTeam && playersByTeam ? (
        <div className="space-y-8">
          {Array.from(playersByTeam.entries()).map(
            ([teamId, teamPlayers]) => (
              <motion.div key={teamId} variants={item}>
                <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-indigo-100">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{
                      backgroundColor:
                        teams.find((t) => t.id === teamId)?.color ?? '#6b7280',
                    }}
                  />
                  {getTeamName(teamId)}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {teamPlayers.map((player) => (
                    <motion.div key={player.id} variants={item}>
                      <PlayerCard player={player} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ),
          )}
        </div>
      ) : (
        <motion.div
          variants={container}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {filteredPlayers.map((player) => (
            <motion.div key={player.id} variants={item}>
              <PlayerCard player={player} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {filteredPlayers.length === 0 && (
        <motion.div
          variants={item}
          className="py-12 text-center text-indigo-300/50"
        >
          No players found matching "{searchQuery}".
        </motion.div>
      )}
    </motion.div>
  );
}
