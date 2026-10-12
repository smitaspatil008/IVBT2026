import type { Team } from '../../types';
import { useTournamentStore } from '../../store/tournamentStore';

interface TeamCardProps {
  team: Team;
}

export default function TeamCard({ team }: TeamCardProps) {
  const players = useTournamentStore((s) => s.players);
  const teamPlayers = players.filter((p) => p.teamId === team.id);

  return (
    <div className="overflow-hidden rounded-xl border border-[#293452]/30 bg-[#111a35] shadow-md">
      {/* Color accent stripe */}
      <div className="h-2" style={{ backgroundColor: team.color }} />

      <div className="p-5">
        {/* Badge + name */}
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
            style={{ backgroundColor: team.color }}
          >
            {team.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold text-white">{team.name}</h3>
            <p className="text-xs text-[#aab4cc]/50">
              {team.wins}W - {team.losses}L{team.draws > 0 ? ` - ${team.draws}D` : ''}
            </p>
          </div>
        </div>

        {/* Players */}
        {teamPlayers.length > 0 && (
          <div className="mt-4 space-y-1">
            <p className="text-xs font-medium uppercase tracking-wider text-[#7a8aaa]/40">
              Players
            </p>
            {teamPlayers.map((p) => (
              <p key={p.id} className="text-sm text-[#aab4cc]/60">
                {p.name}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
