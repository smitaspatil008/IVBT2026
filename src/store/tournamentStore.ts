import { create } from 'zustand';
import type {
  Tournament,
  Player,
  Team,
  Match,
  Group,
  GroupStanding,
  GameScore,
  Announcement,
  TournamentUpdate,
  GalleryItem,
  AuthState,
} from '../types';
import { tournamentRef, onValue, set as firebaseSet } from '../lib/firebase';
import {
  defaultTournament,
  defaultTeams,
  defaultPlayers,
  defaultMatches,
  defaultGroups,
  defaultAnnouncements,
  defaultUpdates,
  defaultGallery,
  DATA_VERSION,
} from '../data/mockData';

// ---------------------------------------------------------------------------
// Knockout bracket mapping — maps a completed knockout match to the next
// match and the slot the winner fills.
// ---------------------------------------------------------------------------
const KNOCKOUT_BRACKET: Record<
  string,
  { nextMatchId: string; slot: 'teamAId' | 'teamBId' }
> = {
  qf1: { nextMatchId: 'sf1', slot: 'teamAId' },
  qf2: { nextMatchId: 'sf1', slot: 'teamBId' },
  qf3: { nextMatchId: 'sf2', slot: 'teamAId' },
  qf4: { nextMatchId: 'sf2', slot: 'teamBId' },
  sf1: { nextMatchId: 'f1', slot: 'teamAId' },
  sf2: { nextMatchId: 'f1', slot: 'teamBId' },
};

// ---------------------------------------------------------------------------
// Firebase empty-array sentinel helpers
// ---------------------------------------------------------------------------
const EMPTY_SENTINEL = { __empty: true };

/** Convert arrays so Firebase doesn't silently strip empty ones. */
function toFirebaseSafe<T>(arr: T[]): T[] | typeof EMPTY_SENTINEL {
  return arr.length === 0 ? (EMPTY_SENTINEL as any) : arr;
}

/** Restore arrays that Firebase may have replaced with the sentinel. */
function fromFirebaseSafe<T>(val: T[] | typeof EMPTY_SENTINEL | undefined): T[] {
  if (!val) return [];
  if ((val as any).__empty) return [];
  if (!Array.isArray(val)) return [];
  return val;
}

// ---------------------------------------------------------------------------
// Store interface
// ---------------------------------------------------------------------------
interface TournamentState {
  // Data
  tournament: Tournament;
  teams: Team[];
  players: Player[];
  matches: Match[];
  groups: Group[];
  announcements: Announcement[];
  updates: TournamentUpdate[];
  gallery: GalleryItem[];
  auth: AuthState;
  pin: string;

  // Meta
  isLoading: boolean;
  isSyncing: boolean;
  dataVersion: number;

  // Firebase sync
  initFirebaseSync: () => () => void;

  // Auth
  login: (pin: string, role: 'admin' | 'umpire') => boolean;
  logout: () => void;
  setPin: (newPin: string) => void;

  // Teams
  addTeam: (team: Team) => void;
  updateTeam: (id: string, updates: Partial<Team>) => void;
  deleteTeam: (id: string) => void;

  // Players
  addPlayer: (player: Player) => void;
  updatePlayer: (id: string, updates: Partial<Player>) => void;
  deletePlayer: (id: string) => void;

  // Matches
  addMatch: (match: Match) => void;
  updateMatch: (id: string, updates: Partial<Match>) => void;
  deleteMatch: (id: string) => void;

  // Match flow
  startMatch: (matchId: string) => void;
  updateGameScore: (
    matchId: string,
    gameIndex: number,
    scoreA: number,
    scoreB: number,
  ) => void;
  incrementScore: (matchId: string, team: 'A' | 'B') => void;
  decrementScore: (matchId: string, team: 'A' | 'B') => void;
  finishMatch: (matchId: string, winnerId: string) => void;

  // Standings & knockout
  getGroupStandings: (groupId: string) => GroupStanding[];
  advanceToKnockouts: () => void;

  // Announcements
  addAnnouncement: (a: Announcement) => void;
  deleteAnnouncement: (id: string) => void;

  // Updates
  addUpdate: (u: TournamentUpdate) => void;
  deleteUpdate: (id: string) => void;

  // Gallery
  addGalleryItem: (item: GalleryItem) => void;
  deleteGalleryItem: (id: string) => void;
}

