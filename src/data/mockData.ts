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
  // Group A — Team 1
  { id: 'p1', name: 'Garima Garg', photo: '/players/Garima.jpeg', teamId: 't1', matchesPlayed: 0, wins: 0, losses: 0 },
  { id: 'p2', name: 'Smita Ghune', photo: '/players/smita-ghune.jpeg', teamId: 't1', matchesPlayed: 0, wins: 0, losses: 0 },
  // Group A — Team 2
  { id: 'p3', name: 'Gayatri', photo: '/players/gaytri.jpeg', teamId: 't2', matchesPlayed: 0, wins: 0, losses: 0 },
  { id: 'p4', name: 'Vaibhavi Chaudhari', photo: '/players/vaibhavi.jpeg', teamId: 't2', matchesPlayed: 0, wins: 0, losses: 0 },
  // Group A — Team 3
  { id: 'p5', name: 'Sayali Salunkhe', photo: '/players/sayli.jpeg', teamId: 't3', matchesPlayed: 0, wins: 0, losses: 0 },
  { id: 'p6', name: 'Radhika Kadam', photo: '/players/radhika.jpeg', teamId: 't3', matchesPlayed: 0, wins: 0, losses: 0 },

  // Group B — Team 4
  { id: 'p7', name: 'Ashwini Poharkar', photo: '/players/Ashwini.jpeg', teamId: 't4', matchesPlayed: 0, wins: 0, losses: 0 },
  { id: 'p8', name: 'Iram Naaz', photo: '/players/iram.jpeg', teamId: 't4', matchesPlayed: 0, wins: 0, losses: 0 },
  // Group B — Team 5
  { id: 'p9', name: 'Pooja Bhawar', photo: '/players/pooja.jpeg', teamId: 't5', matchesPlayed: 0, wins: 0, losses: 0 },
  { id: 'p10', name: 'Chetna', photo: '/players/chetana.jpeg', teamId: 't5', matchesPlayed: 0, wins: 0, losses: 0 },
  // Group B — Team 6
  { id: 'p11', name: 'Sandhya Pawar', photo: '/players/sandhya.jpeg', teamId: 't6', matchesPlayed: 0, wins: 0, losses: 0 },
  { id: 'p12', name: 'Anushree Joshi', photo: '/players/Anushree.jpeg', teamId: 't6', matchesPlayed: 0, wins: 0, losses: 0 },

  // Group C — Team 7
  { id: 'p13', name: 'Gauri Dighe', photo: '/players/gauri.jpeg', teamId: 't7', matchesPlayed: 0, wins: 0, losses: 0 },
  { id: 'p14', name: 'Nehal Tiwari', photo: '/players/nehal.jpeg', teamId: 't7', matchesPlayed: 0, wins: 0, losses: 0 },
  // Group C — Team 8
  { id: 'p15', name: 'Sanika Khire', photo: '/players/sanika.jpeg', teamId: 't8', matchesPlayed: 0, wins: 0, losses: 0 },
  { id: 'p16', name: 'Vaishnavi Mohalkar', photo: '', teamId: 't8', matchesPlayed: 0, wins: 0, losses: 0 },
  // Group C — Team 9
  { id: 'p17', name: 'Aboli Deshmukh', photo: '/players/Aboli.jpeg', teamId: 't9', matchesPlayed: 0, wins: 0, losses: 0 },
  { id: 'p18', name: 'Madhura Jadhav', photo: '/players/madhuta.jpeg', teamId: 't9', matchesPlayed: 0, wins: 0, losses: 0 },

  // Group D — Team 10
  { id: 'p19', name: 'Kalyani Kale', photo: '/players/Kalyani.jpeg', teamId: 't10', matchesPlayed: 0, wins: 0, losses: 0 },
  { id: 'p20', name: 'Saloni Jha', photo: '/players/saloni.jpeg', teamId: 't10', matchesPlayed: 0, wins: 0, losses: 0 },
  // Group D — Team 11
  { id: 'p21', name: 'Smita Patil', photo: '/players/smita.jpeg', teamId: 't11', matchesPlayed: 0, wins: 0, losses: 0 },
  { id: 'p22', name: 'Sakshi Bole', photo: '/players/Sakshi.jpeg', teamId: 't11', matchesPlayed: 0, wins: 0, losses: 0 },
  // Group D — Team 12
  { id: 'p23', name: 'Siddhi', photo: '/players/Siddhi.jpeg', teamId: 't12', matchesPlayed: 0, wins: 0, losses: 0 },
  { id: 'p24', name: 'Aishawarya Gore', photo: '/players/aishwarya.jpeg', teamId: 't12', matchesPlayed: 0, wins: 0, losses: 0 },
];

