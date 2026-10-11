import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Users } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import { useTournamentStore } from '../store/tournamentStore';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const GROUP_COLORS: Record<string, string> = {
  g1: '#6366f1',
  g2: '#ec4899',
  g3: '#10b981',
  g4: '#f59e0b',
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

  const groupStandings = useMemo(() => {
    return groups.map((g) => ({
      group: g,
      standings: getGroupStandings(g.id),
    }));
  }, [groups, getGroupStandings]);

  const totalCompleted = matches.filter((m) => m.status === 'completed').length;

  const overallRanking = useMemo(() => {
    return teams
      .map((team) => {
        const teamMatches = matches.filter(
          (m) => m.status === 'completed' && (m.teamAId === team.id || m.teamBId === team.id),
        );
        let won = 0, lost = 0;
        for (const m of teamMatches) {
          if (m.winner === team.id) won++;
          else lost++;
        }
        return { team, played: teamMatches.length, won, lost, points: won * 2 };
      })
      .sort((a, b) => b.points - a.points || b.won - a.won);
  }, [teams, matches]);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 pb-12">
      <motion.div variants={item}>
        <h1 className="flex items-center gap-3 text-2xl font-bold text-white md:text-3xl">
          <Medal className="h-7 w-7 text-pink-500" />
          Standings
        </h1>
        <p className="mt-1 text-sm text-indigo-300/50">
          Group stage standings · {totalCompleted} of {matches.length} matches completed
        </p>
      </motion.div>

      {/* Group standings */}
      <div className="grid gap-5 md:grid-cols-2">
        {groupStandings.map(({ group, standings }) => {
          const groupColor = GROUP_COLORS[group.id] ?? '#6366f1';
          const groupMatches = matches.filter((m) => m.group === group.id);
          const completed = groupMatches.filter((m) => m.status === 'completed').length;
          return (
            <motion.div
              key={group.id}
              variants={item}
              className="overflow-hidden rounded-xl border border-[#1e1b4b]/30 bg-[#12102a] shadow-lg"
            >
              <div
                className="flex items-center justify-between px-4 py-3 border-b border-[#1e1b4b]/20"
                style={{ background: `${groupColor}10` }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: groupColor }} />
                  <h3 className="text-sm font-bold text-white">{group.name}</h3>
                </div>
                <span className="text-[10px] text-indigo-300/50">{completed}/3 played</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#1e1b4b]/20 bg-indigo-950/30">
                      <th className="px-3 py-2 font-semibold text-indigo-400/50 w-6">#</th>
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
                      const isQualified = idx === 0 && completed > 0;
                      return (
                        <tr
                          key={s.teamId}
                          className={`border-b border-[#1e1b4b]/10 last:border-0 ${
                            idx === 0 ? 'bg-pink-500/5' : ''
                          }`}
                        >
                          <td className="px-3 py-2.5">
                            {idx === 0 && completed > 0 ? (
                              <Trophy className="h-3.5 w-3.5 text-yellow-400" />
                            ) : (
                              <span className="text-indigo-400/40 text-[10px] font-bold">{idx + 1}</span>
                            )}
                          </td>
                          <td className="px-3 py-2.5">
                            <div className="flex items-center gap-2">
                              <div
                                className="h-5 w-5 shrink-0 rounded flex items-center justify-center text-white text-[8px] font-bold"
                                style={{ backgroundColor: team?.color ?? '#888' }}
                              >
                                {team?.name?.charAt(0) ?? '?'}
                              </div>
                              <span className={`font-medium ${idx === 0 && completed > 0 ? 'text-pink-300' : 'text-indigo-100'}`}>
                                {team?.name ?? s.teamId}
                              </span>
                              {isQualified && (
                                <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-bold text-emerald-400">
                                  Q
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-2 py-2.5 text-center text-indigo-200/60">{s.played}</td>
                          <td className="px-2 py-2.5 text-center text-emerald-400 font-medium">{s.won}</td>
                          <td className="px-2 py-2.5 text-center text-red-400 font-medium">{s.lost}</td>
                          <td className="px-2 py-2.5 text-center font-bold text-white">{s.points}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Overall rankings table */}
      <motion.div variants={item}>
        <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <Users className="h-5 w-5 text-indigo-400" />
          Overall Rankings
        </h2>
        <div className="overflow-hidden rounded-xl border border-[#1e1b4b]/30 bg-[#12102a] shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#1e1b4b]/20 bg-indigo-950/30">
                  <th className="px-4 py-3 font-semibold text-indigo-400/50 w-10">#</th>
                  <th className="px-4 py-3 font-semibold text-indigo-400/50">Team</th>
                  <th className="px-3 py-3 text-center font-semibold text-indigo-400/50">P</th>
                  <th className="px-3 py-3 text-center font-semibold text-indigo-400/50">W</th>
                  <th className="px-3 py-3 text-center font-semibold text-indigo-400/50">L</th>
                  <th className="px-3 py-3 text-center font-semibold text-indigo-400/50">Pts</th>
                </tr>
              </thead>
              <tbody>
                {overallRanking.map((row, i) => (
                  <tr key={row.team.id} className="border-b border-[#1e1b4b]/10 last:border-0">
                    <td className="px-4 py-2.5">
                      {i < 3 ? (
                        <Trophy className={`h-4 w-4 ${i === 0 ? 'text-yellow-400' : i === 1 ? 'text-gray-400' : 'text-amber-600'}`} />
                      ) : (
                        <span className="text-indigo-400/40 text-xs">{i + 1}</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-6 w-6 shrink-0 rounded-lg flex items-center justify-center text-white text-[9px] font-bold"
                          style={{ backgroundColor: row.team.color }}
                        >
                          {row.team.name.charAt(0)}
                        </div>
                        <span className="font-medium text-white">{row.team.name}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-center text-indigo-200/60">{row.played}</td>
                    <td className="px-3 py-2.5 text-center font-medium text-emerald-400">{row.won}</td>
                    <td className="px-3 py-2.5 text-center font-medium text-red-400">{row.lost}</td>
                    <td className="px-3 py-2.5 text-center font-bold text-pink-500">{row.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item} className="rounded-lg border border-indigo-500/20 bg-indigo-500/5 px-4 py-2.5 text-xs text-indigo-200/60">
        <span className="font-semibold text-indigo-200/80">Scoring:</span> 2 points for a win, 0 for a loss.
        Top team from each group qualifies for semifinals.
      </motion.div>
    </motion.div>
  );
}
