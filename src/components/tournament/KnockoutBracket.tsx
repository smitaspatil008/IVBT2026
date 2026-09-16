import { CheckCircle2 } from 'lucide-react';
import type { Match } from '../../types';
import { useTournamentStore } from '../../store/tournamentStore';

function matchesByRound(matches: Match[], keyword: string): Match[] {
  return matches.filter((m) => m.round.toLowerCase().includes(keyword.toLowerCase()));
}

function BracketMatch({ match }: { match: Match | undefined }) {
  const teams = useTournamentStore((s) => s.teams);

  if (!match) {
    return (
      <div className="w-48 rounded-lg border border-dashed border-[#1e1b4b]/30 bg-indigo-950/30 p-3 text-center text-sm text-indigo-400/40">
        TBD
      </div>
    );
  }

  const teamA = teams.find((t) => t.id === match.teamAId);
  const teamB = teams.find((t) => t.id === match.teamBId);

  const renderTeamRow = (
    team: typeof teamA,
    teamId: string,
    scores: number[],
    isWinner: boolean,
  ) => (
    <div
      className={`flex items-center justify-between gap-2 rounded px-2 py-1.5 ${
        isWinner
          ? 'bg-orange-500/10'
          : 'bg-[#12102a]'
      }`}
    >
      <div className="flex items-center gap-1.5">
        <span
          className="inline-block h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: team?.color ?? '#9ca3af' }}
        />
        <span
          className={`text-sm font-medium ${
            isWinner
              ? 'text-orange-500'
              : teamId
                ? 'text-indigo-100'
                : 'text-indigo-400/40'
          }`}
        >
          {team?.shortName ?? 'TBD'}
        </span>
        {isWinner && <CheckCircle2 className="h-3.5 w-3.5 text-orange-500" />}
      </div>
      <div className="flex gap-1">
        {scores.map((s, i) => (
          <span
            key={i}
            className="inline-flex h-5 w-6 items-center justify-center rounded bg-[#1e1b4b]/30 text-[11px] font-bold text-indigo-200"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-48 overflow-hidden rounded-lg border border-[#1e1b4b]/30 shadow-sm">
      <div className="bg-indigo-950/50 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-indigo-400/40">
        {match.round}
      </div>
      <div className="divide-y divide-[#1e1b4b]/20">
        {renderTeamRow(
          teamA,
          match.teamAId,
          (match.games ?? []).map((g) => g.scoreA),
          match.winner === match.teamAId,
        )}
        {renderTeamRow(
          teamB,
          match.teamBId,
          (match.games ?? []).map((g) => g.scoreB),
          match.winner === match.teamBId,
        )}
      </div>
    </div>
  );
}

export default function KnockoutBracket() {
  const matches = useTournamentStore((s) => s.matches);
  const teams = useTournamentStore((s) => s.teams);

  const qf = matchesByRound(matches, 'quarterfinal');
  const sf = matchesByRound(matches, 'semifinal');
  const finals = matchesByRound(matches, 'final').filter(
    (m) => !m.round.toLowerCase().includes('semifinal'),
  );

  const qf1 = qf[0];
  const qf2 = qf[1];
  const qf3 = qf[2];
  const qf4 = qf[3];
  const sf1 = sf[0];
  const sf2 = sf[1];
  const final = finals[0];

  const champion = final?.winner ? teams.find((t) => t.id === final.winner) : null;

  return (
    <div className="overflow-x-auto pb-4">
      {/* Desktop horizontal layout */}
      <div className="hidden min-w-[900px] items-center justify-center gap-4 lg:flex">
        <div className="flex flex-col gap-12">
          <BracketMatch match={qf1} />
          <BracketMatch match={qf2} />
        </div>

        <div className="flex flex-col items-center gap-12">
          <div className="h-px w-8 bg-indigo-700/40" />
          <div className="h-px w-8 bg-indigo-700/40" />
        </div>

        <div className="flex items-center">
          <BracketMatch match={sf1} />
        </div>

        <div className="flex items-center">
          <div className="h-px w-8 bg-indigo-700/40" />
        </div>

        <div className="flex flex-col items-center gap-3">
          <BracketMatch match={final} />
          {champion && (
            <div className="flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1 text-sm font-bold text-orange-500">
              <span className="text-base">🏆</span> {champion.name}
            </div>
          )}
        </div>

        <div className="flex items-center">
          <div className="h-px w-8 bg-indigo-700/40" />
        </div>

        <div className="flex items-center">
          <BracketMatch match={sf2} />
        </div>

        <div className="flex flex-col items-center gap-12">
          <div className="h-px w-8 bg-indigo-700/40" />
          <div className="h-px w-8 bg-indigo-700/40" />
        </div>

        <div className="flex flex-col gap-12">
          <BracketMatch match={qf3} />
          <BracketMatch match={qf4} />
        </div>
      </div>

      {/* Mobile vertical layout */}
      <div className="space-y-6 lg:hidden">
        <div>
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-indigo-400/40">
            Quarterfinals
          </h4>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <BracketMatch match={qf1} />
            <BracketMatch match={qf2} />
            <BracketMatch match={qf3} />
            <BracketMatch match={qf4} />
          </div>
        </div>

        <div className="flex justify-center">
          <div className="h-6 w-px bg-indigo-700/40" />
        </div>

        <div>
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-indigo-400/40">
            Semifinals
          </h4>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <BracketMatch match={sf1} />
            <BracketMatch match={sf2} />
          </div>
        </div>

        <div className="flex justify-center">
          <div className="h-6 w-px bg-indigo-700/40" />
        </div>

        <div>
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-indigo-400/40">
            Final
          </h4>
          <div className="flex flex-col items-start gap-3">
            <BracketMatch match={final} />
            {champion && (
              <div className="flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1 text-sm font-bold text-orange-500">
                <span className="text-base">🏆</span> {champion.name}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
