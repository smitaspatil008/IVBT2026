import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import { useTournamentStore } from '../store/tournamentStore';
import type { Match, MatchStatus } from '../types';
import LiveBadge from '../components/ui/LiveBadge';

const TABS: { label: string; value: MatchStatus }[] = [
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Live', value: 'live' },
  { label: 'Completed', value: 'completed' },
];

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

function formatTime(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

function ScheduleMatchCard({ match }: { match: Match }) {
  const { teams } = useTournamentStore(useShallow((s) => ({ teams: s.teams })));
  const teamA = teams.find((t) => t.id === match.teamAId);
  const teamB = teams.find((t) => t.id === match.teamBId);

  const currentGame = match.games?.[match.currentGame];

  return (
    <Link to={`/match/${match.id}`}>
      <motion.div
        layout
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        className={`rounded-xl border p-4 transition-shadow hover:shadow-lg ${
          match.status === 'live'
            ? 'border-red-800/50 bg-red-950/30'
            : 'border-indigo-800/30 bg-[#1a1730]'
        }`}
      >
        {/* Header */}
        <div className="mb-3 flex items-center justify-between text-xs text-indigo-400/60">
          <span className="font-medium">{match.round}</span>
          <div className="flex items-center gap-1">
            {match.status === 'live' && <LiveBadge />}
            {match.status === 'completed' && (
              <span className="rounded-full bg-amber-400/10 px-2 py-0.5 text-xs font-semibold text-amber-400">
                Completed
              </span>
            )}
            {match.status === 'upcoming' && (
              <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-300">
                Upcoming
              </span>
            )}
          </div>
        </div>

        {/* Teams & Score */}
        <div className="flex items-center justify-between gap-2">
          {/* Team A */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div
              className="h-8 w-8 shrink-0 rounded-full"
              style={{ backgroundColor: teamA?.color ?? '#888' }}
            />
            <div className="min-w-0">
              <p className={`truncate text-sm font-bold ${match.winner === match.teamAId ? 'text-amber-400' : 'text-white'}`}>
                {teamA?.name ?? 'TBD'}
              </p>
              <p className="text-xs text-indigo-400/50">
                {teamA?.shortName ?? '---'}
              </p>
            </div>
          </div>

          {/* Score */}
          <div className="shrink-0 text-center">
            {match.status === 'upcoming' ? (
              <span className="text-sm font-medium text-indigo-400/40">
                vs
              </span>
            ) : (
              <div>
                {currentGame && match.status === 'live' && (
                  <p className="text-lg font-bold text-white">
                    {currentGame.scoreA} - {currentGame.scoreB}
                  </p>
                )}
                {match.games && match.games.length > 0 && (
                  <div className="flex items-center gap-1.5">
                    {match.games.map((g, i) => (
                      <span
                        key={i}
                        className={`text-xs font-medium ${
                          i === match.currentGame && match.status === 'live'
                            ? 'text-red-400'
                            : 'text-indigo-300/60'
                        }`}
                      >
                        {g.scoreA}-{g.scoreB}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Team B */}
          <div className="flex items-center gap-2 flex-1 min-w-0 justify-end text-right">
            <div className="min-w-0">
              <p className={`truncate text-sm font-bold ${match.winner === match.teamBId ? 'text-amber-400' : 'text-white'}`}>
                {teamB?.name ?? 'TBD'}
              </p>
              <p className="text-xs text-indigo-400/50">
                {teamB?.shortName ?? '---'}
              </p>
            </div>
            <div
              className="h-8 w-8 shrink-0 rounded-full"
              style={{ backgroundColor: teamB?.color ?? '#888' }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-3 flex items-center gap-4 text-xs text-indigo-400/50">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {formatTime(match.scheduledAt)}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {match.court}
          </span>
        </div>
      </motion.div>
    </Link>
  );
}

export default function Schedule() {
  const [activeTab, setActiveTab] = useState<MatchStatus>('upcoming');
  const { matches } = useTournamentStore(useShallow((s) => ({ matches: s.matches })));

  const hasLive = useMemo(() => matches.some((m) => m.status === 'live'), [matches]);

  const filtered = useMemo(() => {
    const list = matches
      .filter((m) => m.status === activeTab)
      .sort((a, b) => {
        const ta = new Date(a.scheduledAt).getTime();
        const tb = new Date(b.scheduledAt).getTime();
        return activeTab === 'completed' ? tb - ta : ta - tb;
      });
    return list;
  }, [matches, activeTab]);

  const grouped = useMemo(() => {
    const map = new Map<string, Match[]>();
    for (const m of filtered) {
      const key = formatDate(m.scheduledAt);
      const arr = map.get(key) ?? [];
      arr.push(m);
      map.set(key, arr);
    }
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <div className="mx-auto max-w-4xl py-8">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <Calendar className="h-7 w-7 text-indigo-400" />
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          Match Schedule
        </h1>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-1 rounded-xl bg-indigo-950/50 p-1">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`relative flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === tab.value
                ? 'bg-indigo-600 text-white shadow'
                : 'text-indigo-300/50 hover:text-indigo-200'
            }`}
          >
            {tab.label}
            {tab.value === 'live' && hasLive && (
              <span className="ml-1.5 inline-block h-2 w-2 rounded-full bg-red-500" />
            )}
          </button>
        ))}
      </div>

      {/* Matches */}
      {grouped.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-16 text-center text-indigo-300/50"
        >
          <Calendar className="mx-auto mb-3 h-12 w-12 opacity-30" />
          <p className="text-lg font-medium">No {activeTab} matches</p>
          <p className="text-sm text-indigo-400/40">
            {activeTab === 'upcoming' && 'All matches have started or completed.'}
            {activeTab === 'live' && 'No matches are being played right now.'}
            {activeTab === 'completed' && 'No matches have been completed yet.'}
          </p>
        </motion.div>
      ) : (
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {grouped.map(([date, matchList]) => (
              <motion.div
                key={date}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Date Header */}
                <div className="mb-3 flex items-center gap-2">
                  <div className="h-px flex-1 bg-indigo-800/30" />
                  <span className="shrink-0 rounded-full bg-indigo-950/50 px-3 py-1 text-xs font-semibold text-indigo-300/70">
                    {date}
                  </span>
                  <div className="h-px flex-1 bg-indigo-800/30" />
                </div>

                <div className="space-y-3">
                  {matchList.map((m) => (
                    <ScheduleMatchCard key={m.id} match={m} />
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
