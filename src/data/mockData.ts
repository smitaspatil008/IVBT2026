import {
  Tournament,
  Player,
  Team,
  Match,
  Group,
  Announcement,
  TournamentUpdate,
  GalleryItem,
} from '../types';

// ── Tournament ──────────────────────────────────────────────────────────────────

export const defaultTournament: Tournament = {
  id: 'tournament-2026',
  name: 'Inspirit Vision Badminton Tournament',
  year: 2026,
  status: 'upcoming',
  startDate: '2026-10-24',
  endDate: '2026-10-25',
};

// ── Players (2 per team = 32 total) — Women's Doubles ─────────────────────────

export const defaultPlayers: Player[] = [
  // Group A — Shuttle Queens
  { id: 'p1', name: 'Priya Sharma', photo: '', teamId: 't1', matchesPlayed: 0, wins: 0, losses: 0 },
  { id: 'p2', name: 'Ananya Malhotra', photo: '', teamId: 't1', matchesPlayed: 0, wins: 0, losses: 0 },
  // Group A — Smash Sisters
  { id: 'p3', name: 'Kavya Deshmukh', photo: '', teamId: 't2', matchesPlayed: 0, wins: 0, losses: 0 },
  { id: 'p4', name: 'Isha Kulkarni', photo: '', teamId: 't2', matchesPlayed: 0, wins: 0, losses: 0 },
  // Group A — Net Blazers
  { id: 'p5', name: 'Meera Nair', photo: '', teamId: 't3', matchesPlayed: 0, wins: 0, losses: 0 },
  { id: 'p6', name: 'Divya Iyer', photo: '', teamId: 't3', matchesPlayed: 0, wins: 0, losses: 0 },
  // Group A — Rally Stars
  { id: 'p7', name: 'Sneha Reddy', photo: '', teamId: 't4', matchesPlayed: 0, wins: 0, losses: 0 },
  { id: 'p8', name: 'Pooja Joshi', photo: '', teamId: 't4', matchesPlayed: 0, wins: 0, losses: 0 },

  // Group B — Feather Flames
  { id: 'p9', name: 'Nisha Patil', photo: '', teamId: 't5', matchesPlayed: 0, wins: 0, losses: 0 },
  { id: 'p10', name: 'Ritika Sawant', photo: '', teamId: 't5', matchesPlayed: 0, wins: 0, losses: 0 },
  // Group B — Court Divas
  { id: 'p11', name: 'Aisha Gupta', photo: '', teamId: 't6', matchesPlayed: 0, wins: 0, losses: 0 },
  { id: 'p12', name: 'Tanvi Verma', photo: '', teamId: 't6', matchesPlayed: 0, wins: 0, losses: 0 },
  // Group B — Drop Shots
  { id: 'p13', name: 'Lakshmi Menon', photo: '', teamId: 't7', matchesPlayed: 0, wins: 0, losses: 0 },
  { id: 'p14', name: 'Gayatri Pillai', photo: '', teamId: 't7', matchesPlayed: 0, wins: 0, losses: 0 },
  // Group B — Ace Angels
  { id: 'p15', name: 'Rashmi Tiwari', photo: '', teamId: 't8', matchesPlayed: 0, wins: 0, losses: 0 },
  { id: 'p16', name: 'Swati Pandey', photo: '', teamId: 't8', matchesPlayed: 0, wins: 0, losses: 0 },

  // Group C — Power Pair
  { id: 'p17', name: 'Deepa Krishnan', photo: '', teamId: 't9', matchesPlayed: 0, wins: 0, losses: 0 },
  { id: 'p18', name: 'Shalini Hegde', photo: '', teamId: 't9', matchesPlayed: 0, wins: 0, losses: 0 },
  // Group C — Birdie Blitz
  { id: 'p19', name: 'Renu Chauhan', photo: '', teamId: 't10', matchesPlayed: 0, wins: 0, losses: 0 },
  { id: 'p20', name: 'Sunita Bhatt', photo: '', teamId: 't10', matchesPlayed: 0, wins: 0, losses: 0 },
  // Group C — Swift Strikers
  { id: 'p21', name: 'Anjali Prabhu', photo: '', teamId: 't11', matchesPlayed: 0, wins: 0, losses: 0 },
  { id: 'p22', name: 'Komal Deshpande', photo: '', teamId: 't11', matchesPlayed: 0, wins: 0, losses: 0 },
  // Group C — Cross Court
  { id: 'p23', name: 'Pallavi Bhat', photo: '', teamId: 't12', matchesPlayed: 0, wins: 0, losses: 0 },
  { id: 'p24', name: 'Madhuri Shetty', photo: '', teamId: 't12', matchesPlayed: 0, wins: 0, losses: 0 },

  // Group D — Shuttle Storm
  { id: 'p25', name: 'Vidya Rao', photo: '', teamId: 't13', matchesPlayed: 0, wins: 0, losses: 0 },
  { id: 'p26', name: 'Shruti Kamath', photo: '', teamId: 't13', matchesPlayed: 0, wins: 0, losses: 0 },
  // Group D — Net Crushers
  { id: 'p27', name: 'Jaya Sinha', photo: '', teamId: 't14', matchesPlayed: 0, wins: 0, losses: 0 },
  { id: 'p28', name: 'Neha Das', photo: '', teamId: 't14', matchesPlayed: 0, wins: 0, losses: 0 },
  // Group D — Lob Legends
  { id: 'p29', name: 'Archana Naik', photo: '', teamId: 't15', matchesPlayed: 0, wins: 0, losses: 0 },
  { id: 'p30', name: 'Savita Kulkarni', photo: '', teamId: 't15', matchesPlayed: 0, wins: 0, losses: 0 },
  // Group D — Racket Rebels
  { id: 'p31', name: 'Bhavna Pai', photo: '', teamId: 't16', matchesPlayed: 0, wins: 0, losses: 0 },
  { id: 'p32', name: 'Yamini Acharya', photo: '', teamId: 't16', matchesPlayed: 0, wins: 0, losses: 0 },
];

