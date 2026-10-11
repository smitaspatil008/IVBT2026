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

// ── Players (2 per team = 24 total) — Women's Doubles ─────────────────────────

export const defaultPlayers: Player[] = [
  // Team 1 — Garima & Smita G
  { id: 'p1', name: 'Garima Garg', photo: '', teamId: 't1', matchesPlayed: 0, wins: 0, losses: 0 },
  { id: 'p2', name: 'Smita Ghune', photo: '', teamId: 't1', matchesPlayed: 0, wins: 0, losses: 0 },
  // Team 2 — Ashwini & Iram
  { id: 'p3', name: 'Ashwini Poharkar', photo: '', teamId: 't2', matchesPlayed: 0, wins: 0, losses: 0 },
  { id: 'p4', name: 'Iram Naaz', photo: '', teamId: 't2', matchesPlayed: 0, wins: 0, losses: 0 },
  // Team 3 — Gayatri & Vaibhavi
  { id: 'p5', name: 'Gayatri Rede', photo: '', teamId: 't3', matchesPlayed: 0, wins: 0, losses: 0 },
  { id: 'p6', name: 'Vaibhavi Chaudhari', photo: '', teamId: 't3', matchesPlayed: 0, wins: 0, losses: 0 },
  // Team 4 — Pooja & Chetna
  { id: 'p7', name: 'Pooja Bhawar', photo: '', teamId: 't4', matchesPlayed: 0, wins: 0, losses: 0 },
  { id: 'p8', name: 'Chetna Thakur', photo: '', teamId: 't4', matchesPlayed: 0, wins: 0, losses: 0 },

  // Team 5 — Gauri & Nehal
  { id: 'p9', name: 'Gauri Dighe', photo: '', teamId: 't5', matchesPlayed: 0, wins: 0, losses: 0 },
  { id: 'p10', name: 'Nehal Tiwari', photo: '', teamId: 't5', matchesPlayed: 0, wins: 0, losses: 0 },
  // Team 6 — Sayali & Radhika
  { id: 'p11', name: 'Sayali Salunke', photo: '', teamId: 't6', matchesPlayed: 0, wins: 0, losses: 0 },
  { id: 'p12', name: 'Radhika Kadam', photo: '', teamId: 't6', matchesPlayed: 0, wins: 0, losses: 0 },
  // Team 7 — Smita P & Sakshi
  { id: 'p13', name: 'Smita Patil', photo: '', teamId: 't7', matchesPlayed: 0, wins: 0, losses: 0 },
  { id: 'p14', name: 'Sakshi Bole', photo: '', teamId: 't7', matchesPlayed: 0, wins: 0, losses: 0 },
  // Team 8 — Kalyani & Saloni
  { id: 'p15', name: 'Kalyani Kale', photo: '', teamId: 't8', matchesPlayed: 0, wins: 0, losses: 0 },
  { id: 'p16', name: 'Saloni Jha', photo: '', teamId: 't8', matchesPlayed: 0, wins: 0, losses: 0 },

  // Team 9 — Sanika & Sneha
  { id: 'p17', name: 'Sanika Khire', photo: '', teamId: 't9', matchesPlayed: 0, wins: 0, losses: 0 },
  { id: 'p18', name: 'Sneha Mahale', photo: '', teamId: 't9', matchesPlayed: 0, wins: 0, losses: 0 },
  // Team 10 — Sandhya & Anushree
  { id: 'p19', name: 'Sandhya Pawar', photo: '', teamId: 't10', matchesPlayed: 0, wins: 0, losses: 0 },
  { id: 'p20', name: 'Anushree Joshi', photo: '', teamId: 't10', matchesPlayed: 0, wins: 0, losses: 0 },
  // Team 11 — Aboli & Madhura
  { id: 'p21', name: 'Aboli Deshmukh', photo: '', teamId: 't11', matchesPlayed: 0, wins: 0, losses: 0 },
  { id: 'p22', name: 'Madhura Jadhav', photo: '', teamId: 't11', matchesPlayed: 0, wins: 0, losses: 0 },
  // Team 12 — Siddhi & Aishwarya
  { id: 'p23', name: 'Siddhi Wakchaure', photo: '', teamId: 't12', matchesPlayed: 0, wins: 0, losses: 0 },
  { id: 'p24', name: 'Aishwarya Gore', photo: '', teamId: 't12', matchesPlayed: 0, wins: 0, losses: 0 },
];

// ── Teams (12 doubles pairs) ────────────────────────────────────────────────────

