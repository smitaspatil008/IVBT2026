import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Trophy,
  Users,
  Calendar,
  Zap,
  Shield,
  Award,
  Activity,
  ChevronRight,
  Info,
  Star,
  Crown,
  Clock,
} from 'lucide-react';
import { useTournamentStore } from '../store/tournamentStore';
import StatCard from '../components/ui/StatCard';
import CountdownTimer from '../components/ui/CountdownTimer';
import MatchCard from '../components/tournament/MatchCard';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function getAnnouncementIcon(type: string) {
  switch (type) {
    case 'match':
      return Activity;
    case 'winner':
      return Star;
    case 'champion':
      return Crown;
    default:
      return Info;
  }
}

export default function Landing() {
  const { teams, matches, announcements, updates } = useTournamentStore();

  const liveMatches = useMemo(
    () => matches.filter((m) => m.status === 'live'),
    [matches],
  );

  const completedMatches = useMemo(
    () => matches.filter((m) => m.status === 'completed'),
    [matches],
  );

  const navCards = [
    {
      label: 'Groups',
      desc: 'Round-robin standings',
      icon: Users,
      to: '/groups',
      gradient: 'from-violet-600 to-indigo-700',
    },
    {
      label: 'Bracket',
      desc: 'Knockout stage',
      icon: Trophy,
      to: '/bracket',
      gradient: 'from-amber-500 to-orange-600',
    },
    {
      label: 'Teams',
      desc: '16 pairs competing',
      icon: Shield,
      to: '/teams',
      gradient: 'from-rose-500 to-pink-600',
    },
    {
      label: 'Leaderboard',
      desc: 'Rankings & stats',
      icon: Award,
      to: '/leaderboard',
      gradient: 'from-cyan-500 to-teal-600',
    },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8 pb-12"
    >
      {/* Hero Section */}
      <motion.section
        variants={item}
        className="relative overflow-hidden rounded-2xl px-6 py-16 text-white shadow-2xl md:px-12 md:py-24"
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 30%, #4338ca 60%, #6366f1 100%)',
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-violet-400/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-indigo-400/5 blur-2xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-sm font-medium text-amber-300"
          >
            <span className="text-lg">🏸</span>
            Women's Doubles 2026
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="font-outfit text-4xl font-extrabold tracking-tight md:text-6xl"
          >
            <span className="bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent">
              Inspirit Vision
            </span>
            <br />
            <span className="text-2xl font-bold text-indigo-200 md:text-3xl">
              Badminton Tournament
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-lg text-indigo-200/80 md:text-xl"
          >
            16 Teams &bull; 32 Players &bull; 2 Days of Glory
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-3 flex flex-wrap justify-center gap-3 text-sm text-indigo-300/70"
          >
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              24 - 25 October 2026
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Registration closes 30 Sept
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <Link
              to="/live"
              className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 font-semibold text-gray-900 shadow-lg shadow-amber-400/20 transition hover:bg-amber-300 hover:shadow-xl hover:shadow-amber-400/30"
            >
              <Zap className="h-5 w-5" />
              View Live
            </Link>
            <Link
              to="/schedule"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 px-6 py-3 font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
            >
              <Calendar className="h-5 w-5" />
              Schedule
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Stat Cards */}
      <motion.section variants={item} className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard
          label="Total Teams"
          value={teams.length}
          icon={Shield}
          color="purple"
        />
        <StatCard
          label="Total Players"
          value={teams.reduce((acc, t) => acc + t.playerIds.length, 0)}
          icon={Users}
          color="blue"
        />
        <StatCard
          label="Live Matches"
          value={liveMatches.length}
          icon={Zap}
          color="red"
        />
        <StatCard
          label="Completed"
          value={completedMatches.length}
          icon={Trophy}
          color="amber"
        />
      </motion.section>

      {/* Live Matches */}
      {liveMatches.length > 0 && (
        <motion.section variants={item}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-xl font-bold text-white">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
              </span>
              Live Now
            </h2>
            <Link
              to="/live"
              className="flex items-center gap-1 text-sm font-medium text-amber-400 hover:text-amber-300"
            >
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {liveMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </motion.section>
      )}

      {/* Countdown Timer */}
      <motion.section variants={item}>
        <CountdownTimer targetDate="2026-10-24T09:00:00" label="Tournament Starts In" />
      </motion.section>

      {/* Quick Navigation */}
      <motion.section variants={item}>
        <h2 className="mb-4 text-xl font-bold text-white">
          Explore
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {navCards.map((card) => (
            <Link
              key={card.to}
              to={card.to}
              className="group relative overflow-hidden rounded-xl p-6 text-white shadow-lg transition hover:shadow-xl hover:-translate-y-0.5"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.gradient} transition group-hover:scale-105`}
              />
              <div className="relative z-10 flex flex-col items-center gap-2 text-center">
                <card.icon className="h-8 w-8 opacity-90" />
                <span className="font-bold">{card.label}</span>
                <span className="text-[11px] text-white/60">{card.desc}</span>
              </div>
            </Link>
          ))}
        </div>
      </motion.section>

      {/* Announcements */}
      {announcements.length > 0 && (
        <motion.section variants={item}>
          <h2 className="mb-4 text-xl font-bold text-white">
            Announcements
          </h2>
          <div className="space-y-3">
            {announcements.map((ann) => {
              const Icon = getAnnouncementIcon(ann.type);
              return (
                <div
                  key={ann.id}
                  className="flex items-start gap-4 rounded-xl border border-indigo-800/40 bg-[#1a1730] p-4 shadow-sm"
                >
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600/20 text-indigo-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-white">
                        {ann.title}
                      </h3>
                      <span className="rounded-full bg-amber-400/10 px-2 py-0.5 text-xs font-medium text-amber-400">
                        {ann.type}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-indigo-200/60">
                      {ann.body}
                    </p>
                    <p className="mt-1 text-xs text-indigo-400/40">
                      {new Date(ann.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>
      )}

      {/* Updates Carousel */}
      {updates.length > 0 && (
        <motion.section variants={item}>
          <h2 className="mb-4 text-xl font-bold text-white">
            Latest Updates
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {updates.map((update) => (
              <div
                key={update.id}
                className="min-w-[280px] max-w-[320px] shrink-0 rounded-xl border border-indigo-800/40 bg-[#1a1730] p-4 shadow-sm"
              >
                {update.image && (
                  <img
                    src={update.image}
                    alt=""
                    className="mb-3 h-40 w-full rounded-lg object-cover"
                  />
                )}
                <p className="text-sm text-indigo-200/70">
                  {update.text}
                </p>
                <p className="mt-2 text-xs text-indigo-400/40">
                  {new Date(update.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            ))}
          </div>
        </motion.section>
      )}
    </motion.div>
  );
}