// ── Teams (12 doubles pairs) ────────────────────────────────────────────────────

export const defaultTeams: Team[] = [
  // Group A
  { id: 't1', name: 'Garima & Smita G', shortName: 'GSG', color: '#e11d48', playerIds: ['p1', 'p2'], wins: 0, losses: 0, draws: 0, points: 0, status: 'active' },
  { id: 't2', name: 'Gayatri & Vaibhavi', shortName: 'GVB', color: '#0891b2', playerIds: ['p3', 'p4'], wins: 0, losses: 0, draws: 0, points: 0, status: 'active' },
  { id: 't3', name: 'Sayali & Radhika', shortName: 'SRK', color: '#db2777', playerIds: ['p5', 'p6'], wins: 0, losses: 0, draws: 0, points: 0, status: 'active' },
  // Group B
  { id: 't4', name: 'Ashwini & Iram', shortName: 'AIR', color: '#7c3aed', playerIds: ['p7', 'p8'], wins: 0, losses: 0, draws: 0, points: 0, status: 'active' },
  { id: 't5', name: 'Pooja & Chetna', shortName: 'PJC', color: '#ca8a04', playerIds: ['p9', 'p10'], wins: 0, losses: 0, draws: 0, points: 0, status: 'active' },
  { id: 't6', name: 'Sandhya & Anushree', shortName: 'SAJ', color: '#2563eb', playerIds: ['p11', 'p12'], wins: 0, losses: 0, draws: 0, points: 0, status: 'active' },
  // Group C
  { id: 't7', name: 'Gauri & Nehal', shortName: 'GNT', color: '#ea580c', playerIds: ['p13', 'p14'], wins: 0, losses: 0, draws: 0, points: 0, status: 'active' },
  { id: 't8', name: 'Sanika & Vaishnavi', shortName: 'SVK', color: '#dc2626', playerIds: ['p15', 'p16'], wins: 0, losses: 0, draws: 0, points: 0, status: 'active' },
  { id: 't9', name: 'Aboli & Madhura', shortName: 'AMJ', color: '#0d9488', playerIds: ['p17', 'p18'], wins: 0, losses: 0, draws: 0, points: 0, status: 'active' },
  // Group D
  { id: 't10', name: 'Kalyani & Saloni', shortName: 'KSJ', color: '#4f46e5', playerIds: ['p19', 'p20'], wins: 0, losses: 0, draws: 0, points: 0, status: 'active' },
  { id: 't11', name: 'Smita P & Sakshi', shortName: 'SPS', color: '#059669', playerIds: ['p21', 'p22'], wins: 0, losses: 0, draws: 0, points: 0, status: 'active' },
  { id: 't12', name: 'Siddhi & Aishawarya', shortName: 'SAG', color: '#8b5cf6', playerIds: ['p23', 'p24'], wins: 0, losses: 0, draws: 0, points: 0, status: 'active' },
];

// ── Groups (4 groups of 3) ──────────────────────────────────────────────────────

export const defaultGroups: Group[] = [
  { id: 'g1', name: 'Group A', teamIds: ['t1', 't2', 't3'] },
  { id: 'g2', name: 'Group B', teamIds: ['t4', 't5', 't6'] },
  { id: 'g3', name: 'Group C', teamIds: ['t7', 't8', 't9'] },
  { id: 'g4', name: 'Group D', teamIds: ['t10', 't11', 't12'] },
];

// ── Matches ─────────────────────────────────────────────────────────────────────
// Day 1 — Saturday Oct 24: 12 group matches, 30 min each, starting 9:15 AM
// Day 2 — Sunday Oct 25: 2 Semifinals + Final, 1:30 hr gaps

