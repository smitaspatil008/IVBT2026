import { useMemo, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, CheckCircle } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import toast from 'react-hot-toast';
import { useTournamentStore } from '../store/tournamentStore';

function isGameWon(scoreA: number, scoreB: number): boolean {
  return (
    (scoreA >= 21 && scoreA - scoreB >= 2) ||
    (scoreB >= 21 && scoreB - scoreA >= 2) ||
    scoreA === 30 ||
    scoreB === 30
  );
}

function gameWinner(scoreA: number, scoreB: number): 'A' | 'B' | null {
  if (!isGameWon(scoreA, scoreB)) return null;
  if (
    (scoreA >= 21 && scoreA - scoreB >= 2) ||
    scoreA === 30
  )
    return 'A';
  return 'B';
}

export default function UmpireScreen() {
  const { id } = useParams<{ id: string }>();
  const {
    matches,
    teams,
    incrementScore,
    decrementScore,
    finishMatch,
  } = useTournamentStore(
    useShallow((s) => ({
      matches: s.matches,
      teams: s.teams,
      incrementScore: s.incrementScore,
      decrementScore: s.decrementScore,
      finishMatch: s.finishMatch,
    })),
  );

  const match = useMemo(() => matches.find((m) => m.id === id), [matches, id]);
  const teamA = useMemo(() => teams.find((t) => t.id === match?.teamAId), [teams, match]);
  const teamB = useMemo(() => teams.find((t) => t.id === match?.teamBId), [teams, match]);

  const [gameWonMessage, setGameWonMessage] = useState<string | null>(null);

  const gamesWon = useMemo(() => {
    let a = 0;
    let b = 0;
    for (const g of match?.games ?? []) {
      const w = gameWinner(g.scoreA, g.scoreB);
      if (w === 'A') a++;
      if (w === 'B') b++;
    }
    return { a, b };
  }, [match?.games]);

  const matchWon = gamesWon.a === 2 || gamesWon.b === 2;
  const matchWinnerId = matchWon
    ? gamesWon.a === 2
      ? match?.teamAId
      : match?.teamBId
    : null;
  const matchWinnerTeam = matchWinnerId
    ? teams.find((t) => t.id === matchWinnerId)
    : null;

  useEffect(() => {
    if (!match || match.status !== 'live') return;
    const currentGame = match.games?.[match.currentGame];
    if (!currentGame) return;
    const w = gameWinner(currentGame.scoreA, currentGame.scoreB);
    if (w && !matchWon) {
      const winnerName = w === 'A' ? teamA?.name : teamB?.name;
      const msg = `Game ${match.currentGame + 1} won by ${winnerName}!`;
      setGameWonMessage(msg);
      toast.success(msg);
      setTimeout(() => setGameWonMessage(null), 3000);
    }
  }, [match?.games, match?.currentGame]);

  if (!match) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0c0a17] px-4 text-white">
        <h1 className="mb-2 text-3xl font-bold">Match not found</h1>
        <Link to="/admin" className="text-indigo-400 hover:underline">
          Back to Admin
        </Link>
      </div>
    );
  }

  const currentGame = match.games?.[match.currentGame];
  const isLive = match.status === 'live';

  const handlePublishResult = () => {
    if (!matchWinnerId) return;
    finishMatch(match.id, matchWinnerId);
    toast.success('Match result published!');
  };

  return (
    <div className="min-h-screen bg-[#0c0a17] text-white">
      <div className="mx-auto max-w-lg px-4 py-6">
        {/* Back */}
        <Link
          to="/admin"
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-indigo-300/50 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Admin
        </Link>

        {/* Match Header */}
        <div className="mb-6 rounded-xl border border-indigo-800/30 bg-[#1a1730] p-4 text-center">
          <p className="text-sm font-semibold text-indigo-400">{match.round}</p>
          <p className="text-xs text-indigo-400/40">{match.court}</p>
          {isLive && (
            <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-white" />
              Live
            </span>
          )}
          {match.status === 'completed' && (
            <span className="mt-2 inline-block rounded-full bg-amber-400/20 px-3 py-1 text-xs font-bold uppercase text-amber-400">
              Completed
            </span>
          )}
        </div>

        {/* Team Names */}
        <div className="mb-4 grid grid-cols-2 gap-4 text-center">
          <div>
            <div
              className="mx-auto mb-2 h-12 w-12 rounded-full"
              style={{ backgroundColor: teamA?.color ?? '#888' }}
            />
            <p className="text-sm font-bold">{teamA?.name ?? 'TBD'}</p>
            <p className="text-xs text-indigo-400/40">{teamA?.shortName ?? '---'}</p>
          </div>
          <div>
            <div
              className="mx-auto mb-2 h-12 w-12 rounded-full"
              style={{ backgroundColor: teamB?.color ?? '#888' }}
            />
            <p className="text-sm font-bold">{teamB?.name ?? 'TBD'}</p>
            <p className="text-xs text-indigo-400/40">{teamB?.shortName ?? '---'}</p>
          </div>
        </div>

        {/* Games Won Summary */}
        <div className="mb-6 rounded-lg border border-indigo-800/30 bg-[#1a1730] p-3 text-center">
          <p className="text-xs uppercase tracking-wide text-indigo-400/40">Match Score</p>
          <p className="text-2xl font-bold">
            <span style={{ color: teamA?.color }}>{gamesWon.a}</span>
            <span className="mx-2 text-indigo-700">-</span>
            <span style={{ color: teamB?.color }}>{gamesWon.b}</span>
          </p>
        </div>

        {/* Game Tabs */}
        <div className="mb-4 flex gap-2">
          {[0, 1, 2].map((gi) => {
            const game = match.games?.[gi];
            const isCurrent = gi === match.currentGame && isLive;
            const isFuture = !game;
            return (
              <button
                key={gi}
                disabled={isFuture}
                className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${
                  isCurrent
                    ? 'bg-indigo-600 text-white'
                    : game
                      ? 'bg-indigo-900/30 text-indigo-300'
                      : 'bg-indigo-950/30 text-indigo-700 cursor-not-allowed'
                }`}
              >
                Game {gi + 1}
                {game && !isCurrent && (
                  <span className="ml-1 text-xs text-indigo-400/40">
                    ({game.scoreA}-{game.scoreB})
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Game Won Message */}
        <AnimatePresence>
          {gameWonMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-4 rounded-lg bg-indigo-600 p-3 text-center text-sm font-bold"
            >
              {gameWonMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Match Won Banner */}
        {matchWon && matchWinnerTeam && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 rounded-xl p-5 text-center"
            style={{ backgroundColor: matchWinnerTeam.color }}
          >
            <Trophy className="mx-auto mb-2 h-10 w-10" />
            <p className="text-xl font-bold">Match Won!</p>
            <p className="text-lg">{matchWinnerTeam.name}</p>
            {match.status === 'live' && (
              <button
                onClick={handlePublishResult}
                className="mt-3 rounded-lg bg-white px-6 py-2.5 text-sm font-bold text-gray-900 shadow hover:bg-gray-100 transition-colors"
              >
                <CheckCircle className="mr-1.5 inline h-4 w-4" />
                Publish Result
              </button>
            )}
          </motion.div>
        )}

        {/* Scoring Area */}
        {isLive && currentGame && !matchWon && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-xl border border-indigo-800/30 bg-[#1a1730] p-6"
          >
            <p className="mb-4 text-center text-xs uppercase tracking-wide text-indigo-400/40">
              Game {match.currentGame + 1}
            </p>

            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
              {/* Team A Score */}
              <div className="text-center">
                <p
                  className="mb-3 text-5xl font-black tabular-nums"
                  style={{ color: teamA?.color }}
                >
                  {currentGame.scoreA}
                </p>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => incrementScore(match.id, 'A')}
                    className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-600 text-2xl font-bold text-white shadow-lg active:scale-95 transition-transform hover:bg-indigo-500"
                  >
                    +
                  </button>
                  <button
                    onClick={() => decrementScore(match.id, 'A')}
                    className="flex h-14 w-14 items-center justify-center rounded-xl bg-red-600 text-2xl font-bold text-white shadow-lg active:scale-95 transition-transform hover:bg-red-500"
                  >
                    -
                  </button>
                </div>
              </div>

              {/* Separator */}
              <div className="text-3xl font-bold text-indigo-700">-</div>

              {/* Team B Score */}
              <div className="text-center">
                <p
                  className="mb-3 text-5xl font-black tabular-nums"
                  style={{ color: teamB?.color }}
                >
                  {currentGame.scoreB}
                </p>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => incrementScore(match.id, 'B')}
                    className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-600 text-2xl font-bold text-white shadow-lg active:scale-95 transition-transform hover:bg-indigo-500"
                  >
                    +
                  </button>
                  <button
                    onClick={() => decrementScore(match.id, 'B')}
                    className="flex h-14 w-14 items-center justify-center rounded-xl bg-red-600 text-2xl font-bold text-white shadow-lg active:scale-95 transition-transform hover:bg-red-500"
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Completed Games Summary */}
        {match.games && match.games.length > 0 && (
          <div className="rounded-xl border border-indigo-800/30 bg-[#1a1730] p-4">
            <h4 className="mb-3 text-center text-xs uppercase tracking-wide text-indigo-400/40">
              All Games
            </h4>
            <div className="space-y-2">
              {match.games.map((g, i) => {
                const w = gameWinner(g.scoreA, g.scoreB);
                return (
                  <div
                    key={i}
                    className={`flex items-center justify-between rounded-lg px-4 py-2 ${
                      i === match.currentGame && isLive
                        ? 'bg-indigo-600/20 border border-indigo-600/30'
                        : 'bg-indigo-950/50'
                    }`}
                  >
                    <span className="text-xs text-indigo-400/40">Game {i + 1}</span>
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-sm font-bold ${w === 'A' ? 'text-amber-400' : 'text-indigo-200/60'}`}
                      >
                        {g.scoreA}
                      </span>
                      <span className="text-indigo-700">-</span>
                      <span
                        className={`text-sm font-bold ${w === 'B' ? 'text-amber-400' : 'text-indigo-200/60'}`}
                      >
                        {g.scoreB}
                      </span>
                    </div>
                    <span className="text-xs text-indigo-400/40">
                      {w === 'A'
                        ? teamA?.shortName
                        : w === 'B'
                          ? teamB?.shortName
                          : i === match.currentGame && isLive
                            ? 'LIVE'
                            : ''}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Match already completed */}
        {match.status === 'completed' && (
          <div className="mt-6 text-center">
            <p className="text-sm text-indigo-400/40">
              This match has been completed.
            </p>
            <Link
              to={`/match/${match.id}`}
              className="mt-2 inline-block text-sm text-indigo-400 hover:underline"
            >
              View match details
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
