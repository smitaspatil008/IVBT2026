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
      className="rounded-xl border border-[#293452]/30 bg-[#111a35] p-4 sm:p-5 hover:border-[#ff167a]/30 transition-colors"
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
            <span className="text-[10px] font-bold text-[#7a8aaa]/40 bg-[#293452]/10 px-2 py-0.5 rounded-full">
              #{number}
            </span>
            <h3 className="font-bold text-sm sm:text-base text-white">{title}</h3>
          </div>
          <p className="text-xs sm:text-sm text-[#aab4cc]/60 leading-relaxed">{description}</p>
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
    color: '#ff167a',
  },
  {
    title: 'Deuce Rule',
    description: 'At 10-all, the pair which first gains a 2-point lead wins that game. At 14-all, the side scoring the 15th point wins that game.',
    icon: Target,
    color: '#ffc857',
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
    color: '#ffc857',
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
          <BookOpen className="h-7 w-7 text-[#ff167a]" />
          Game Rules
        </h1>
        <p className="mt-1 text-sm text-[#aab4cc]/50">
          Official rules for IVBT 2026 — Women's Doubles Badminton
        </p>
      </motion.div>

      {/* Quick Summary Cards */}
      <motion.div variants={item} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-xl border border-[#ff167a]/20 bg-[#ff167a]/5 p-4 text-center">
          <div className="text-2xl font-bold text-[#ff167a]">11</div>
          <div className="text-[10px] text-[#aab4cc]/50 uppercase tracking-wider mt-1">Points per Game</div>
        </div>
        <div className="rounded-xl border border-[#ffc857]/20 bg-[#ffc857]/5 p-4 text-center">
          <div className="text-2xl font-bold text-[#ffc857]">3</div>
          <div className="text-[10px] text-[#aab4cc]/50 uppercase tracking-wider mt-1">Best of Games</div>
        </div>
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-center">
          <div className="text-2xl font-bold text-emerald-400">15</div>
          <div className="text-[10px] text-[#aab4cc]/50 uppercase tracking-wider mt-1">Max Points Cap</div>
        </div>
        <div className="rounded-xl border border-[#293452]/20 bg-[#293452]/5 p-4 text-center">
          <div className="text-2xl font-bold text-[#7a8aaa]">2</div>
          <div className="text-[10px] text-[#aab4cc]/50 uppercase tracking-wider mt-1">Point Lead at Deuce</div>
        </div>
      </motion.div>

      {/* Scoring Flow Diagram */}
      <motion.div variants={item} className="rounded-xl border border-[#293452]/30 bg-[#111a35] p-4 sm:p-6">
        <h2 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Scoring Flow</h2>
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-0 justify-center">
          {[
            { label: 'Game Start', sub: '0 - 0', color: '#6366f1' },
            { label: 'First to 11', sub: 'Wins game', color: '#ff167a' },
            { label: '10-all Deuce', sub: '2-point lead needed', color: '#ffc857' },
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
                <div className="hidden sm:block w-6 h-0.5 bg-[#293452]/40 mx-1" />
              )}
              {i < 4 && (
                <div className="sm:hidden h-4 w-0.5 bg-[#293452]/40" />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Tournament Format Diagram */}
      <motion.div variants={item} className="rounded-xl border border-[#293452]/30 bg-[#111a35] p-4 sm:p-6">
        <h2 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Tournament Format</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-lg border border-[#293452]/20 bg-[#293452]/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#293452] text-white flex items-center justify-center text-sm font-bold">1</div>
              <h3 className="font-bold text-white text-sm">Group Stage</h3>
            </div>
            <p className="text-xs text-[#aab4cc]/50">4 groups of 3 teams each. Round-robin within groups — every team plays 2 matches. Top team from each group qualifies.</p>
            <div className="mt-3 flex gap-1">
              {['A', 'B', 'C', 'D'].map((g) => (
                <span key={g} className="text-[9px] font-bold bg-[#293452]/20 text-[#aab4cc] px-2 py-1 rounded">
                  Group {g}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-[#ff167a]/20 bg-[#ff167a]/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#ff167a] text-white flex items-center justify-center text-sm font-bold">2</div>
              <h3 className="font-bold text-white text-sm">Semifinals</h3>
            </div>
            <p className="text-xs text-[#aab4cc]/50">Group A winner vs Group B winner. Group C winner vs Group D winner. Best of 3 games, 11 points each.</p>
            <div className="mt-3 space-y-1">
              <div className="text-[9px] font-bold bg-[#ff167a]/20 text-pink-300 px-2 py-1 rounded">SF1: Winner A vs Winner B</div>
              <div className="text-[9px] font-bold bg-[#ff167a]/20 text-pink-300 px-2 py-1 rounded">SF2: Winner C vs Winner D</div>
            </div>
          </div>
          <div className="rounded-lg border border-[#ffc857]/20 bg-[#ffc857]/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#ffc857] text-white flex items-center justify-center text-sm font-bold">3</div>
              <h3 className="font-bold text-white text-sm">Grand Final</h3>
            </div>
            <p className="text-xs text-[#aab4cc]/50">Winners of both semifinals compete for the championship. Best of 3 games, 11 points each.</p>
            <div className="mt-3">
              <div className="text-[9px] font-bold bg-[#ffc857]/20 text-[#ffc857] px-2 py-1 rounded">
                SF1 Winner vs SF2 Winner
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Court Diagram */}
      <motion.div variants={item} className="rounded-xl border border-[#293452]/30 bg-[#111a35] p-4 sm:p-6">
        <h2 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Doubles Court Layout</h2>
        <div className="flex justify-center">
          <svg viewBox="0 0 520 340" className="w-full max-w-lg" xmlns="http://www.w3.org/2000/svg">
            {/* Court surface */}
            <rect x="30" y="20" width="460" height="300" rx="2" fill="#1a6b3c" />
            {/* Outer boundary — doubles sideline */}
            <rect x="40" y="30" width="440" height="280" fill="none" stroke="white" strokeWidth="2.5" />
            {/* Singles sidelines */}
            <line x1="70" y1="30" x2="70" y2="310" stroke="white" strokeWidth="1.5" />
            <line x1="450" y1="30" x2="450" y2="310" stroke="white" strokeWidth="1.5" />
            {/* Net — centre line */}
            <line x1="260" y1="20" x2="260" y2="320" stroke="white" strokeWidth="2.5" />
            {/* Net posts */}
            <circle cx="260" cy="25" r="4" fill="#888" stroke="#666" strokeWidth="1" />
            <circle cx="260" cy="315" r="4" fill="#888" stroke="#666" strokeWidth="1" />
            {/* Net mesh pattern */}
            {[35, 55, 75, 95, 115, 135, 155, 175, 195, 215, 235, 255, 275, 295].map((y) => (
              <line key={y} x1="258" y1={y} x2="262" y2={y} stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
            ))}
            {/* Short service lines */}
            <line x1="40" y1="108" x2="260" y2="108" stroke="white" strokeWidth="1.5" />
            <line x1="260" y1="108" x2="480" y2="108" stroke="white" strokeWidth="1.5" />
            <line x1="40" y1="232" x2="260" y2="232" stroke="white" strokeWidth="1.5" />
            <line x1="260" y1="232" x2="480" y2="232" stroke="white" strokeWidth="1.5" />
            {/* Long service lines (doubles) */}
            <line x1="40" y1="55" x2="260" y2="55" stroke="white" strokeWidth="1" />
            <line x1="260" y1="55" x2="480" y2="55" stroke="white" strokeWidth="1" />
            <line x1="40" y1="285" x2="260" y2="285" stroke="white" strokeWidth="1" />
            <line x1="260" y1="285" x2="480" y2="285" stroke="white" strokeWidth="1" />
            {/* Centre lines (service court dividers) */}
            <line x1="150" y1="108" x2="150" y2="232" stroke="white" strokeWidth="1.5" />
            <line x1="370" y1="108" x2="370" y2="232" stroke="white" strokeWidth="1.5" />

            {/* Team A shading */}
            <rect x="41" y="31" width="218" height="278" fill="rgba(99,102,241,0.12)" />
            {/* Team B shading */}
            <rect x="261" y="31" width="218" height="278" fill="rgba(236,72,153,0.12)" />

            {/* Player figures — Team A */}
            <circle cx="120" cy="145" r="10" fill="#6366f1" opacity="0.9" />
            <text x="120" y="149" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">1</text>
            <circle cx="120" cy="210" r="10" fill="#6366f1" opacity="0.9" />
            <text x="120" y="214" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">2</text>
            {/* Player figures — Team B */}
            <circle cx="400" cy="145" r="10" fill="#ff167a" opacity="0.9" />
            <text x="400" y="149" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">1</text>
            <circle cx="400" cy="210" r="10" fill="#ff167a" opacity="0.9" />
            <text x="400" y="214" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">2</text>

            {/* Labels — service courts */}
            <text x="95" y="85" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">Long Service</text>
            <text x="95" y="93" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">Line (Doubles)</text>
            <text x="95" y="125" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9" fontWeight="bold">Right</text>
            <text x="95" y="135" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9" fontWeight="bold">Service Court</text>
            <text x="95" y="250" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9" fontWeight="bold">Left</text>
            <text x="95" y="260" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9" fontWeight="bold">Service Court</text>
            <text x="200" y="125" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9" fontWeight="bold">Left</text>
            <text x="200" y="135" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9" fontWeight="bold">Service Court</text>
            <text x="200" y="250" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9" fontWeight="bold">Right</text>
            <text x="200" y="260" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9" fontWeight="bold">Service Court</text>

            <text x="320" y="125" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9" fontWeight="bold">Left</text>
            <text x="320" y="135" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9" fontWeight="bold">Service Court</text>
            <text x="320" y="250" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9" fontWeight="bold">Right</text>
            <text x="320" y="260" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9" fontWeight="bold">Service Court</text>
            <text x="425" y="125" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9" fontWeight="bold">Right</text>
            <text x="425" y="135" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9" fontWeight="bold">Service Court</text>
            <text x="425" y="250" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9" fontWeight="bold">Left</text>
            <text x="425" y="260" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9" fontWeight="bold">Service Court</text>

            {/* Net label */}
            <rect x="242" y="164" width="36" height="14" rx="3" fill="rgba(0,0,0,0.5)" />
            <text x="260" y="174" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">NET</text>

            {/* Team labels at top */}
            <rect x="80" y="0" width="100" height="18" rx="4" fill="#6366f1" />
            <text x="130" y="13" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">TEAM A</text>
            <rect x="340" y="0" width="100" height="18" rx="4" fill="#ff167a" />
            <text x="390" y="13" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">TEAM B</text>

            {/* Sideline labels */}
            <text x="55" y="173" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="7" transform="rotate(-90, 55, 173)">Doubles Sideline</text>
            <text x="465" y="173" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="7" transform="rotate(90, 465, 173)">Doubles Sideline</text>
            <text x="70" y="173" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="6" transform="rotate(-90, 70, 173)">Singles Sideline</text>
            <text x="450" y="173" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="6" transform="rotate(90, 450, 173)">Singles Sideline</text>

            {/* Short service line label */}
            <text x="150" y="103" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7">Short Service Line</text>
            <text x="370" y="103" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7">Short Service Line</text>
          </svg>
        </div>
      </motion.div>

      {/* All Rules */}
      <motion.div variants={item}>
        <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-[#7a8aaa]" />
          Complete Rules
        </h2>
      </motion.div>

      <div className="grid gap-3 sm:grid-cols-2">
        {rules.map((rule, i) => (
          <RuleCard key={i} number={i + 1} {...rule} />
        ))}
      </div>

      <motion.div variants={item} className="rounded-lg border border-[#293452]/20 bg-[#293452]/5 px-4 py-2.5 text-xs text-[#aab4cc]/60">
        <span className="font-semibold text-[#aab4cc]/80">Note:</span> These rules are specific to IVBT 2026.
        The umpire's decision is final in all matters of play.
      </motion.div>
    </motion.div>
  );
}