// ── Teams (16 doubles pairs) ────────────────────────────────────────────────────

export const defaultTeams: Team[] = [
  // Group A
  { id: 't1', name: 'Shuttle Queens', shortName: 'SHQ', color: '#e11d48', playerIds: ['p1', 'p2'], wins: 0, losses: 0, draws: 0, points: 0, status: 'active' },
  { id: 't2', name: 'Smash Sisters', shortName: 'SMS', color: '#7c3aed', playerIds: ['p3', 'p4'], wins: 0, losses: 0, draws: 0, points: 0, status: 'active' },
  { id: 't3', name: 'Net Blazers', shortName: 'NBZ', color: '#0891b2', playerIds: ['p5', 'p6'], wins: 0, losses: 0, draws: 0, points: 0, status: 'active' },
  { id: 't4', name: 'Rally Stars', shortName: 'RLS', color: '#ca8a04', playerIds: ['p7', 'p8'], wins: 0, losses: 0, draws: 0, points: 0, status: 'active' },
  // Group B
  { id: 't5', name: 'Feather Flames', shortName: 'FTF', color: '#ea580c', playerIds: ['p9', 'p10'], wins: 0, losses: 0, draws: 0, points: 0, status: 'active' },
  { id: 't6', name: 'Court Divas', shortName: 'CDV', color: '#db2777', playerIds: ['p11', 'p12'], wins: 0, losses: 0, draws: 0, points: 0, status: 'active' },
  { id: 't7', name: 'Drop Shots', shortName: 'DRS', color: '#059669', playerIds: ['p13', 'p14'], wins: 0, losses: 0, draws: 0, points: 0, status: 'active' },
  { id: 't8', name: 'Ace Angels', shortName: 'ACE', color: '#4f46e5', playerIds: ['p15', 'p16'], wins: 0, losses: 0, draws: 0, points: 0, status: 'active' },
  // Group C
  { id: 't9', name: 'Power Pair', shortName: 'PWP', color: '#dc2626', playerIds: ['p17', 'p18'], wins: 0, losses: 0, draws: 0, points: 0, status: 'active' },
  { id: 't10', name: 'Birdie Blitz', shortName: 'BBZ', color: '#2563eb', playerIds: ['p19', 'p20'], wins: 0, losses: 0, draws: 0, points: 0, status: 'active' },
  { id: 't11', name: 'Swift Strikers', shortName: 'SWS', color: '#0d9488', playerIds: ['p21', 'p22'], wins: 0, losses: 0, draws: 0, points: 0, status: 'active' },
  { id: 't12', name: 'Cross Court', shortName: 'CRC', color: '#8b5cf6', playerIds: ['p23', 'p24'], wins: 0, losses: 0, draws: 0, points: 0, status: 'active' },
  // Group D
  { id: 't13', name: 'Shuttle Storm', shortName: 'SHT', color: '#be123c', playerIds: ['p25', 'p26'], wins: 0, losses: 0, draws: 0, points: 0, status: 'active' },
  { id: 't14', name: 'Net Crushers', shortName: 'NTC', color: '#0284c7', playerIds: ['p27', 'p28'], wins: 0, losses: 0, draws: 0, points: 0, status: 'active' },
  { id: 't15', name: 'Lob Legends', shortName: 'LOB', color: '#16a34a', playerIds: ['p29', 'p30'], wins: 0, losses: 0, draws: 0, points: 0, status: 'active' },
  { id: 't16', name: 'Racket Rebels', shortName: 'RKR', color: '#6d28d9', playerIds: ['p31', 'p32'], wins: 0, losses: 0, draws: 0, points: 0, status: 'active' },
];