export const defaultTeams: Team[] = [
  // Group A
  { id: 't1', name: 'Garima & Smita G', shortName: 'GSG', color: '#e11d48', playerIds: ['p1', 'p2'], wins: 0, losses: 0, draws: 0, points: 0, status: 'active' },
  { id: 't2', name: 'Ashwini & Iram', shortName: 'AIR', color: '#7c3aed', playerIds: ['p3', 'p4'], wins: 0, losses: 0, draws: 0, points: 0, status: 'active' },
  { id: 't3', name: 'Gayatri & Vaibhavi', shortName: 'GVB', color: '#0891b2', playerIds: ['p5', 'p6'], wins: 0, losses: 0, draws: 0, points: 0, status: 'active' },
  { id: 't4', name: 'Pooja & Chetna', shortName: 'PJC', color: '#ca8a04', playerIds: ['p7', 'p8'], wins: 0, losses: 0, draws: 0, points: 0, status: 'active' },
  // Group B
  { id: 't5', name: 'Gauri & Nehal', shortName: 'GNT', color: '#ea580c', playerIds: ['p9', 'p10'], wins: 0, losses: 0, draws: 0, points: 0, status: 'active' },
  { id: 't6', name: 'Sayali & Radhika', shortName: 'SRK', color: '#db2777', playerIds: ['p11', 'p12'], wins: 0, losses: 0, draws: 0, points: 0, status: 'active' },
  { id: 't7', name: 'Smita P & Sakshi', shortName: 'SPS', color: '#059669', playerIds: ['p13', 'p14'], wins: 0, losses: 0, draws: 0, points: 0, status: 'active' },
  { id: 't8', name: 'Kalyani & Saloni', shortName: 'KSJ', color: '#4f46e5', playerIds: ['p15', 'p16'], wins: 0, losses: 0, draws: 0, points: 0, status: 'active' },
  // Group C
  { id: 't9', name: 'Sanika & Sneha', shortName: 'SNS', color: '#dc2626', playerIds: ['p17', 'p18'], wins: 0, losses: 0, draws: 0, points: 0, status: 'active' },
  { id: 't10', name: 'Sandhya & Anushree', shortName: 'SAJ', color: '#2563eb', playerIds: ['p19', 'p20'], wins: 0, losses: 0, draws: 0, points: 0, status: 'active' },
  { id: 't11', name: 'Aboli & Madhura', shortName: 'AMJ', color: '#0d9488', playerIds: ['p21', 'p22'], wins: 0, losses: 0, draws: 0, points: 0, status: 'active' },
  { id: 't12', name: 'Siddhi & Aishwarya', shortName: 'SAG', color: '#8b5cf6', playerIds: ['p23', 'p24'], wins: 0, losses: 0, draws: 0, points: 0, status: 'active' },
];

// ── Groups ──────────────────────────────────────────────────────────────────────

export const defaultGroups: Group[] = [
  { id: 'g1', name: 'Group A', teamIds: ['t1', 't2', 't3', 't4'] },
  { id: 'g2', name: 'Group B', teamIds: ['t5', 't6', 't7', 't8'] },
  { id: 'g3', name: 'Group C', teamIds: ['t9', 't10', 't11', 't12'] },
];

// ── Matches ─────────────────────────────────────────────────────────────────────
// Day 1 (Oct 24): All group matches (round-robin, 6 matches per group = 18 total)
// Day 2 (Oct 25): Semifinals and Final

