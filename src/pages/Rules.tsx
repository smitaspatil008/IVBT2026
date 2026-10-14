import { motion } from 'framer-motion';
import { BookOpen, Target, RotateCcw, Users, AlertTriangle, Trophy, Shuffle, Gavel } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function Rules() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 pb-12">
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="flex items-center gap-3 text-2xl font-bold text-white md:text-3xl">
          <BookOpen className="h-7 w-7 text-[#ff167a]" />
          Official Rulebook
        </h1>
        <p className="mt-1 text-sm text-[#aab4cc]/50">
          IVBT 2026 — Women's Doubles Badminton Tournament
        </p>
        <p className="mt-3 text-xs sm:text-sm text-[#aab4cc]/60 leading-relaxed">
          This rulebook sets the rules every IVBT 2026 match is played and officiated by.
          Players, umpires and volunteers should read it before the first match; where a
          situation is not covered here, the referee's decision is final.
        </p>
      </motion.div>

      {/* ──────────────────────────────────────────────────────────────── */}
      {/* 1. Tournament Format at a Glance                               */}
      {/* ──────────────────────────────────────────────────────────────── */}
      <Section number={1} title="Tournament Format at a Glance" icon={Trophy} color="#6366f1">
        <p className="text-xs sm:text-sm text-[#aab4cc]/60 mb-4">
          Every IVBT 2026 match is a doubles match, best of three games, each game to 11 points.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#293452]/40">
                <th className="text-left py-2 pr-4 text-[#aab4cc]/80 font-semibold">Item</th>
                <th className="text-left py-2 text-[#aab4cc]/80 font-semibold">Rule</th>
              </tr>
            </thead>
            <tbody className="text-[#aab4cc]/60">
              <tr className="border-b border-[#293452]/20">
                <td className="py-2.5 pr-4 font-medium text-white/80">Match type</td>
                <td className="py-2.5">Doubles (two players per side, four on court)</td>
              </tr>
              <tr className="border-b border-[#293452]/20">
                <td className="py-2.5 pr-4 font-medium text-white/80">Match length</td>
                <td className="py-2.5">Best of three games</td>
              </tr>
              <tr className="border-b border-[#293452]/20">
                <td className="py-2.5 pr-4 font-medium text-white/80">Game target</td>
                <td className="py-2.5">11 points, rally-point scoring</td>
              </tr>
              <tr className="border-b border-[#293452]/20">
                <td className="py-2.5 pr-4 font-medium text-white/80">Extended play</td>
                <td className="py-2.5">From 10-10, win by two; at 19-19, the 20th point wins</td>
              </tr>
              <tr className="border-b border-[#293452]/20">
                <td className="py-2.5 pr-4 font-medium text-white/80">Venue</td>
                <td className="py-2.5">Indoors, on an official-dimension court</td>
              </tr>
              <tr className="border-b border-[#293452]/20">
                <td className="py-2.5 pr-4 font-medium text-white/80">Rest</td>
                <td className="py-2.5">Two rest periods per game</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-medium text-white/80">In charge</td>
                <td className="py-2.5">The referee</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

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
          <div className="text-2xl font-bold text-emerald-400">20</div>
          <div className="text-[10px] text-[#aab4cc]/50 uppercase tracking-wider mt-1">Max Points Cap</div>
        </div>
        <div className="rounded-xl border border-[#293452]/20 bg-[#293452]/5 p-4 text-center">
          <div className="text-2xl font-bold text-[#7a8aaa]">2</div>
          <div className="text-[10px] text-[#aab4cc]/50 uppercase tracking-wider mt-1">Point Lead at Deuce</div>
        </div>
      </motion.div>

      {/* ──────────────────────────────────────────────────────────────── */}
      {/* 2. Scoring Rules                                                */}
      {/* ──────────────────────────────────────────────────────────────── */}
      <Section number={2} title="Scoring Rules" icon={Target} color="#ff167a">
        <p className="text-xs sm:text-sm text-[#aab4cc]/60 mb-3">
          The first side to 11 points wins the game; the first side to win two games wins the match.
        </p>
        <ul className="space-y-2 text-xs sm:text-sm text-[#aab4cc]/60">
          <li className="flex gap-2">
            <span className="text-[#ff167a] mt-1 shrink-0">&#9679;</span>
            All matches are best of three games.
          </li>
          <li className="flex gap-2">
            <span className="text-[#ff167a] mt-1 shrink-0">&#9679;</span>
            A point is scored on every rally, whoever served. The side that wins the rally scores the point and serves next.
          </li>
          <li className="flex gap-2">
            <span className="text-[#ff167a] mt-1 shrink-0">&#9679;</span>
            At 10-10, a side must lead by two clear points to win the game.
          </li>
          <li className="flex gap-2">
            <span className="text-[#ff167a] mt-1 shrink-0">&#9679;</span>
            If the score reaches 19-19, the side that scores the 20th point wins the game.
          </li>
        </ul>
      </Section>

      {/* Scoring Flow Diagram */}
      <motion.div variants={item} className="rounded-xl border border-[#293452]/30 bg-[#111a35] p-4 sm:p-6">
        <h2 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">How a Game Ends</h2>
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-0 justify-center">
          {[
            { label: 'Play to 11', sub: 'a point every rally', color: '#6366f1' },
            { label: '10-10 Reached?', sub: 'deuce begins', color: '#ffc857' },
            { label: 'Win by 2', sub: 'e.g. 12-10, 15-13', color: '#ff167a' },
            { label: '19-19 Cap', sub: '20th point wins', color: '#dc2626' },
            { label: 'Best of 3', sub: 'win 2 games', color: '#10b981' },
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

      {/* ──────────────────────────────────────────────────────────────── */}
      {/* 3. Point Rules                                                  */}
      {/* ──────────────────────────────────────────────────────────────── */}
      <Section number={3} title="Point Rules" icon={Target} color="#ffc857">
        <p className="text-xs sm:text-sm text-[#aab4cc]/60 mb-3">
          A side wins the point when the shuttle lands in the opponents' half of the court, lines included.
        </p>
        <div className="rounded-lg bg-[#293452]/20 p-3 mb-3">
          <p className="text-xs font-semibold text-white/80 mb-1">On the line is in; only a shuttle landing fully outside is out</p>
          <div className="flex gap-4 mt-2 text-[10px] sm:text-xs text-[#aab4cc]/60">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" /> In: lands inside or on a line
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-400 inline-block" /> Out: lands fully outside the lines
            </span>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-[#aab4cc]/60 mb-2 font-medium text-white/70">A side loses the point when a player:</p>
        <ul className="space-y-1.5 text-xs sm:text-sm text-[#aab4cc]/60">
          <li className="flex gap-2">
            <span className="text-[#ffc857] mt-1 shrink-0">&#9679;</span>
            Hits the shuttle outside the court boundaries.
          </li>
          <li className="flex gap-2">
            <span className="text-[#ffc857] mt-1 shrink-0">&#9679;</span>
            Hits the shuttle into the net, or through or under it.
          </li>
          <li className="flex gap-2">
            <span className="text-[#ffc857] mt-1 shrink-0">&#9679;</span>
            Strikes the shuttle twice with the racket.
          </li>
          <li className="flex gap-2">
            <span className="text-[#ffc857] mt-1 shrink-0">&#9679;</span>
            Plays the shuttle before it has crossed the net to their side.
          </li>
          <li className="flex gap-2">
            <span className="text-[#ffc857] mt-1 shrink-0">&#9679;</span>
            Touches the net with the body or racket. A follow-through over the net is allowed, as long as the net is not touched.
          </li>
        </ul>
      </Section>

      {/* ──────────────────────────────────────────────────────────────── */}
      {/* 4. Service Rules                                                */}
      {/* ──────────────────────────────────────────────────────────────── */}
      <Section number={4} title="Service Rules" icon={Shuffle} color="#8b5cf6">
        <p className="text-xs sm:text-sm text-[#aab4cc]/60 mb-3">
          The server serves diagonally into the opponent's service court, from the right when their
          side's score is even and from the left when it is odd.
        </p>

        <div className="rounded-lg bg-[#293452]/20 p-3 mb-3">
          <p className="text-xs font-semibold text-white/80 mb-2">Even score: serve from the right. Odd score: from the left.</p>
          <div className="flex gap-4 text-[10px] sm:text-xs text-[#aab4cc]/60">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" /> Even score (0, 2, 4 …) — right court
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-orange-400 inline-block" /> Odd score (1, 3, 5 …) — left court
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#aab4cc]/60 mb-2 font-medium text-white/70">A serve is legal only when every check below holds:</p>
        <ol className="space-y-1.5 text-xs sm:text-sm text-[#aab4cc]/60 list-decimal list-inside">
          <li>The shuttle is struck below the server's waist.</li>
          <li>The serve travels diagonally into the opponent's service court.</li>
          <li>Server and receiver stay stationary until the serve is made.</li>
          <li>Both of the server's feet are in contact with the floor when striking the shuttle.</li>
          <li>The server's feet do not touch any court line.</li>
          <li>The racket strikes the cork (base) of the shuttle first, not the feathers.</li>
        </ol>
        <p className="mt-3 text-xs sm:text-sm text-[#aab4cc]/60">
          The serving side keeps the serve for as long as it keeps winning points.
        </p>
      </Section>

      {/* ──────────────────────────────────────────────────────────────── */}
      {/* 5. Doubles Service Rotation                                     */}
      {/* ──────────────────────────────────────────────────────────────── */}
      <Section number={5} title="Doubles Service Rotation" icon={RotateCcw} color="#0891b2">
        <p className="text-xs sm:text-sm text-[#aab4cc]/60 mb-3">
          In doubles, the serving pair swaps courts each time it wins a point on its own serve; the receiving pair never moves.
        </p>
        <ul className="space-y-1.5 text-xs sm:text-sm text-[#aab4cc]/60 mb-4">
          <li className="flex gap-2">
            <span className="text-cyan-400 mt-1 shrink-0">&#9679;</span>
            The first server of the game starts from the right service court and keeps serving, switching sides with the partner, for as long as their side wins points.
          </li>
          <li className="flex gap-2">
            <span className="text-cyan-400 mt-1 shrink-0">&#9679;</span>
            When the receiving side wins a rally, it scores the point and takes the serve. The new server is whichever of the pair stands in the correct court for their score: right if even, left if odd.
          </li>
          <li className="flex gap-2">
            <span className="text-cyan-400 mt-1 shrink-0">&#9679;</span>
            So the partner who did not serve first gets to serve only after their side has won a point as the receiving side.
          </li>
        </ul>

        <p className="text-xs font-semibold text-white/80 mb-2">
          Worked example — Pair A & B vs Pair C & D (A serves first, C receives first):
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-[10px] sm:text-xs">
            <thead>
              <tr className="border-b border-[#293452]/40">
                <th className="text-left py-2 pr-2 text-[#aab4cc]/80 font-semibold">Rally</th>
                <th className="text-left py-2 pr-2 text-[#aab4cc]/80 font-semibold">Won by</th>
                <th className="text-left py-2 pr-2 text-[#aab4cc]/80 font-semibold">Score</th>
                <th className="text-left py-2 pr-2 text-[#aab4cc]/80 font-semibold">Server</th>
                <th className="text-left py-2 pr-2 text-[#aab4cc]/80 font-semibold">Court</th>
                <th className="text-left py-2 text-[#aab4cc]/80 font-semibold">What changes</th>
              </tr>
            </thead>
            <tbody className="text-[#aab4cc]/60">
              {[
                ['Start', '—', '0 – 0', 'A', 'Right', 'A serves to C'],
                ['1', 'A & B', '1 – 0', 'A', 'Left', 'A and B swap courts'],
                ['2', 'C & D', '1 – 1', 'D', 'Left', 'Serve passes; nobody moves'],
                ['3', 'C & D', '1 – 2', 'D', 'Right', 'C and D swap courts'],
                ['4', 'A & B', '2 – 2', 'B', 'Right', 'Serve passes; B is in the right court'],
              ].map(([rally, won, score, server, court, change], i) => (
                <tr key={i} className="border-b border-[#293452]/20">
                  <td className="py-2 pr-2 font-medium text-white/80">{rally}</td>
                  <td className="py-2 pr-2">{won}</td>
                  <td className="py-2 pr-2 font-mono">{score}</td>
                  <td className="py-2 pr-2 font-medium text-white/80">{server}</td>
                  <td className="py-2 pr-2">{court}</td>
                  <td className="py-2">{change}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ──────────────────────────────────────────────────────────────── */}
      {/* 6. Play and Conduct                                             */}
      {/* ──────────────────────────────────────────────────────────────── */}
      <Section number={6} title="Play and Conduct" icon={Users} color="#10b981">
        <p className="text-xs sm:text-sm text-[#aab4cc]/60 mb-3">
          Matches are doubles, played indoors on a court of official dimensions, and every player is expected to play fairly.
        </p>
        <ul className="space-y-1.5 text-xs sm:text-sm text-[#aab4cc]/60">
          <li className="flex gap-2">
            <span className="text-emerald-400 mt-1 shrink-0">&#9679;</span>
            A match is played by four players, two per side.
          </li>
          <li className="flex gap-2">
            <span className="text-emerald-400 mt-1 shrink-0">&#9679;</span>
            During a rally, a player may return the shuttle from inside or outside the court.
          </li>
          <li className="flex gap-2">
            <span className="text-emerald-400 mt-1 shrink-0">&#9679;</span>
            No player may touch the net with any part of the body or racket.
          </li>
          <li className="flex gap-2">
            <span className="text-emerald-400 mt-1 shrink-0">&#9679;</span>
            No player may hit the shuttle twice.
          </li>
          <li className="flex gap-2">
            <span className="text-emerald-400 mt-1 shrink-0">&#9679;</span>
            No player may deliberately distract an opponent.
          </li>
          <li className="flex gap-2">
            <span className="text-emerald-400 mt-1 shrink-0">&#9679;</span>
            The referee may call a let for an unforeseen or accidental incident; the rally is then replayed with no point scored.
          </li>
          <li className="flex gap-2">
            <span className="text-emerald-400 mt-1 shrink-0">&#9679;</span>
            Each game includes two rest periods.
          </li>
        </ul>
      </Section>

      {/* ──────────────────────────────────────────────────────────────── */}
      {/* 7. Officials                                                    */}
      {/* ──────────────────────────────────────────────────────────────── */}
      <Section number={7} title="Officials" icon={Gavel} color="#ea580c">
        <p className="text-xs sm:text-sm text-[#aab4cc]/60">
          The referee is in overall charge of the IVBT 2026 tournament, and the referee's decision on any question of the rules is final.
        </p>
      </Section>

      {/* ──────────────────────────────────────────────────────────────── */}
      {/* 8. Quick Reference: Faults                                      */}
      {/* ──────────────────────────────────────────────────────────────── */}
      <Section number={8} title="Quick Reference: Faults" icon={AlertTriangle} color="#dc2626">
        <p className="text-xs sm:text-sm text-[#aab4cc]/60 mb-3">
          Any of these faults gives the point, and the next serve, to the other side.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#293452]/40">
                <th className="text-left py-2 pr-4 text-[#aab4cc]/80 font-semibold w-24">When</th>
                <th className="text-left py-2 text-[#aab4cc]/80 font-semibold">Fault</th>
              </tr>
            </thead>
            <tbody className="text-[#aab4cc]/60">
              {[
                ['Serving', 'Shuttle struck above the waist'],
                ['Serving', 'Serve not diagonal, or lands outside the service court'],
                ['Serving', 'Server or receiver moves before the serve is made'],
                ['Serving', 'A foot off the floor, or touching a line, at contact'],
                ['Serving', 'Feathers hit before the cork'],
                ['Rally', 'Shuttle lands outside the boundary lines'],
                ['Rally', 'Shuttle hits the net, or goes through or under it'],
                ['Rally', 'Shuttle hit twice by the same side\'s stroke'],
                ['Rally', 'Shuttle played before it crosses the net'],
                ['Any time', 'Body or racket touches the net'],
                ['Any time', 'Deliberately distracting an opponent'],
              ].map(([when, fault], i) => (
                <tr key={i} className="border-b border-[#293452]/20">
                  <td className="py-2.5 pr-4 font-medium text-white/80">{when}</td>
                  <td className="py-2.5">{fault}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ──────────────────────────────────────────────────────────────── */}
      {/* Tournament Format                                               */}
      {/* ──────────────────────────────────────────────────────────────── */}
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

      {/* Doubles Court Layout */}
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

      {/* Tiebreaker note */}
      <motion.div variants={item} className="rounded-lg border border-[#ffc857]/20 bg-[#ffc857]/5 px-4 py-3 text-xs sm:text-sm text-[#aab4cc]/60">
        <span className="font-semibold text-[#ffc857]">Tiebreaker rule:</span>{' '}
        In case of a tie in the group stage, 1 extra match of 1 set up to 11 points will be played between the tied teams to decide qualification.
      </motion.div>

      <motion.div variants={item} className="rounded-lg border border-[#293452]/20 bg-[#293452]/5 px-4 py-2.5 text-xs text-[#aab4cc]/60">
        <span className="font-semibold text-[#aab4cc]/80">Note:</span> These are the official rules for IVBT 2026.
        The referee's decision is final in all matters of play.
      </motion.div>
    </motion.div>
  );
}

function Section({
  number,
  title,
  icon: Icon,
  color,
  children,
}: {
  number: number;
  title: string;
  icon: React.ElementType;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={item}
      className="rounded-xl border border-[#293452]/30 bg-[#111a35] p-4 sm:p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-lg"
          style={{ background: color }}
        >
          <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-[#7a8aaa]/40 bg-[#293452]/30 px-2 py-0.5 rounded-full">
            #{number}
          </span>
          <h2 className="font-bold text-sm sm:text-base text-white">{title}</h2>
        </div>
      </div>
      {children}
    </motion.div>
  );
}