// ── Groups ──────────────────────────────────────────────────────────────────────

export const defaultGroups: Group[] = [
  { id: 'g1', name: 'Group A', teamIds: ['t1', 't2', 't3', 't4'] },
  { id: 'g2', name: 'Group B', teamIds: ['t5', 't6', 't7', 't8'] },
  { id: 'g3', name: 'Group C', teamIds: ['t9', 't10', 't11', 't12'] },
  { id: 'g4', name: 'Group D', teamIds: ['t13', 't14', 't15', 't16'] },
];

// ── Matches ─────────────────────────────────────────────────────────────────────
// Tournament is 2 days: Oct 24 (group stage) and Oct 25 (knockouts)
// Day 1 (Oct 24): All group matches
// Day 2 (Oct 25): QF, SF, Final

export const defaultMatches: Match[] = [
  // ── Group A — Oct 24 ──────────────────────────────
  { id: 'gm1', round: 'Group A - Match 1', teamAId: 't1', teamBId: 't2', games: [], currentGame: 0, status: 'upcoming', court: 'Court 1', scheduledAt: '2026-10-24T09:00:00', group: 'g1' },
  { id: 'gm2', round: 'Group A - Match 2', teamAId: 't3', teamBId: 't4', games: [], currentGame: 0, status: 'upcoming', court: 'Court 2', scheduledAt: '2026-10-24T09:00:00', group: 'g1' },
  { id: 'gm3', round: 'Group A - Match 3', teamAId: 't1', teamBId: 't3', games: [], currentGame: 0, status: 'upcoming', court: 'Court 1', scheduledAt: '2026-10-24T10:00:00', group: 'g1' },
  { id: 'gm4', round: 'Group A - Match 4', teamAId: 't2', teamBId: 't4', games: [], currentGame: 0, status: 'upcoming', court: 'Court 2', scheduledAt: '2026-10-24T10:00:00', group: 'g1' },
  { id: 'gm5', round: 'Group A - Match 5', teamAId: 't1', teamBId: 't4', games: [], currentGame: 0, status: 'upcoming', court: 'Court 1', scheduledAt: '2026-10-24T11:00:00', group: 'g1' },
  { id: 'gm6', round: 'Group A - Match 6', teamAId: 't2', teamBId: 't3', games: [], currentGame: 0, status: 'upcoming', court: 'Court 2', scheduledAt: '2026-10-24T11:00:00', group: 'g1' },

  // ── Group B — Oct 24 ──────────────────────────────
  { id: 'gm7', round: 'Group B - Match 1', teamAId: 't5', teamBId: 't6', games: [], currentGame: 0, status: 'upcoming', court: 'Court 3', scheduledAt: '2026-10-24T09:00:00', group: 'g2' },
  { id: 'gm8', round: 'Group B - Match 2', teamAId: 't7', teamBId: 't8', games: [], currentGame: 0, status: 'upcoming', court: 'Court 4', scheduledAt: '2026-10-24T09:00:00', group: 'g2' },
  { id: 'gm9', round: 'Group B - Match 3', teamAId: 't5', teamBId: 't7', games: [], currentGame: 0, status: 'upcoming', court: 'Court 3', scheduledAt: '2026-10-24T10:00:00', group: 'g2' },
  { id: 'gm10', round: 'Group B - Match 4', teamAId: 't6', teamBId: 't8', games: [], currentGame: 0, status: 'upcoming', court: 'Court 4', scheduledAt: '2026-10-24T10:00:00', group: 'g2' },
  { id: 'gm11', round: 'Group B - Match 5', teamAId: 't5', teamBId: 't8', games: [], currentGame: 0, status: 'upcoming', court: 'Court 3', scheduledAt: '2026-10-24T11:00:00', group: 'g2' },
  { id: 'gm12', round: 'Group B - Match 6', teamAId: 't6', teamBId: 't7', games: [], currentGame: 0, status: 'upcoming', court: 'Court 4', scheduledAt: '2026-10-24T11:00:00', group: 'g2' },

  // ── Group C — Oct 24 ──────────────────────────────
  { id: 'gm13', round: 'Group C - Match 1', teamAId: 't9', teamBId: 't10', games: [], currentGame: 0, status: 'upcoming', court: 'Court 1', scheduledAt: '2026-10-24T13:00:00', group: 'g3' },
  { id: 'gm14', round: 'Group C - Match 2', teamAId: 't11', teamBId: 't12', games: [], currentGame: 0, status: 'upcoming', court: 'Court 2', scheduledAt: '2026-10-24T13:00:00', group: 'g3' },
  { id: 'gm15', round: 'Group C - Match 3', teamAId: 't9', teamBId: 't11', games: [], currentGame: 0, status: 'upcoming', court: 'Court 1', scheduledAt: '2026-10-24T14:00:00', group: 'g3' },
  { id: 'gm16', round: 'Group C - Match 4', teamAId: 't10', teamBId: 't12', games: [], currentGame: 0, status: 'upcoming', court: 'Court 2', scheduledAt: '2026-10-24T14:00:00', group: 'g3' },
  { id: 'gm17', round: 'Group C - Match 5', teamAId: 't9', teamBId: 't12', games: [], currentGame: 0, status: 'upcoming', court: 'Court 1', scheduledAt: '2026-10-24T15:00:00', group: 'g3' },
  { id: 'gm18', round: 'Group C - Match 6', teamAId: 't10', teamBId: 't11', games: [], currentGame: 0, status: 'upcoming', court: 'Court 2', scheduledAt: '2026-10-24T15:00:00', group: 'g3' },

  // ── Group D — Oct 24 ──────────────────────────────
  { id: 'gm19', round: 'Group D - Match 1', teamAId: 't13', teamBId: 't14', games: [], currentGame: 0, status: 'upcoming', court: 'Court 3', scheduledAt: '2026-10-24T13:00:00', group: 'g4' },
  { id: 'gm20', round: 'Group D - Match 2', teamAId: 't15', teamBId: 't16', games: [], currentGame: 0, status: 'upcoming', court: 'Court 4', scheduledAt: '2026-10-24T13:00:00', group: 'g4' },
  { id: 'gm21', round: 'Group D - Match 3', teamAId: 't13', teamBId: 't15', games: [], currentGame: 0, status: 'upcoming', court: 'Court 3', scheduledAt: '2026-10-24T14:00:00', group: 'g4' },
  { id: 'gm22', round: 'Group D - Match 4', teamAId: 't14', teamBId: 't16', games: [], currentGame: 0, status: 'upcoming', court: 'Court 4', scheduledAt: '2026-10-24T14:00:00', group: 'g4' },
  { id: 'gm23', round: 'Group D - Match 5', teamAId: 't13', teamBId: 't16', games: [], currentGame: 0, status: 'upcoming', court: 'Court 3', scheduledAt: '2026-10-24T15:00:00', group: 'g4' },
  { id: 'gm24', round: 'Group D - Match 6', teamAId: 't14', teamBId: 't15', games: [], currentGame: 0, status: 'upcoming', court: 'Court 4', scheduledAt: '2026-10-24T15:00:00', group: 'g4' },

  // ── Quarterfinals — Oct 25 morning ──────────────────
  { id: 'qf1', round: 'Quarterfinal', teamAId: '', teamBId: '', games: [], currentGame: 0, status: 'upcoming', court: 'Court 1', scheduledAt: '2026-10-25T09:00:00' },
  { id: 'qf2', round: 'Quarterfinal', teamAId: '', teamBId: '', games: [], currentGame: 0, status: 'upcoming', court: 'Court 2', scheduledAt: '2026-10-25T09:00:00' },
  { id: 'qf3', round: 'Quarterfinal', teamAId: '', teamBId: '', games: [], currentGame: 0, status: 'upcoming', court: 'Court 3', scheduledAt: '2026-10-25T10:30:00' },
  { id: 'qf4', round: 'Quarterfinal', teamAId: '', teamBId: '', games: [], currentGame: 0, status: 'upcoming', court: 'Court 4', scheduledAt: '2026-10-25T10:30:00' },

  // ── Semifinals — Oct 25 afternoon ──────────────────
  { id: 'sf1', round: 'Semifinal', teamAId: '', teamBId: '', games: [], currentGame: 0, status: 'upcoming', court: 'Court 1', scheduledAt: '2026-10-25T13:00:00' },
  { id: 'sf2', round: 'Semifinal', teamAId: '', teamBId: '', games: [], currentGame: 0, status: 'upcoming', court: 'Court 2', scheduledAt: '2026-10-25T14:30:00' },

  // ── Final — Oct 25 evening ─────────────────────────
  { id: 'f1', round: 'Final', teamAId: '', teamBId: '', games: [], currentGame: 0, status: 'upcoming', court: 'Court 1', scheduledAt: '2026-10-25T16:30:00' },
];

// ── Announcements ───────────────────────────────────────────────────────────────

export const defaultAnnouncements: Announcement[] = [
  { id: 'a1', title: 'Registrations Open!', body: 'Inspirit Vision Women\'s Doubles Badminton Tournament 2026 registrations are now open. Register your pair before 30th September!', type: 'info', createdAt: '2026-09-13T10:00:00' },
  { id: 'a2', title: 'Tournament Format', body: '16 teams in 4 groups. Round-robin group stage on Day 1 (Oct 24), Knockouts on Day 2 (Oct 25). Best of 3 games per match.', type: 'info', createdAt: '2026-09-13T12:00:00' },
];

// ── Updates / Gallery / Version ─────────────────────────────────────────────────

export const defaultUpdates: TournamentUpdate[] = [];

export const defaultGallery: GalleryItem[] = [];

export const DATA_VERSION = 2;
