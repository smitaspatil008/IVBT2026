import type { Team } from '../../types';
import { useTournamentStore } from '../../store/tournamentStore';

interface TeamCardProps {
  team: Team;
}

export default function TeamCard({ team }: TeamCardProps) {
  const players = useTournamentStore((s) => s.players);
  const teamPlayers = players.filter((p) => p.teamId === team.id);

  return (
    <div className="overflow-hidden rounded-xl border border-[#1e1b4b]/30 bg-[#12102a] shadow-md">
      {/* Color accent stripe */}
      <div className="h-2" style={{ backgroundColor: team.color }} />

      <div className="p-5">
        {/* Badge + name */}
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
            style={{ backgroundColor: team.color }}
          >
            {team.shortName}
          </div>
          <div>
            <h3 className="font-semibold text-white">{team.name}</h3>
            <p className="text-xs text-indigo-300/50">
              {team.wins}W - {team.losses}L{team.draws > 0 ? ` - ${team.draws}D` : ''}
            </p>
          </div>
        </div>

        {/* Players */}
        {teamPlayers.length > 0 && (
          <div className="mt-4 space-y-1">
            <p className="text-xs font-medium uppercase tracking-wider text-indigo-400/40">
              Players
            </p>
            {teamPlayers.map((p) => (
              <p key={p.id} className="text-sm text-indigo-200/60">
                {p.name}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
