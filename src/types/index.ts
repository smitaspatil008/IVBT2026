export type MatchStatus = 'upcoming' | 'live' | 'completed';
export type TournamentStatus = 'upcoming' | 'live' | 'completed';

export interface Tournament {
  id: string;
  name: string;
  year: number;
  status: TournamentStatus;
  startDate: string;
  endDate: string;
}

export interface Player {
  id: string;
  name: string;
  photo: string;
  teamId: string;
  matchesPlayed: number;
  wins: number;
  losses: number;
}

export interface Team {
  id: string;
  name: string;
  shortName: string; // 2-3 letter abbreviation
  color: string; // hex color
  playerIds: string[];
  wins: number;
  losses: number;
  draws: number;
  points: number;
  status: 'active' | 'eliminated' | 'champion' | 'runner-up';
}

export interface GameScore {
  scoreA: number;
  scoreB: number;
}

export interface Match {
  id: string;
  round: string; // "Group A - Day 1", "Quarterfinal", "Semifinal", "Final"
  teamAId: string;
  teamBId: string;
  games: GameScore[]; // array of up to 3 games
  currentGame: number; // 0, 1, or 2 (index of current game being played)
  status: MatchStatus;
  court: string;
  scheduledAt: string;
  winner?: string; // teamId or undefined
  group?: string; // group id for group stage matches
}

export interface Group {
  id: string;
  name: string; // "Group A", "Group B", etc.
  teamIds: string[];
}

export interface GroupStanding {
  teamId: string;
  teamName?: string;
  played: number;
  won: number;
  lost: number;
  drawn: number;
  gamesWon: number; // total individual games won
  gamesLost: number;
  pointsScored: number; // total rally points scored
  pointsConceded: number;
  points: number; // 2 for match win, 1 for draw, 0 for loss
  qualified: boolean;
}

export interface GalleryItem {
  id: string;
  photo: string;
  caption: string;
  category: 'match' | 'celebration' | 'team' | 'player';
  uploadedAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  type: 'info' | 'match' | 'winner' | 'champion';
  createdAt: string;
}

export interface TournamentUpdate {
  id: string;
  image?: string;
  text: string;
  playerId?: string;
  teamId?: string;
  createdAt: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  role: 'admin' | 'umpire' | null;
}