export const defaultMatches: Match[] = [
  // Match 1 — 9:15 AM — Group A
  { id: 'gm1', round: 'Group A - Match 1', teamAId: 't1', teamBId: 't2', games: [], currentGame: 0, status: 'upcoming', court: 'Court 1', scheduledAt: '2026-10-24T09:15:00', group: 'g1' },
  // Match 2 — 9:45 AM — Group B
  { id: 'gm2', round: 'Group B - Match 1', teamAId: 't4', teamBId: 't5', games: [], currentGame: 0, status: 'upcoming', court: 'Court 1', scheduledAt: '2026-10-24T09:45:00', group: 'g2' },
  // Match 3 — 10:15 AM — Group C
  { id: 'gm3', round: 'Group C - Match 1', teamAId: 't7', teamBId: 't8', games: [], currentGame: 0, status: 'upcoming', court: 'Court 1', scheduledAt: '2026-10-24T10:15:00', group: 'g3' },
  // Match 4 — 10:45 AM — Group D
  { id: 'gm4', round: 'Group D - Match 1', teamAId: 't10', teamBId: 't11', games: [], currentGame: 0, status: 'upcoming', court: 'Court 1', scheduledAt: '2026-10-24T10:45:00', group: 'g4' },
  // Match 5 — 11:15 AM — Group A
  { id: 'gm5', round: 'Group A - Match 2', teamAId: 't2', teamBId: 't3', games: [], currentGame: 0, status: 'upcoming', court: 'Court 1', scheduledAt: '2026-10-24T11:15:00', group: 'g1' },
  // Match 6 — 11:45 AM — Group B
  { id: 'gm6', round: 'Group B - Match 2', teamAId: 't5', teamBId: 't6', games: [], currentGame: 0, status: 'upcoming', court: 'Court 1', scheduledAt: '2026-10-24T11:45:00', group: 'g2' },
  // Match 7 — 12:15 PM — Group C
  { id: 'gm7', round: 'Group C - Match 2', teamAId: 't8', teamBId: 't9', games: [], currentGame: 0, status: 'upcoming', court: 'Court 1', scheduledAt: '2026-10-24T12:15:00', group: 'g3' },
  // Match 8 — 12:45 PM — Group D
  { id: 'gm8', round: 'Group D - Match 2', teamAId: 't11', teamBId: 't12', games: [], currentGame: 0, status: 'upcoming', court: 'Court 1', scheduledAt: '2026-10-24T12:45:00', group: 'g4' },
  // Match 9 — 1:15 PM — Group A
  { id: 'gm9', round: 'Group A - Match 3', teamAId: 't3', teamBId: 't1', games: [], currentGame: 0, status: 'upcoming', court: 'Court 1', scheduledAt: '2026-10-24T13:15:00', group: 'g1' },
  // Match 10 — 1:45 PM — Group B
  { id: 'gm10', round: 'Group B - Match 3', teamAId: 't6', teamBId: 't4', games: [], currentGame: 0, status: 'upcoming', court: 'Court 1', scheduledAt: '2026-10-24T13:45:00', group: 'g2' },
  // Match 11 — 2:15 PM — Group C
  { id: 'gm11', round: 'Group C - Match 3', teamAId: 't9', teamBId: 't7', games: [], currentGame: 0, status: 'upcoming', court: 'Court 1', scheduledAt: '2026-10-24T14:15:00', group: 'g3' },
  // Match 12 — 2:45 PM — Group D
  { id: 'gm12', round: 'Group D - Match 3', teamAId: 't12', teamBId: 't10', games: [], currentGame: 0, status: 'upcoming', court: 'Court 1', scheduledAt: '2026-10-24T14:45:00', group: 'g4' },

  // ── Day 2 — Sunday Oct 25 ────────────────────────
  // Semi-Final 1 — 9:15 AM (Group A Winner vs Group B Winner)
  { id: 'sf1', round: 'Semi-Final 1', teamAId: '', teamBId: '', games: [], currentGame: 0, status: 'upcoming', court: 'Court 1', scheduledAt: '2026-10-25T09:15:00' },
  // Semi-Final 2 — 10:45 AM (Group C Winner vs Group D Winner)
  { id: 'sf2', round: 'Semi-Final 2', teamAId: '', teamBId: '', games: [], currentGame: 0, status: 'upcoming', court: 'Court 1', scheduledAt: '2026-10-25T10:45:00' },
  // Final — 12:15 PM
  { id: 'f1', round: 'Final', teamAId: '', teamBId: '', games: [], currentGame: 0, status: 'upcoming', court: 'Court 1', scheduledAt: '2026-10-25T12:15:00' },
];

// ── Announcements ───────────────────────────────────────────────────────────────

export const defaultAnnouncements: Announcement[] = [
  { id: 'a1', title: 'Registrations Open!', body: 'Inspirit Vision Women\'s Doubles Badminton Tournament 2026 registrations are now open. Register your pair before 30th September!', type: 'info', createdAt: '2026-09-13T10:00:00' },
  { id: 'a2', title: 'Tournament Format', body: '12 teams in 4 groups. Round-robin group stage on Day 1 (Sat, Oct 24). Semifinals & Final on Day 2 (Sun, Oct 25). Best of 3 games per match.', type: 'info', createdAt: '2026-09-13T12:00:00' },
];

// ── Updates / Gallery / Version ─────────────────────────────────────────────────

export const defaultUpdates: TournamentUpdate[] = [];

export const defaultGallery: GalleryItem[] = [];

export const DATA_VERSION = 4;
