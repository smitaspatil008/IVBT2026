import { motion } from 'framer-motion';
import { BookOpen, Target, RotateCcw, Users, AlertTriangle, Trophy, Shuffle, Clock } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

interface RuleCardProps {
  number: number;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

function RuleCard({ number, title, description, icon: Icon, color }: RuleCardProps) {
  return (
    <motion.div
      variants={item}
      className="rounded-xl border border-[#1e1b4b]/30 bg-[#12102a] p-4 sm:p-5 hover:border-pink-500/30 transition-colors"
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div
          className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl text-white shadow-lg"
          style={{ background: color }}
        >
          <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold text-indigo-400/40 bg-indigo-500/10 px-2 py-0.5 rounded-full">
              #{number}
            </span>
            <h3 className="font-bold text-sm sm:text-base text-white">{title}</h3>
          </div>
          <p className="text-xs sm:text-sm text-indigo-200/60 leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}

const rules: Omit<RuleCardProps, 'number'>[] = [
  {
    title: 'Toss',
    description: 'A toss shall be conducted before a match begins. The winning side gets to choose whether to serve, receive, or pick a side of the court first.',
    icon: Shuffle,
    color: '#6366f1',
  },
  {
    title: 'Scoring System',
    description: 'A match consists of the best of three games of 11 points each. The pair scoring 11 points first wins the game.',
    icon: Target,
    color: '#ec4899',
  },
  {
    title: 'Deuce Rule',
    description: 'At 10-all, the pair which first gains a 2-point lead wins that game. At 14-all, the side scoring the 15th point wins that game.',
    icon: Target,
    color: '#f59e0b',
  },
  {
    title: 'Change of Ends',
    description: 'Players change ends after each game. In the third game, players change ends when the leading score reaches 6 points.',
    icon: RotateCcw,
    color: '#10b981',
  },
  {
    title: 'Serving Rules',
    description: 'A serve must be hit below the waist, with the racket head pointing downward. The shuttle must land within the diagonally opposite service court.',
    icon: Target,
    color: '#8b5cf6',
  },
  {
    title: 'Service Courts',
    description: 'In doubles, the server serves from the right service court when the serving side\'s score is even, and from the left court when it is odd.',
    icon: Users,
    color: '#0891b2',
  },
  {
    title: 'Doubles Receiving',
    description: 'Only the receiver may return the serve. If the shuttle is touched or hit by the receiver\'s partner, it is a fault and the serving side scores a point.',
    icon: Users,
    color: '#ea580c',
  },
  {
    title: 'Faults',
    description: 'A fault is called if the shuttle lands outside the boundary, passes through or under the net, fails to cross the net, or touches the ceiling/walls.',
    icon: AlertTriangle,
    color: '#dc2626',
  },
  {
    title: 'Lets',
    description: 'A "let" is called if the shuttle gets stuck on the net after passing over during a serve, or if both server and receiver commit a fault simultaneously.',
    icon: Clock,
    color: '#ca8a04',
  },
  {
    title: 'Continuous Play',
    description: 'Play shall be continuous from the first serve until the match is concluded. Intervals of 60 seconds are allowed between each game.',
    icon: Clock,
    color: '#059669',
  },
  {
    title: 'Shuttle Not in Play',
    description: 'A shuttle is not in play when it hits the net and remains on the same side, or when it hits the net or post and falls towards the surface on the striker\'s side.',
    icon: AlertTriangle,
    color: '#7c3aed',
  },
  {
    title: 'Net Play',
    description: 'A player shall not touch the net or its supports with racket, body, or clothing during play. A player must not invade the opponent\'s court.',
    icon: AlertTriangle,
    color: '#e11d48',
  },
  {
    title: 'Double Hit',
    description: 'The shuttle may only be hit once on each side of the net before it crosses over. In doubles, both partners may not hit the shuttle consecutively.',
    icon: Target,
    color: '#2563eb',
  },
  {
    title: 'Misconduct',
    description: 'Players shall not deliberately delay the game, modify the shuttle, behave in an offensive manner, or use any form of coaching during play.',
    icon: AlertTriangle,
    color: '#db2777',
  },
  {
    title: 'Tiebreaker Rule',
    description: 'In case of a tie in the group stage, 1 extra match of 1 set up to 11 points will be played between the tied teams to decide qualification.',
    icon: Trophy,
    color: '#f59e0b',
  },
  {
    title: 'Fair Play',
    description: 'All players must uphold the spirit of sportsmanship. The umpire\'s decision is final. Any disputes should be resolved respectfully.',
    icon: Trophy,
    color: '#10b981',
  },
];

export default function Rules() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 pb-12">
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="flex items-center gap-3 text-2xl font-bold text-white md:text-3xl">
          <BookOpen className="h-7 w-7 text-pink-500" />
          Game Rules
        </h1>
        <p className="mt-1 text-sm text-indigo-300/50">
          Official rules for IVBT 2026 — Women's Doubles Badminton
        </p>
      </motion.div>

      {/* Quick Summary Cards */}
      <motion.div variants={item} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-xl border border-pink-500/20 bg-pink-500/5 p-4 text-center">
          <div className="text-2xl font-bold text-pink-400">11</div>
          <div className="text-[10px] text-indigo-300/50 uppercase tracking-wider mt-1">Points per Game</div>
        </div>
        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 text-center">
          <div className="text-2xl font-bold text-yellow-400">3</div>
          <div className="text-[10px] text-indigo-300/50 uppercase tracking-wider mt-1">Best of Games</div>
        </div>
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-center">
          <div className="text-2xl font-bold text-emerald-400">15</div>
          <div className="text-[10px] text-indigo-300/50 uppercase tracking-wider mt-1">Max Points Cap</div>
        </div>
        <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4 text-center">
          <div className="text-2xl font-bold text-indigo-400">2</div>
          <div className="text-[10px] text-indigo-300/50 uppercase tracking-wider mt-1">Point Lead at Deuce</div>
        </div>
      </motion.div>

      {/* Scoring Flow Diagram */}
      <motion.div variants={item} className="rounded-xl border border-[#1e1b4b]/30 bg-[#12102a] p-4 sm:p-6">
        <h2 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Scoring Flow</h2>
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-0 justify-center">
          {[
            { label: 'Game Start', sub: '0 - 0', color: '#6366f1' },
            { label: 'First to 11', sub: 'Wins game', color: '#ec4899' },
            { label: '10-all Deuce', sub: '2-point lead needed', color: '#f59e0b' },
            { label: '14-all Cap', sub: '15th point wins', color: '#dc2626' },
            { label: 'Best of 3', sub: 'Win 2 games', color: '#10b981' },
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-2 sm:gap-0">
              <div className="flex flex-col items-center">
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex flex-col items-center justify-center text-white shadow-lg"
                  style={{ background: step.color }}
                >
                  <span className="text-[10px] font-bold leading-tight text-center px-1">{step.label}</span>
                  <span className="text-[8px] opacity-70 mt-0.5">{step.sub}</span>
                </div>
              </div>
              {i < 4 && (
                <div className="hidden sm:block w-6 h-0.5 bg-indigo-700/40 mx-1" />
              )}
              {i < 4 && (
                <div className="sm:hidden h-4 w-0.5 bg-indigo-700/40" />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Tournament Format Diagram */}
      <motion.div variants={item} className="rounded-xl border border-[#1e1b4b]/30 bg-[#12102a] p-4 sm:p-6">
        <h2 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Tournament Format</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-lg border border-indigo-500/20 bg-indigo-500/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-500 text-white flex items-center justify-center text-sm font-bold">1</div>
              <h3 className="font-bold text-white text-sm">Group Stage</h3>
            </div>
            <p className="text-xs text-indigo-200/50">4 groups of 3 teams each. Round-robin within groups — every team plays 2 matches. Top team from each group qualifies.</p>
            <div className="mt-3 flex gap-1">
              {['A', 'B', 'C', 'D'].map((g) => (
                <span key={g} className="text-[9px] font-bold bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded">
                  Group {g}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-pink-500/20 bg-pink-500/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-pink-500 text-white flex items-center justify-center text-sm font-bold">2</div>
              <h3 className="font-bold text-white text-sm">Semifinals</h3>
            </div>
            <p className="text-xs text-indigo-200/50">Group A winner vs Group B winner. Group C winner vs Group D winner. Best of 3 games, 11 points each.</p>
            <div className="mt-3 space-y-1">
              <div className="text-[9px] font-bold bg-pink-500/20 text-pink-300 px-2 py-1 rounded">SF1: Winner A vs Winner B</div>
              <div className="text-[9px] font-bold bg-pink-500/20 text-pink-300 px-2 py-1 rounded">SF2: Winner C vs Winner D</div>
            </div>
          </div>
          <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-yellow-500 text-white flex items-center justify-center text-sm font-bold">3</div>
              <h3 className="font-bold text-white text-sm">Grand Final</h3>
            </div>
            <p className="text-xs text-indigo-200/50">Winners of both semifinals compete for the championship. Best of 3 games, 11 points each.</p>
            <div className="mt-3">
              <div className="text-[9px] font-bold bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded">
                SF1 Winner vs SF2 Winner
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Court Diagram */}
      <motion.div variants={item} className="rounded-xl border border-[#1e1b4b]/30 bg-[#12102a] p-4 sm:p-6">
        <h2 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Doubles Court Layout</h2>
        <div className="flex justify-center">
          <svg viewBox="0 0 400 240" className="w-full max-w-md" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="10" width="360" height="220" rx="4" fill="none" stroke="#4f46e5" strokeWidth="2" opacity="0.4" />
            <line x1="200" y1="10" x2="200" y2="230" stroke="#ec4899" strokeWidth="2" opacity="0.6" />
            <text x="200" y="125" textAnchor="middle" fill="#ec4899" fontSize="8" opacity="0.7">NET</text>
            <rect x="20" y="10" width="180" height="110" rx="2" fill="none" stroke="#6366f1" strokeWidth="1" strokeDasharray="4 2" opacity="0.3" />
            <rect x="20" y="120" width="180" height="110" rx="2" fill="none" stroke="#6366f1" strokeWidth="1" strokeDasharray="4 2" opacity="0.3" />
            <rect x="200" y="10" width="180" height="110" rx="2" fill="none" stroke="#6366f1" strokeWidth="1" strokeDasharray="4 2" opacity="0.3" />
            <rect x="200" y="120" width="180" height="110" rx="2" fill="none" stroke="#6366f1" strokeWidth="1" strokeDasharray="4 2" opacity="0.3" />
            <line x1="20" y1="55" x2="200" y2="55" stroke="#6366f1" strokeWidth="1" strokeDasharray="4 2" opacity="0.2" />
            <line x1="200" y1="55" x2="380" y2="55" stroke="#6366f1" strokeWidth="1" strokeDasharray="4 2" opacity="0.2" />
            <line x1="20" y1="185" x2="200" y2="185" stroke="#6366f1" strokeWidth="1" strokeDasharray="4 2" opacity="0.2" />
            <line x1="200" y1="185" x2="380" y2="185" stroke="#6366f1" strokeWidth="1" strokeDasharray="4 2" opacity="0.2" />
            <text x="110" y="38" textAnchor="middle" fill="#818cf8" fontSize="7" opacity="0.5">Right Service Court</text>
            <text x="110" y="155" textAnchor="middle" fill="#818cf8" fontSize="7" opacity="0.5">Left Service Court</text>
            <text x="290" y="38" textAnchor="middle" fill="#818cf8" fontSize="7" opacity="0.5">Left Service Court</text>
            <text x="290" y="155" textAnchor="middle" fill="#818cf8" fontSize="7" opacity="0.5">Right Service Court</text>
            <text x="100" y="100" textAnchor="middle" fill="#6366f1" fontSize="10" fontWeight="bold" opacity="0.6">TEAM A</text>
            <text x="300" y="100" textAnchor="middle" fill="#ec4899" fontSize="10" fontWeight="bold" opacity="0.6">TEAM B</text>
          </svg>
        </div>
      </motion.div>

      {/* All Rules */}
      <motion.div variants={item}>
        <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-indigo-400" />
          Complete Rules
        </h2>
      </motion.div>

      <div className="grid gap-3 sm:grid-cols-2">
        {rules.map((rule, i) => (
          <RuleCard key={i} number={i + 1} {...rule} />
        ))}
      </div>

      <motion.div variants={item} className="rounded-lg border border-indigo-500/20 bg-indigo-500/5 px-4 py-2.5 text-xs text-indigo-200/60">
        <span className="font-semibold text-indigo-200/80">Note:</span> These rules are specific to IVBT 2026.
        The umpire's decision is final in all matters of play.
      </motion.div>
    </motion.div>
  );
}
