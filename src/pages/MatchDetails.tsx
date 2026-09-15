import { useMemo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Trophy } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import Confetti from 'react-confetti';
import { useTournamentStore } from '../store/tournamentStore';
import LiveBadge from '../components/ui/LiveBadge';

function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  useEffect(() => {
    const handle = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);
  return size;
}

export default function MatchDetails() {
  const { id } = useParams<{ id: string }>();
  const { matches, teams, players } = useTournamentStore(
    useShallow((s) => ({ matches: s.matches, teams: s.teams, players: s.players })),
  );
  const { width, height } = useWindowSize();

  const match = useMemo(() => matches.find((m) => m.id === id), [matches, id]);
  const teamA = useMemo(() => teams.find((t) => t.id === match?.teamAId), [teams, match]);
  const teamB = useMemo(() => teams.find((t) => t.id === match?.teamBId), [teams, match]);
  const playersA = useMemo(
    () => players.filter((p) => p.teamId === teamA?.id),
    [players, teamA],
  );
  const playersB = useMemo(
    () => players.filter((p) => p.teamId === teamB?.id),
    [players, teamB],
  );

  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (match?.status === 'completed' && match.winner) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [match?.status, match?.winner]);

  if (!match) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
        <h1 className="mb-2 text-4xl font-bold text-white">404</h1>
        <p className="mb-6 text-indigo-300/50">Match not found</p>
        <Link
          to="/schedule"
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Schedule
        </Link>
      </div>
    );
  }

  const winnerTeam = match.winner ? teams.find((t) => t.id === match.winner) : null;

  let gamesWonA = 0;
  let gamesWonB = 0;
  for (const g of match.games ?? []) {
    const aWon = (g.scoreA >= 21 && g.scoreA - g.scoreB >= 2) || g.scoreA === 30;
    const bWon = (g.scoreB >= 21 && g.scoreB - g.scoreA >= 2) || g.scoreB === 30;
    if (aWon) gamesWonA++;
    if (bWon) gamesWonB++;
  }

  return (
    <div className="mx-auto max-w-3xl py-8">
      {showConfetti && <Confetti width={width} height={height} recycle={false} numberOfPieces={300} />}

      {/* Back */}
      <Link
        to="/schedule"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-300/50 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Schedule
      </Link>

      {/* Match Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 rounded-xl border border-indigo-800/30 bg-[#1a1730] p-5 shadow-lg"
      >
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">{match.round}</h2>
          <div className="flex items-center gap-2">
            {match.status === 'live' && <LiveBadge />}
            {match.status === 'completed' && (
              <span className="rounded-full bg-amber-400/10 px-2.5 py-0.5 text-xs font-semibold text-amber-400">
                Completed
              </span>
            )}
            {match.status === 'upcoming' && (
              <span className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-xs font-semibold text-indigo-300">
                Upcoming
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-indigo-400/50">
          <MapPin className="h-4 w-4" />
          {match.court}
          <span className="mx-1">|</span>
          {new Date(match.scheduledAt).toLocaleDateString('en-IN', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          })}{' '}
          at{' '}
          {new Date(match.scheduledAt).toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          })}
        </div>
      </motion.div>

      {/* Winner Banner */}
      {match.status === 'completed' && winnerTeam && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 flex items-center justify-center gap-3 rounded-xl p-4 text-white"
          style={{ backgroundColor: winnerTeam.color }}
        >
          <Trophy className="h-7 w-7" />
          <span className="text-xl font-bold">{winnerTeam.name} Wins!</span>
          <Trophy className="h-7 w-7" />
        </motion.div>
      )}

      {/* Teams Side by Side */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        {/* Team A */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`rounded-xl border p-4 ${
            match.winner === match.teamAId
              ? 'border-amber-400/40 bg-amber-400/5'
              : 'border-indigo-800/30 bg-[#1a1730]'
          }`}
        >
          <div className="mb-3 flex items-center gap-2">
            <div className="h-10 w-10 rounded-full" style={{ backgroundColor: teamA?.color ?? '#888' }} />
            <div>
              <p className="font-bold text-white">{teamA?.name ?? 'TBD'}</p>
              <p className="text-xs text-indigo-400/50">{teamA?.shortName ?? '---'}</p>
            </div>
          </div>
          <div className="space-y-1">
            {playersA.map((p) => (
              <p key={p.id} className="text-sm text-indigo-200/60">
                {p.name}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Team B */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`rounded-xl border p-4 ${
            match.winner === match.teamBId
              ? 'border-amber-400/40 bg-amber-400/5'
              : 'border-indigo-800/30 bg-[#1a1730]'
          }`}
        >
          <div className="mb-3 flex items-center gap-2">
            <div className="h-10 w-10 rounded-full" style={{ backgroundColor: teamB?.color ?? '#888' }} />
            <div>
              <p className="font-bold text-white">{teamB?.name ?? 'TBD'}</p>
              <p className="text-xs text-indigo-400/50">{teamB?.shortName ?? '---'}</p>
            </div>
          </div>
          <div className="space-y-1">
            {playersB.map((p) => (
              <p key={p.id} className="text-sm text-indigo-200/60">
                {p.name}
              </p>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Game Scores */}
      {match.games && match.games.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 rounded-xl border border-indigo-800/30 bg-[#1a1730] p-5"
        >
          <h3 className="mb-4 text-center text-sm font-semibold uppercase tracking-wide text-indigo-400/50">
            Game Scores
          </h3>

          <p className="mb-4 text-center text-sm font-medium text-indigo-200/60">
            Games: {teamA?.shortName ?? 'A'} {gamesWonA} - {gamesWonB} {teamB?.shortName ?? 'B'}
          </p>

          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((gi) => {
              const game = match.games?.[gi];
              const isCurrent = gi === match.currentGame && match.status === 'live';
              return (
                <div
                  key={gi}
                  className={`rounded-lg border p-3 text-center transition-all ${
                    isCurrent
                      ? 'border-red-700 bg-red-950/30 ring-2 ring-red-800'
                      : game
                        ? 'border-indigo-800/30 bg-indigo-950/50'
                        : 'border-dashed border-indigo-800/20 bg-indigo-950/20'
                  }`}
                >
                  <p className="mb-1 text-xs font-semibold uppercase text-indigo-400/40">
                    Game {gi + 1}
                    {isCurrent && (
                      <span className="ml-1 text-red-400">LIVE</span>
                    )}
                  </p>
                  {game ? (
                    <p className="text-2xl font-bold text-white">
                      {game.scoreA} <span className="text-indigo-500/50">-</span> {game.scoreB}
                    </p>
                  ) : (
                    <p className="text-2xl font-bold text-indigo-700">
                      - <span className="text-indigo-700">-</span> -
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Upcoming state */}
      {match.status === 'upcoming' && (
        <div className="rounded-xl border border-dashed border-indigo-800/30 py-12 text-center">
          <p className="text-lg font-medium text-indigo-300/50">
            Match has not started yet
          </p>
          <p className="mt-1 text-sm text-indigo-400/40">
            Check back when it goes live!
          </p>
        </div>
      )}
    </div>
  );
}
