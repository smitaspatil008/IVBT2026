import { useTournamentStore } from '../../store/tournamentStore';

interface GroupTableProps {
  groupId: string;
  groupName: string;
}

export default function GroupTable({ groupId, groupName }: GroupTableProps) {
  const getGroupStandings = useTournamentStore((s) => s.getGroupStandings);
  const teams = useTournamentStore((s) => s.teams);

  const standings = getGroupStandings(groupId);

  const sorted = [...standings].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.gamesWon !== a.gamesWon) return b.gamesWon - a.gamesWon;
    const diffA = a.pointsScored - a.pointsConceded;
    const diffB = b.pointsScored - b.pointsConceded;
    return diffB - diffA;
  });

  const teamName = (id: string) => {
    const t = teams.find((t) => t.id === id);
    return t ?? null;
  };

  return (
    <div className="overflow-hidden rounded-xl border border-[#1e1b4b]/30 bg-[#12102a] shadow-lg">
      <div className="border-b border-[#1e1b4b]/20 px-4 py-3">
        <h3 className="font-bold text-white">{groupName}</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#1e1b4b]/20 bg-indigo-950/50 text-xs uppercase tracking-wider text-indigo-400/50">
              <th className="px-3 py-2 text-center">#</th>
              <th className="px-3 py-2">Team</th>
              <th className="px-3 py-2 text-center">P</th>
              <th className="px-3 py-2 text-center">W</th>
              <th className="px-3 py-2 text-center">L</th>
              <th className="px-3 py-2 text-center">D</th>
              <th className="hidden px-3 py-2 text-center md:table-cell">GW</th>
              <th className="hidden px-3 py-2 text-center md:table-cell">GL</th>
              <th className="hidden px-3 py-2 text-center md:table-cell">PF</th>
              <th className="hidden px-3 py-2 text-center md:table-cell">PA</th>
              <th className="hidden px-3 py-2 text-center md:table-cell">PD</th>
              <th className="px-3 py-2 text-center font-bold">Pts</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, idx) => {
              const team = teamName(row.teamId);
              const qualified = idx < 2;
              const pd = row.pointsScored - row.pointsConceded;

              return (
                <tr
                  key={row.teamId}
                  className={`border-b border-[#1e1b4b]/10 transition hover:bg-[#1e1b4b]/20 ${
                    qualified ? 'border-l-4 border-l-orange-500' : ''
                  }`}
                >
                  <td className="px-3 py-2.5 text-center text-indigo-400/40">{idx + 1}</td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block h-3 w-3 shrink-0 rounded-full"
                        style={{ backgroundColor: team?.color ?? '#6b7280' }}
                      />
                      <span className="font-medium text-white">
                        {team?.shortName ?? row.teamId}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-center text-indigo-200/60">{row.played}</td>
                  <td className="px-3 py-2.5 text-center text-indigo-200/60">{row.won}</td>
                  <td className="px-3 py-2.5 text-center text-indigo-200/60">{row.lost}</td>
                  <td className="px-3 py-2.5 text-center text-indigo-200/60">{row.drawn}</td>
                  <td className="hidden px-3 py-2.5 text-center text-indigo-200/60 md:table-cell">
                    {row.gamesWon}
                  </td>
                  <td className="hidden px-3 py-2.5 text-center text-indigo-200/60 md:table-cell">
                    {row.gamesLost}
                  </td>
                  <td className="hidden px-3 py-2.5 text-center text-indigo-200/60 md:table-cell">
                    {row.pointsScored}
                  </td>
                  <td className="hidden px-3 py-2.5 text-center text-indigo-200/60 md:table-cell">
                    {row.pointsConceded}
                  </td>
                  <td className="hidden px-3 py-2.5 text-center text-indigo-200/60 md:table-cell">
                    <span className={pd > 0 ? 'text-orange-500' : pd < 0 ? 'text-red-400' : ''}>
                      {pd > 0 ? '+' : ''}{pd}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-center font-bold text-orange-500">
                    {row.points}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
