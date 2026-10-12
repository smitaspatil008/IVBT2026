import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import type { Player } from '../../types';
import { useTournamentStore } from '../../store/tournamentStore';

interface PlayerCardProps {
  player: Player;
  delay?: number;
  onClick?: () => void;
}

export default function PlayerCard({ player, delay = 0, onClick }: PlayerCardProps) {
  const teams = useTournamentStore((s) => s.teams);
  const team = teams.find((t) => t.id === player.teamId);
  const winPct = player.matchesPlayed > 0 ? Math.round((player.wins / player.matchesPlayed) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}
      onClick={onClick}
      className="rounded-xl border border-[#293452]/30 bg-[#111a35] p-3 sm:p-5 flex flex-col items-center text-center cursor-pointer"
    >
      <div className="relative mb-2 sm:mb-3">
        <div
          className="w-14 h-14 sm:w-20 sm:h-20 rounded-full overflow-hidden border-[3px]"
          style={{ borderColor: team?.color ?? '#6366f1' }}
        >
          {player.photo ? (
            <img src={player.photo} alt={player.name} loading="lazy" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#293452]/50">
              <User className="w-7 h-7 sm:w-10 sm:h-10 text-[#7a8aaa]/40" />
            </div>
          )}
        </div>
        {team && (
          <div
            className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-7 sm:h-7 rounded-md sm:rounded-lg flex items-center justify-center text-white text-[8px] sm:text-[10px] font-bold border-2 border-[#111a35]"
            style={{ background: team.color }}
          >
            {team.name.charAt(0)}
          </div>
        )}
      </div>

      <h3 className="font-semibold text-xs sm:text-sm text-white leading-tight">{player.name}</h3>
      {team && <p className="text-[10px] sm:text-xs mt-0.5 truncate max-w-full" style={{ color: team.color }}>{team.name}</p>}

      <div className="grid grid-cols-3 gap-1 sm:gap-2 w-full mt-2 sm:mt-4 pt-2 sm:pt-4 border-t border-[#293452]/30">
        <div>
          <div className="font-bold text-sm sm:text-lg text-white">{player.matchesPlayed}</div>
          <div className="text-[9px] sm:text-[10px] text-[#aab4cc]/50">Played</div>
        </div>
        <div>
          <div className="font-bold text-sm sm:text-lg text-emerald-400">{player.wins}</div>
          <div className="text-[9px] sm:text-[10px] text-[#aab4cc]/50">Won</div>
        </div>
        <div>
          <div className="font-bold text-sm sm:text-lg text-rose-400">{player.losses}</div>
          <div className="text-[9px] sm:text-[10px] text-[#aab4cc]/50">Lost</div>
        </div>
      </div>

      <div className="w-full mt-2 sm:mt-3">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-[#aab4cc]/50">Win Rate</span>
          <span className="font-semibold text-white">{winPct}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-[#293452]/50">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${winPct}%` }}
            transition={{ duration: 0.8, delay: delay + 0.2 }}
            className="h-full rounded-full"
            style={{ background: team?.color ?? '#6366f1' }}
          />
        </div>
      </div>
    </motion.div>
  );
}