export const defaultMatches: Match[] = [
  // ── Group A — Oct 24 ──────────────────────────────
  { id: 'gm1', round: 'Group A - Match 1', teamAId: 't1', teamBId: 't2', games: [], currentGame: 0, status: 'upcoming', court: 'Court 1', scheduledAt: '2026-10-24T09:00:00', group: 'g1' },
  { id: 'gm2', round: 'Group A - Match 2', teamAId: 't3', teamBId: 't4', games: [], currentGame: 0, status: 'upcoming', court: 'Court 2', scheduledAt: '2026-10-24T09:00:00', group: 'g1' },
  { id: 'gm3', round: 'Group A - Match 3', teamAId: 't1', teamBId: 't3', games: [], currentGame: 0, status: 'upcoming', court: 'Court 1', scheduledAt: '2026-10-24T10:00:00', group: 'g1' },
  { id: 'gm4', round: 'Group A - Match 4', teamAId: 't2', teamBId: 't4', games: [], currentGame: 0, status: 'upcoming', court: 'Court 2', scheduledAt: '2026-10-24T10:00:00', group: 'g1' },
  { id: 'gm5', round: 'Group A - Match 5', teamAId: 't1', teamBId: 't4', games: [], currentGame: 0, status: 'upcoming', court: 'Court 1', scheduledAt: '2026-10-24T11:00:00', group: 'g1' },
  { id: 'gm6', round: 'Group A - Match 6', teamAId: 't2', teamBId: 't3', games: [], currentGame: 0, status: 'upcoming', court: 'Court 2', scheduledAt: '2026-10-24T11:00:00', group: 'g1' },

  // ── Group B — Oct 24 ──────────────────────────────
  { id: 'gm7', round: 'Group B - Match 1', teamAId: 't5', teamBId: 't6', games: [], currentGame: 0, status: 'upcoming', court: 'Court 1', scheduledAt: '2026-10-24T12:00:00', group: 'g2' },
  { id: 'gm8', round: 'Group B - Match 2', teamAId: 't7', teamBId: 't8', games: [], currentGame: 0, status: 'upcoming', court: 'Court 2', scheduledAt: '2026-10-24T12:00:00', group: 'g2' },
  { id: 'gm9', round: 'Group B - Match 3', teamAId: 't5', teamBId: 't7', games: [], currentGame: 0, status: 'upcoming', court: 'Court 1', scheduledAt: '2026-10-24T13:00:00', group: 'g2' },
  { id: 'gm10', round: 'Group B - Match 4', teamAId: 't6', teamBId: 't8', games: [], currentGame: 0, status: 'upcoming', court: 'Court 2', scheduledAt: '2026-10-24T13:00:00', group: 'g2' },
  { id: 'gm11', round: 'Group B - Match 5', teamAId: 't5', teamBId: 't8', games: [], currentGame: 0, status: 'upcoming', court: 'Court 1', scheduledAt: '2026-10-24T14:00:00', group: 'g2' },
  { id: 'gm12', round: 'Group B - Match 6', teamAId: 't6', teamBId: 't7', games: [], currentGame: 0, status: 'upcoming', court: 'Court 2', scheduledAt: '2026-10-24T14:00:00', group: 'g2' },

  // ── Group C — Oct 24 ──────────────────────────────
  { id: 'gm13', round: 'Group C - Match 1', teamAId: 't9', teamBId: 't10', games: [], currentGame: 0, status: 'upcoming', court: 'Court 1', scheduledAt: '2026-10-24T15:00:00', group: 'g3' },
  { id: 'gm14', round: 'Group C - Match 2', teamAId: 't11', teamBId: 't12', games: [], currentGame: 0, status: 'upcoming', court: 'Court 2', scheduledAt: '2026-10-24T15:00:00', group: 'g3' },
  { id: 'gm15', round: 'Group C - Match 3', teamAId: 't9', teamBId: 't11', games: [], currentGame: 0, status: 'upcoming', court: 'Court 1', scheduledAt: '2026-10-24T16:00:00', group: 'g3' },
  { id: 'gm16', round: 'Group C - Match 4', teamAId: 't10', teamBId: 't12', games: [], currentGame: 0, status: 'upcoming', court: 'Court 2', scheduledAt: '2026-10-24T16:00:00', group: 'g3' },
  { id: 'gm17', round: 'Group C - Match 5', teamAId: 't9', teamBId: 't12', games: [], currentGame: 0, status: 'upcoming', court: 'Court 1', scheduledAt: '2026-10-24T17:00:00', group: 'g3' },
  { id: 'gm18', round: 'Group C - Match 6', teamAId: 't10', teamBId: 't11', games: [], currentGame: 0, status: 'upcoming', court: 'Court 2', scheduledAt: '2026-10-24T17:00:00', group: 'g3' },

  // ── Semifinals — Oct 25 ──────────────────────────
  { id: 'sf1', round: 'Semifinal', teamAId: '', teamBId: '', games: [], currentGame: 0, status: 'upcoming', court: 'Court 1', scheduledAt: '2026-10-25T09:00:00' },
  { id: 'sf2', round: 'Semifinal', teamAId: '', teamBId: '', games: [], currentGame: 0, status: 'upcoming', court: 'Court 2', scheduledAt: '2026-10-25T10:30:00' },

  // ── Final — Oct 25 ─────────────────────────────
  { id: 'f1', round: 'Final', teamAId: '', teamBId: '', games: [], currentGame: 0, status: 'upcoming', court: 'Court 1', scheduledAt: '2026-10-25T14:00:00' },
];

// ── Announcements ───────────────────────────────────────────────────────────────

export const defaultAnnouncements: Announcement[] = [
  { id: 'a1', title: 'Registrations Open!', body: 'Inspirit Vision Women\'s Doubles Badminton Tournament 2026 registrations are now open. Register your pair before 30th September!', type: 'info', createdAt: '2026-09-13T10:00:00' },
  { id: 'a2', title: 'Tournament Format', body: '12 teams in 3 groups. Round-robin group stage on Day 1 (Oct 24), Knockouts on Day 2 (Oct 25). Best of 3 games per match.', type: 'info', createdAt: '2026-09-13T12:00:00' },
];

// ── Updates / Gallery / Version ─────────────────────────────────────────────────

export const defaultUpdates: TournamentUpdate[] = [];

export const defaultGallery: GalleryItem[] = [];

export const DATA_VERSION = 3;
