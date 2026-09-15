import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import { useTournamentStore } from '../store/tournamentStore';

const RANK_STYLES: Record<number, { bg: string; text: string }> = {
  1: { bg: 'bg-yellow-900/20', text: 'text-yellow-400' },
  2: { bg: 'bg-gray-700/30', text: 'text-gray-300' },
  3: { bg: 'bg-orange-900/20', text: 'text-orange-400' },
};

export default function Leaderboard() {
  const { teams, matches, groups, getGroupStandings } = useTournamentStore(
    useShallow((s) => ({
      teams: s.teams,
      matches: s.matches,
      groups: s.groups,
      getGroupStandings: s.getGroupStandings,
    })),
  );

  const overallStandings = useMemo(() => {
    const stats = teams.map((team) => {
      const teamMatches = matches.filter(
        (m) =>
          m.status === 'completed' &&
          (m.teamAId === team.id || m.teamBId === team.id),
      );
      let played = 0;
      let won = 0;
      let lost = 0;
      let points = 0;
      for (const m of teamMatches) {
        played++;
        if (m.winner === team.id) {
          won++;
          points += 2;
        } else {
          lost++;
        }
      }
      return { team, played, won, lost, points };
    });

    stats.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      return b.won - a.won;
    });

    return stats;
  }, [teams, matches]);

  const groupStandings = useMemo(() => {
    return groups.map((g) => ({
      group: g,
      standings: getGroupStandings(g.id),
    }));
  }, [groups, getGroupStandings]);

  return (
    <div className="mx-auto max-w-5xl py-8">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <Trophy className="h-7 w-7 text-amber-400" />
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          Leaderboard
        </h1>
      </div>

      {/* Overall Standings Table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 overflow-hidden rounded-xl border border-indigo-800/30 bg-[#1a1730] shadow-lg"
      >
        <div className="border-b border-indigo-800/20 px-5 py-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-indigo-300/70">
            Overall Rankings
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-indigo-800/20 bg-indigo-950/50">
                <th className="px-4 py-3 font-semibold text-indigo-400/50">Rank</th>
                <th className="px-4 py-3 font-semibold text-indigo-400/50">Team</th>
                <th className="px-4 py-3 text-center font-semibold text-indigo-400/50">P</th>
                <th className="px-4 py-3 text-center font-semibold text-indigo-400/50">W</th>
                <th className="px-4 py-3 text-center font-semibold text-indigo-400/50">L</th>
                <th className="px-4 py-3 text-center font-semibold text-indigo-400/50">Pts</th>
              </tr>
            </thead>
            <tbody>
              {overallStandings.map((row, index) => {
                const rank = index + 1;
                const style = RANK_STYLES[rank];
                return (
                  <motion.tr
                    key={row.team.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className={`border-b border-indigo-800/10 last:border-0 ${
                      style ? style.bg : ''
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        {rank <= 3 ? (
                          <Trophy className={`h-4 w-4 ${style!.text}`} />
                        ) : (
                          <span className="text-indigo-400/40">{rank}</span>
                        )}
                        {rank <= 3 && (
                          <span className={`text-xs font-semibold ${style!.text}`}>
                            {rank}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="h-6 w-6 shrink-0 rounded-full"
                          style={{ backgroundColor: row.team.color }}
                        />
                        <span className="font-medium text-white">
                          {row.team.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center text-indigo-200/60">{row.played}</td>
                    <td className="px-4 py-3 text-center font-medium text-emerald-400">{row.won}</td>
                    <td className="px-4 py-3 text-center font-medium text-red-400">{row.lost}</td>
                    <td className="px-4 py-3 text-center font-bold text-amber-400">{row.points}</td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Group Stage Standings */}
      <div className="mb-4 flex items-center gap-2">
        <Medal className="h-5 w-5 text-indigo-400" />
        <h2 className="text-lg font-bold text-white">Group Stage Standings</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {groupStandings.map(({ group, standings }) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="overflow-hidden rounded-xl border border-indigo-800/30 bg-[#1a1730] shadow-sm"
          >
            <div className="border-b border-indigo-800/20 px-4 py-2.5">
              <h3 className="text-sm font-bold text-indigo-200">{group.name}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-indigo-800/20">
                    <th className="px-3 py-2 font-semibold text-indigo-400/50">Team</th>
                    <th className="px-2 py-2 text-center font-semibold text-indigo-400/50">P</th>
                    <th className="px-2 py-2 text-center font-semibold text-indigo-400/50">W</th>
                    <th className="px-2 py-2 text-center font-semibold text-indigo-400/50">L</th>
                    <th className="px-2 py-2 text-center font-semibold text-indigo-400/50">Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {standings.map((s, idx) => {
                    const team = teams.find((t) => t.id === s.teamId);
                    return (
                      <tr
                        key={s.teamId}
                        className={`border-b border-indigo-800/10 last:border-0 ${
                          idx < 2 ? 'bg-amber-400/5' : ''
                        }`}
                      >
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-2">
                            <div
                              className="h-4 w-4 shrink-0 rounded-full"
                              style={{ backgroundColor: team?.color ?? '#888' }}
                            />
                            <span className="font-medium text-indigo-100">
                              {team?.name ?? s.teamId}
                            </span>
                            {idx < 2 && (
                              <span className="rounded bg-amber-400/10 px-1 py-0.5 text-[10px] font-bold text-amber-400">
                                Q
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-2 py-2 text-center text-indigo-200/60">{s.played}</td>
                        <td className="px-2 py-2 text-center text-emerald-400">{s.won}</td>
                        <td className="px-2 py-2 text-center text-red-400">{s.lost}</td>
                        <td className="px-2 py-2 text-center font-bold text-amber-400">{s.points}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