// ---------------------------------------------------------------------------
// Store implementation
// ---------------------------------------------------------------------------
export const useTournamentStore = create<TournamentState>((set, get) => {
  // Internal flag to prevent write-back when hydrating from Firebase.
  let skipSync = false;

  return {
    // ---- initial state ----
    tournament: defaultTournament,
    teams: defaultTeams,
    players: defaultPlayers,
    matches: defaultMatches,
    groups: defaultGroups,
    announcements: defaultAnnouncements,
    updates: defaultUpdates,
    gallery: defaultGallery,
    auth: { isLoggedIn: false, role: null },
    pin: '123456',
    isLoading: true,
    isSyncing: false,
    dataVersion: DATA_VERSION,

    // ------------------------------------------------------------------
    // Firebase sync
    // ------------------------------------------------------------------
    initFirebaseSync: () => {
      // Timeout fallback — if Firebase doesn't respond in 3s, use defaults
      const fallbackTimer = setTimeout(() => {
        if (get().isLoading) {
          console.warn('Firebase timeout — using default data');
          set({ isLoading: false });
        }
      }, 3000);

      // Listen to remote data
      const unsubscribe = onValue(tournamentRef, (snapshot) => {
        clearTimeout(fallbackTimer);
        const data = snapshot.val();
        if (!data) {
          // First run — push defaults to Firebase
          skipSync = true;
          const state = get();
          firebaseSet(tournamentRef, {
            tournament: state.tournament,
            teams: toFirebaseSafe(state.teams),
            players: toFirebaseSafe(state.players),
            matches: toFirebaseSafe(state.matches),
            groups: toFirebaseSafe(state.groups),
            announcements: toFirebaseSafe(state.announcements),
            updates: toFirebaseSafe(state.updates),
            gallery: toFirebaseSafe(state.gallery),
            pin: state.pin,
            dataVersion: DATA_VERSION,
          }).finally(() => { skipSync = false; });
          set({ isLoading: false });
          return;
        }

        skipSync = true;

        if (data.dataVersion === DATA_VERSION) {
          set({
            tournament: data.tournament ?? defaultTournament,
            teams: fromFirebaseSafe(data.teams),
            players: fromFirebaseSafe(data.players),
            matches: fromFirebaseSafe(data.matches),
            groups: fromFirebaseSafe(data.groups),
            announcements: fromFirebaseSafe(data.announcements),
            updates: fromFirebaseSafe(data.updates),
            gallery: fromFirebaseSafe(data.gallery),
            pin: data.pin ?? '123456',
            dataVersion: DATA_VERSION,
            isLoading: false,
          });
        } else {
          // Version mismatch — merge with defaults
          set({
            tournament: data.tournament ?? defaultTournament,
            teams:
              fromFirebaseSafe(data.teams).length > 0
                ? fromFirebaseSafe(data.teams)
                : defaultTeams,
            players:
              fromFirebaseSafe(data.players).length > 0
                ? fromFirebaseSafe(data.players)
                : defaultPlayers,
            matches:
              fromFirebaseSafe(data.matches).length > 0
                ? fromFirebaseSafe(data.matches)
                : defaultMatches,
            groups:
              fromFirebaseSafe(data.groups).length > 0
                ? fromFirebaseSafe(data.groups)
                : defaultGroups,
            announcements: fromFirebaseSafe(data.announcements),
            updates: fromFirebaseSafe(data.updates),
            gallery: fromFirebaseSafe(data.gallery),
            pin: data.pin ?? '123456',
            dataVersion: DATA_VERSION,
            isLoading: false,
          });
        }

        skipSync = false;
      }, (error) => {
        console.warn('Firebase connection error — using default data', error);
        clearTimeout(fallbackTimer);
        set({ isLoading: false });
      });

      // Subscribe to local changes and push to Firebase
      let isSyncingFlag = false;
      const unsubscribeStore = useTournamentStore.subscribe((state) => {
        if (skipSync || state.isLoading || isSyncingFlag) return;

        isSyncingFlag = true;
        firebaseSet(tournamentRef, {
          tournament: state.tournament,
          teams: toFirebaseSafe(state.teams),
          players: toFirebaseSafe(state.players),
          matches: toFirebaseSafe(state.matches),
          groups: toFirebaseSafe(state.groups),
          announcements: toFirebaseSafe(state.announcements),
          updates: toFirebaseSafe(state.updates),
          gallery: toFirebaseSafe(state.gallery),
          pin: state.pin,
          dataVersion: state.dataVersion,
        }).finally(() => {
          isSyncingFlag = false;
        });
      });

      // Return cleanup function
      return () => {
        unsubscribe();
        unsubscribeStore();
      };
    },

    // ------------------------------------------------------------------
    // Auth
    // ------------------------------------------------------------------
    login: (pin: string, role: 'admin' | 'umpire') => {
      const state = get();
      if (pin === state.pin) {
        const auth: AuthState = { isLoggedIn: true, role };
        set({ auth });
        localStorage.setItem('auth', JSON.stringify(auth));
        return true;
      }
      return false;
    },

    logout: () => {
      set({ auth: { isLoggedIn: false, role: null } });
      localStorage.removeItem('auth');
    },

    setPin: (newPin: string) => {
      set({ pin: newPin });
    },

    // ------------------------------------------------------------------
    // Teams CRUD
    // ------------------------------------------------------------------
    addTeam: (team) => {
      set((s) => ({ teams: [...s.teams, team] }));
    },

    updateTeam: (id, updates) => {
      set((s) => ({
        teams: s.teams.map((t) => (t.id === id ? { ...t, ...updates } : t)),
      }));
    },

    deleteTeam: (id) => {
      set((s) => ({ teams: s.teams.filter((t) => t.id !== id) }));
    },

    // ------------------------------------------------------------------
    // Players CRUD
    // ------------------------------------------------------------------
    addPlayer: (player) => {
      set((s) => ({ players: [...s.players, player] }));
    },

    updatePlayer: (id, updates) => {
      set((s) => ({
        players: s.players.map((p) =>
          p.id === id ? { ...p, ...updates } : p,
        ),
      }));
    },

    deletePlayer: (id) => {
      set((s) => ({ players: s.players.filter((p) => p.id !== id) }));
    },

    // ------------------------------------------------------------------
    // Matches CRUD
    // ------------------------------------------------------------------
    addMatch: (match) => {
      set((s) => ({ matches: [...s.matches, match] }));
    },

    updateMatch: (id, updates) => {
      set((s) => ({
        matches: s.matches.map((m) =>
          m.id === id ? { ...m, ...updates } : m,
        ),
      }));
    },

    deleteMatch: (id) => {
      set((s) => ({ matches: s.matches.filter((m) => m.id !== id) }));
    },

    // ------------------------------------------------------------------
    // Match flow
    // ------------------------------------------------------------------
    startMatch: (matchId) => {
      set((s) => ({
        matches: s.matches.map((m) =>
          m.id === matchId
            ? {
                ...m,
                status: 'live' as const,
                games: [{ scoreA: 0, scoreB: 0 }],
                currentGame: 0,
              }
            : m,
        ),
      }));
    },

    updateGameScore: (matchId, gameIndex, scoreA, scoreB) => {
      set((s) => ({
        matches: s.matches.map((m) => {
          if (m.id !== matchId) return m;
          const games = [...(m.games || [])];
          games[gameIndex] = { scoreA, scoreB };
          return { ...m, games };
        }),
      }));
    },

    incrementScore: (matchId, team) => {
      set((s) => {
        const matches = s.matches.map((m) => {
          if (m.id !== matchId || m.status !== 'live') return m;

          const games: GameScore[] = [...(m.games || [])];
          const gi = m.currentGame ?? 0;
          const current = { ...games[gi] };

          // Increment the requested side
          if (team === 'A') current.scoreA += 1;
          else current.scoreB += 1;

          games[gi] = current;

          // --- Badminton winning logic ---
          const { scoreA, scoreB } = current;
          let gamesWonA = 0;
          let gamesWonB = 0;

          // Check if this game is won
          const gameWon =
            (scoreA >= 21 && scoreA - scoreB >= 2) ||
            (scoreB >= 21 && scoreB - scoreA >= 2) ||
            scoreA === 30 ||
            scoreB === 30;

          if (gameWon) {
            // Tally games won across all games
            for (let i = 0; i < games.length; i++) {
              const g = games[i];
              const aWon =
                (g.scoreA >= 21 && g.scoreA - g.scoreB >= 2) ||
                g.scoreA === 30;
              const bWon =
                (g.scoreB >= 21 && g.scoreB - g.scoreA >= 2) ||
                g.scoreB === 30;
              if (aWon) gamesWonA++;
              if (bWon) gamesWonB++;
            }

            // Match won (best of 3)?
            if (gamesWonA === 2 || gamesWonB === 2) {
              const winnerId =
                gamesWonA === 2 ? m.teamAId : m.teamBId;
              return {
                ...m,
                games,
                status: 'completed' as const,
                winner: winnerId,
              };
            }

            // Start next game
            games.push({ scoreA: 0, scoreB: 0 });
            return { ...m, games, currentGame: gi + 1 };
          }

          return { ...m, games };
        });

        return { matches };
      });
    },

    decrementScore: (matchId, team) => {
      set((s) => ({
        matches: s.matches.map((m) => {
          if (m.id !== matchId || m.status !== 'live') return m;

          const games: GameScore[] = [...(m.games || [])];
          const gi = m.currentGame ?? 0;
          const current = { ...games[gi] };

          if (team === 'A') current.scoreA = Math.max(0, current.scoreA - 1);
          else current.scoreB = Math.max(0, current.scoreB - 1);

          games[gi] = current;
          return { ...m, games };
        }),
      }));
    },

    finishMatch: (matchId, winnerId) => {
      const state = get();
      const match = state.matches.find((m) => m.id === matchId);
      if (!match) return;

      const loserId =
        winnerId === match.teamAId ? match.teamBId : match.teamAId;

      // Update match status
      let updatedMatches = state.matches.map((m) =>
        m.id === matchId
          ? { ...m, status: 'completed' as const, winner: winnerId }
          : m,
      );

      // Advance winner in knockout bracket
      const bracket = KNOCKOUT_BRACKET[matchId];
      if (bracket) {
        updatedMatches = updatedMatches.map((m) =>
          m.id === bracket.nextMatchId
            ? { ...m, [bracket.slot]: winnerId }
            : m,
        );
      }

      // Update team stats
      const updatedTeams = state.teams.map((t) => {
        if (t.id === winnerId) {
          return { ...t, wins: t.wins + 1 };
        }
        if (t.id === loserId) {
          return { ...t, losses: t.losses + 1 };
        }
        return t;
      });

      // Update player stats
      const updatedPlayers = state.players.map((p) => {
        if (p.teamId === winnerId) {
          return { ...p, matchesPlayed: p.matchesPlayed + 1, wins: p.wins + 1 };
        }
        if (p.teamId === loserId) {
          return { ...p, matchesPlayed: p.matchesPlayed + 1, losses: p.losses + 1 };
        }
        return p;
      });

      set({
        matches: updatedMatches,
        teams: updatedTeams,
        players: updatedPlayers,
      });
    },

    // ------------------------------------------------------------------
    // Group standings
    // ------------------------------------------------------------------
    getGroupStandings: (groupId) => {
      const state = get();
      const group = state.groups.find((g) => g.id === groupId);
      if (!group) return [];

      const teamIds = group.teamIds;

      // Build standings map
      const standingsMap: Record<string, GroupStanding> = {};
      for (const tid of teamIds) {
        const team = state.teams.find((t) => t.id === tid);
        standingsMap[tid] = {
          teamId: tid,
          teamName: team?.name ?? tid,
          played: 0,
          won: 0,
          lost: 0,
          drawn: 0,
          points: 0,
          gamesWon: 0,
          gamesLost: 0,
          pointsScored: 0,
          pointsConceded: 0,
          qualified: false,
        };
      }

      // Process completed group matches
      const groupMatches = state.matches.filter(
        (m) => m.group === groupId && m.status === 'completed',
      );

      for (const match of groupMatches) {
        const a = standingsMap[match.teamAId];
        const b = standingsMap[match.teamBId];
        if (!a || !b) continue;

        a.played += 1;
        b.played += 1;

        // Count games won/lost
        let matchGamesA = 0;
        let matchGamesB = 0;
        for (const game of match.games || []) {
          a.pointsScored += game.scoreA;
          a.pointsConceded += game.scoreB;
          b.pointsScored += game.scoreB;
          b.pointsConceded += game.scoreA;

          const aWonGame =
            (game.scoreA >= 21 && game.scoreA - game.scoreB >= 2) ||
            game.scoreA === 30;
          const bWonGame =
            (game.scoreB >= 21 && game.scoreB - game.scoreA >= 2) ||
            game.scoreB === 30;

          if (aWonGame) {
            matchGamesA++;
            a.gamesWon++;
            b.gamesLost++;
          }
          if (bWonGame) {
            matchGamesB++;
            b.gamesWon++;
            a.gamesLost++;
          }
        }

        if (match.winner === match.teamAId) {
          a.won += 1;
          a.points += 2;
          b.lost += 1;
        } else if (match.winner === match.teamBId) {
          b.won += 1;
          b.points += 2;
          a.lost += 1;
        } else {
          // Draw
          a.drawn += 1;
          b.drawn += 1;
          a.points += 1;
          b.points += 1;
        }
      }

      const standings = Object.values(standingsMap);
      standings.sort((x, y) => {
        if (y.points !== x.points) return y.points - x.points;
        if (y.gamesWon !== x.gamesWon) return y.gamesWon - x.gamesWon;
        return (y.pointsScored - y.pointsConceded) - (x.pointsScored - x.pointsConceded);
      });
      standings.forEach((s, i) => { s.qualified = i < 2; });

      return standings;
    },

    // ------------------------------------------------------------------
    // Advance to knockouts
    // ------------------------------------------------------------------
    advanceToKnockouts: () => {
      const state = get();
      const groupIds = state.groups.map((g) => g.id);

      // Collect top 2 from each group (expect groups A, B, C, D)
      const qualifiers: Record<string, string[]> = {};
      for (const gid of groupIds) {
        const standings = get().getGroupStandings(gid);
        qualifiers[gid] = standings.slice(0, 2).map((s) => s.teamId);
      }

      // Map group letters to indices — assumes groups are named with
      // ids like 'groupA', 'groupB', etc. or sorted alphabetically.
      const sortedGroupIds = [...groupIds].sort();
      const gA = qualifiers[sortedGroupIds[0]] ?? [];
      const gB = qualifiers[sortedGroupIds[1]] ?? [];
      const gC = qualifiers[sortedGroupIds[2]] ?? [];
      const gD = qualifiers[sortedGroupIds[3]] ?? [];

      // QF matchups: A1 vs B2, B1 vs A2, C1 vs D2, D1 vs C2
      const assignments: Record<string, { teamAId: string; teamBId: string }> =
        {
          qf1: { teamAId: gA[0] ?? '', teamBId: gB[1] ?? '' },
          qf2: { teamAId: gB[0] ?? '', teamBId: gA[1] ?? '' },
          qf3: { teamAId: gC[0] ?? '', teamBId: gD[1] ?? '' },
          qf4: { teamAId: gD[0] ?? '', teamBId: gC[1] ?? '' },
        };

      set((s) => ({
        matches: s.matches.map((m) => {
          const assign = assignments[m.id];
          if (assign) {
            return {
              ...m,
              teamAId: assign.teamAId,
              teamBId: assign.teamBId,
              status: 'upcoming' as const,
            };
          }
          return m;
        }),
      }));
    },

    // ------------------------------------------------------------------
    // Announcements
    // ------------------------------------------------------------------
    addAnnouncement: (a) => {
      set((s) => ({ announcements: [...s.announcements, a] }));
    },

    deleteAnnouncement: (id) => {
      set((s) => ({
        announcements: s.announcements.filter((a) => a.id !== id),
      }));
    },

    // ------------------------------------------------------------------
    // Updates
    // ------------------------------------------------------------------
    addUpdate: (u) => {
      set((s) => ({ updates: [...s.updates, u] }));
    },

    deleteUpdate: (id) => {
      set((s) => ({ updates: s.updates.filter((u) => u.id !== id) }));
    },

    // ------------------------------------------------------------------
    // Gallery
    // ------------------------------------------------------------------
    addGalleryItem: (item) => {
      set((s) => ({ gallery: [...s.gallery, item] }));
    },

    deleteGalleryItem: (id) => {
      set((s) => ({ gallery: s.gallery.filter((g) => g.id !== id) }));
    },
  };
});
