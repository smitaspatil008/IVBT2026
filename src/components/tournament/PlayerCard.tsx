import { User } from 'lucide-react';
import type { Player } from '../../types';
import { useTournamentStore } from '../../store/tournamentStore';

interface PlayerCardProps {
  player: Player;
}

export default function PlayerCard({ player }: PlayerCardProps) {
  const teams = useTournamentStore((s) => s.teams);
  const team = teams.find((t) => t.id === player.teamId);

  return (
    <div className="flex items-center gap-4 rounded-xl border border-indigo-800/30 bg-[#1a1730] p-4 shadow-md">
      {/* Photo or placeholder */}
      {player.photo ? (
        <img
          src={player.photo}
          alt={player.name}
          className="h-14 w-14 shrink-0 rounded-full object-cover"
        />
      ) : (
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-indigo-900/50"
          style={team ? { borderColor: team.color, borderWidth: 2 } : undefined}
        >
          <User className="h-7 w-7 text-indigo-400/40" />
        </div>
      )}

      <div>
        <h3 className="font-semibold text-white">{player.name}</h3>
        {team && (
          <p className="flex items-center gap-1.5 text-sm text-indigo-300/50">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: team.color }}
            />
            {team.name}
          </p>
        )}
      </div>
    </div>
  );
}
