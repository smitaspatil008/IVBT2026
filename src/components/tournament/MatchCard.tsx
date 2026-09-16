import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, MapPin, CheckCircle2 } from 'lucide-react';
import LiveBadge from '../ui/LiveBadge';
import type { Match } from '../../types';
import { useTournamentStore } from '../../store/tournamentStore';

interface MatchCardProps {
  match: Match;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) +
    ', ' +
    d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

export default function MatchCard({ match }: MatchCardProps) {
  const teams = useTournamentStore((s) => s.teams);
  const teamA = teams.find((t) => t.id === match.teamAId);
  const teamB = teams.find((t) => t.id === match.teamBId);

  const statusBadge = () => {
    switch (match.status) {
      case 'live':
        return <LiveBadge />;
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/10 px-2 py-0.5 text-xs font-semibold text-orange-500">
            <CheckCircle2 className="h-3 w-3" /> Completed
          </span>
        );
      default:
        return (
          <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-300">
            Upcoming
          </span>
        );
    }
  };

  return (
    <Link to={`/match/${match.id}`}>
      <motion.div
        whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(79, 70, 229, 0.15)' }}
        className="overflow-hidden rounded-xl border border-[#1e1b4b]/30 bg-[#12102a] shadow-md transition"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1e1b4b]/20 px-4 py-2">
          <span className="text-xs font-medium text-indigo-400/60">{match.round}</span>
          {statusBadge()}
        </div>

        {/* Teams + Scores */}
        <div className="px-4 py-4">
          {/* Team A */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-3 w-3 rounded-full"
                style={{ backgroundColor: teamA?.color ?? '#6b7280' }}
              />
              <span
                className={`font-semibold ${
                  match.winner === match.teamAId
                    ? 'text-orange-500'
                    : 'text-white'
                }`}
              >
                {teamA?.shortName ?? 'TBD'}
              </span>
              {match.winner === match.teamAId && <CheckCircle2 className="h-4 w-4 text-orange-500" />}
            </div>
            <div className="flex gap-1.5">
              {(match.games ?? []).map((g, i) => (
                <span
                  key={i}
                  className={`inline-flex h-7 w-8 items-center justify-center rounded text-xs font-bold ${
                    match.status === 'live' && i === match.currentGame
                      ? 'bg-red-500/20 text-red-400 ring-2 ring-red-500/40'
                      : 'bg-[#1e1b4b]/30 text-indigo-200'
                  }`}
                >
                  {g.scoreA}
                </span>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="my-2 border-t border-dashed border-[#1e1b4b]/20" />

          {/* Team B */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-3 w-3 rounded-full"
                style={{ backgroundColor: teamB?.color ?? '#6b7280' }}
              />
              <span
                className={`font-semibold ${
                  match.winner === match.teamBId
                    ? 'text-orange-500'
                    : 'text-white'
                }`}
              >
                {teamB?.shortName ?? 'TBD'}
              </span>
              {match.winner === match.teamBId && <CheckCircle2 className="h-4 w-4 text-orange-500" />}
            </div>
            <div className="flex gap-1.5">
              {(match.games ?? []).map((g, i) => (
                <span
                  key={i}
                  className={`inline-flex h-7 w-8 items-center justify-center rounded text-xs font-bold ${
                    match.status === 'live' && i === match.currentGame
                      ? 'bg-red-500/20 text-red-400 ring-2 ring-red-500/40'
                      : 'bg-[#1e1b4b]/30 text-indigo-200'
                  }`}
                >
                  {g.scoreB}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-4 border-t border-[#1e1b4b]/20 px-4 py-2 text-xs text-indigo-400/50">
          {match.court && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {match.court}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> {formatDate(match.scheduledAt)}
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
