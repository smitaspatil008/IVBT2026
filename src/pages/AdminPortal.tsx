import { useState, useMemo } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  UserPlus,
  Calendar,
  Radio,
  X,
  LogOut,
  Shield,
  Trash2,
} from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import toast from 'react-hot-toast';
import { useTournamentStore } from '../store/tournamentStore';
import type { Team, Player, Match, Announcement } from '../types';

function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-2xl border border-[#1e1b4b]/30 bg-[#12102a] p-6 shadow-xl max-h-[90vh] overflow-y-auto"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">{title}</h3>
              <button
                onClick={onClose}
                className="rounded-lg p-1 text-indigo-400/40 hover:bg-[#1e1b4b]/30"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-indigo-200/70">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  'w-full rounded-lg border border-indigo-700/40 bg-indigo-950/50 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20';

const btnPrimary =
  'rounded-lg bg-[#1e1b4b] px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-500 disabled:opacity-50 transition-colors';
const btnSecondary =
  'rounded-lg border border-indigo-700/40 px-4 py-2 text-sm font-medium text-indigo-200/70 hover:bg-[#1e1b4b]/30 transition-colors';

function ActionCard({
  icon,
  label,
  description,
  onClick,
  color = 'bg-[#1e1b4b]/30',
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  onClick: () => void;
  color?: string;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`flex flex-col items-center gap-2 rounded-xl border border-[#1e1b4b]/30 p-5 text-center shadow-sm transition-shadow hover:shadow-md ${color}`}
    >
      <div className="text-3xl">{icon}</div>
      <p className="text-sm font-bold text-white">{label}</p>
      <p className="text-xs text-indigo-300/50">{description}</p>
    </motion.button>
  );
}

export default function AdminPortal() {
  const store = useTournamentStore(
    useShallow((s) => ({
      auth: s.auth,
      teams: s.teams,
      players: s.players,
      matches: s.matches,
      groups: s.groups,
      announcements: s.announcements,
      updates: s.updates,
      gallery: s.gallery,
      pin: s.pin,
      addTeam: s.addTeam,
      updateTeam: s.updateTeam,
      deleteTeam: s.deleteTeam,
      addPlayer: s.addPlayer,
      deletePlayer: s.deletePlayer,
      addMatch: s.addMatch,
      deleteMatch: s.deleteMatch,
      startMatch: s.startMatch,
      advanceToKnockouts: s.advanceToKnockouts,
      addAnnouncement: s.addAnnouncement,
      deleteAnnouncement: s.deleteAnnouncement,
      addUpdate: s.addUpdate,
      deleteUpdate: s.deleteUpdate,
      deleteGalleryItem: s.deleteGalleryItem,
      setPin: s.setPin,
      logout: s.logout,
    })),
  );

  const [modal, setModal] = useState<string | null>(null);
  const close = () => setModal(null);

  const [teamName, setTeamName] = useState('');
  const [teamShort, setTeamShort] = useState('');
  const [teamColor, setTeamColor] = useState('#4f46e5');
  const [teamGroup, setTeamGroup] = useState('');

  const [playerName, setPlayerName] = useState('');
  const [playerTeam, setPlayerTeam] = useState('');

  const [matchRound, setMatchRound] = useState('');
  const [matchTeamA, setMatchTeamA] = useState('');
  const [matchTeamB, setMatchTeamB] = useState('');
  const [matchCourt, setMatchCourt] = useState('Court 1');
  const [matchDate, setMatchDate] = useState('');
  const [matchGroup, setMatchGroup] = useState('');

  const [startMatchId, setStartMatchId] = useState('');

  const [annTitle, setAnnTitle] = useState('');
  const [annBody, setAnnBody] = useState('');
  const [annType, setAnnType] = useState<Announcement['type']>('info');

  const [updateText, setUpdateText] = useState('');

  const [oldPin, setOldPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  const liveCount = useMemo(
    () => store.matches.filter((m) => m.status === 'live').length,
    [store.matches],
  );
  const upcomingMatches = useMemo(
    () => store.matches.filter((m) => m.status === 'upcoming' && m.teamAId && m.teamBId),
    [store.matches],
  );
  const liveMatches = useMemo(
    () => store.matches.filter((m) => m.status === 'live'),
    [store.matches],
  );

  if (!store.auth.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const isAdmin = store.auth.role === 'admin';

  const getTeamName = (id: string) =>
    store.teams.find((t) => t.id === id)?.name ?? 'TBD';

  const resetTeamForm = () => {
    setTeamName('');
    setTeamShort('');
    setTeamColor('#4f46e5');
    setTeamGroup('');
  };

  const handleAddTeam = () => {
    if (!teamName.trim() || !teamShort.trim()) {
      toast.error('Name and abbreviation required');
      return;
    }
    const team: Team = {
      id: `t-${Date.now()}`,
      name: teamName.trim(),
      shortName: teamShort.trim().toUpperCase(),
      color: teamColor,
      playerIds: [],
      wins: 0,
      losses: 0,
      draws: 0,
      points: 0,
      status: 'active',
    };
    store.addTeam(team);
    toast.success('Team added!');
    resetTeamForm();
    close();
  };

  const handleAddPlayer = () => {
    if (!playerName.trim() || !playerTeam) {
      toast.error('Name and team required');
      return;
    }
    const player: Player = {
      id: `p-${Date.now()}`,
      name: playerName.trim(),
      photo: '',
      teamId: playerTeam,
      matchesPlayed: 0,
      wins: 0,
      losses: 0,
    };
    store.addPlayer(player);
    toast.success('Player added!');
    setPlayerName('');
    setPlayerTeam('');
    close();
  };

  const handleAddMatch = () => {
    if (!matchRound.trim() || !matchTeamA || !matchTeamB || !matchDate) {
      toast.error('Please fill all required fields');
      return;
    }
    if (matchTeamA === matchTeamB) {
      toast.error('Teams must be different');
      return;
    }
    const match: Match = {
      id: `m-${Date.now()}`,
      round: matchRound.trim(),
      teamAId: matchTeamA,
      teamBId: matchTeamB,
      games: [],
      currentGame: 0,
      status: 'upcoming',
      court: matchCourt || 'Court 1',
      scheduledAt: matchDate,
      group: matchGroup || undefined,
    };
    store.addMatch(match);
    toast.success('Match scheduled!');
    setMatchRound('');
    setMatchTeamA('');
    setMatchTeamB('');
    setMatchCourt('Court 1');
    setMatchDate('');
    setMatchGroup('');
    close();
  };

  const handleStartMatch = () => {
    if (!startMatchId) {
      toast.error('Select a match');
      return;
    }
    store.startMatch(startMatchId);
    toast.success('Match started!');
    setStartMatchId('');
    close();
  };

  const handleAddAnnouncement = () => {
    if (!annTitle.trim() || !annBody.trim()) {
      toast.error('Title and body required');
      return;
    }
    const a: Announcement = {
      id: `ann-${Date.now()}`,
      title: annTitle.trim(),
      body: annBody.trim(),
      type: annType,
      createdAt: new Date().toISOString(),
    };
    store.addAnnouncement(a);
    toast.success('Announcement added!');
    setAnnTitle('');
    setAnnBody('');
    setAnnType('info');
    close();
  };

  const handleAddUpdate = () => {
    if (!updateText.trim()) {
      toast.error('Text required');
      return;
    }
    store.addUpdate({
      id: `upd-${Date.now()}`,
      text: updateText.trim(),
      createdAt: new Date().toISOString(),
    });
    toast.success('Update added!');
    setUpdateText('');
    close();
  };

  const handleChangePin = () => {
    if (oldPin !== store.pin) {
      toast.error('Old PIN is incorrect');
      return;
    }
    if (newPin.length !== 6) {
      toast.error('New PIN must be 6 digits');
      return;
    }
    if (newPin !== confirmPin) {
      toast.error('PINs do not match');
      return;
    }
    store.setPin(newPin);
    toast.success('PIN changed!');
    setOldPin('');
    setNewPin('');
    setConfirmPin('');
    close();
  };

  const handleAdvance = () => {
    if (window.confirm('Advance top 2 from each group to knockout stage?')) {
      store.advanceToKnockouts();
      toast.success('Knockout bracket populated!');
    }
  };

  return (
    <div className="mx-auto max-w-5xl py-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="h-7 w-7 text-indigo-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">
              Admin Portal
            </h1>
            <p className="text-sm text-indigo-300/50">
              Logged in as {store.auth.role}
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            store.logout();
            toast.success('Logged out');
          }}
          className="flex items-center gap-1.5 rounded-lg border border-indigo-700/40 px-3 py-2 text-sm font-medium text-indigo-200/70 hover:bg-[#1e1b4b]/30"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>

      {/* Quick Stats */}
      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Teams', value: store.teams.length, icon: <Users className="h-5 w-5" /> },
          { label: 'Players', value: store.players.length, icon: <UserPlus className="h-5 w-5" /> },
          { label: 'Matches', value: store.matches.length, icon: <Calendar className="h-5 w-5" /> },
          { label: 'Live Now', value: liveCount, icon: <Radio className="h-5 w-5" /> },
        ].map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-3 rounded-xl border border-[#1e1b4b]/30 bg-[#12102a] p-4 shadow-sm"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1e1b4b]/40 text-indigo-400">
              {stat.icon}
            </div>
            <div>
              <p className="text-xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-indigo-300/50">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Action Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        <ActionCard
          icon="🏸"
          label="Start Match"
          description="Pick a match to start"
          onClick={() => setModal('start')}
        />
        <ActionCard
          icon="📡"
          label="Live Scoring"
          description="Score live matches"
          onClick={() => setModal('scoring')}
        />

        {isAdmin && (
          <>
            <ActionCard
              icon="👥"
              label="Manage Teams"
              description="Add / edit / delete"
              onClick={() => setModal('teams')}
            />
            <ActionCard
              icon="🧑"
              label="Manage Players"
              description="Add / delete players"
              onClick={() => setModal('players')}
            />
            <ActionCard
              icon="📅"
              label="Schedule Match"
              description="Add a new match"
              onClick={() => setModal('schedule')}
            />
            <ActionCard
              icon="⚡"
              label="Advance to Knockouts"
              description="Populate QF bracket"
              onClick={handleAdvance}
              color="bg-orange-900/20"
            />
            <ActionCard
              icon="📢"
              label="Announcements"
              description="Add / delete"
              onClick={() => setModal('announcements')}
            />
            <ActionCard
              icon="📰"
              label="Updates"
              description="Add / delete"
              onClick={() => setModal('updates')}
            />
            <ActionCard
              icon="📸"
              label="Gallery"
              description="Manage photos"
              onClick={() => setModal('gallery')}
            />
            <ActionCard
              icon="🔑"
              label="Change PIN"
              description="Update login PIN"
              onClick={() => setModal('pin')}
              color="bg-red-900/20"
            />
          </>
        )}
      </div>

      {/* MODALS */}

      <Modal open={modal === 'start'} onClose={close} title="Start Match">
        <div className="space-y-4">
          <Field label="Select Upcoming Match">
            <select
              value={startMatchId}
              onChange={(e) => setStartMatchId(e.target.value)}
              className={inputCls}
            >
              <option value="">-- Select --</option>
              {upcomingMatches.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.round}: {getTeamName(m.teamAId)} vs {getTeamName(m.teamBId)}
                </option>
              ))}
            </select>
          </Field>
          <button onClick={handleStartMatch} className={btnPrimary}>
            Start Match
          </button>
        </div>
      </Modal>

      <Modal open={modal === 'scoring'} onClose={close} title="Live Scoring">
        {liveMatches.length === 0 ? (
          <p className="py-4 text-center text-sm text-indigo-300/50">
            No live matches right now.
          </p>
        ) : (
          <div className="space-y-2">
            {liveMatches.map((m) => (
              <Link
                key={m.id}
                to={`/umpire/${m.id}`}
                className="flex items-center justify-between rounded-lg border border-[#1e1b4b]/30 p-3 hover:bg-[#1e1b4b]/20"
                onClick={close}
              >
                <span className="text-sm font-medium text-white">
                  {getTeamName(m.teamAId)} vs {getTeamName(m.teamBId)}
                </span>
                <span className="rounded-full bg-red-900/30 px-2 py-0.5 text-xs font-semibold text-red-400">
                  LIVE
                </span>
              </Link>
            ))}
          </div>
        )}
      </Modal>

      <Modal open={modal === 'teams'} onClose={close} title="Manage Teams">
        <div className="space-y-4">
          <div className="max-h-48 space-y-1 overflow-y-auto">
            {store.teams.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between rounded-lg border border-[#1e1b4b]/20 px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full" style={{ backgroundColor: t.color }} />
                  <span className="text-sm font-medium text-indigo-100">
                    {t.name} ({t.shortName})
                  </span>
                </div>
                <button
                  onClick={() => {
                    if (window.confirm(`Delete ${t.name}?`)) {
                      store.deleteTeam(t.id);
                      toast.success('Team deleted');
                    }
                  }}
                  className="text-indigo-400/40 hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <hr className="border-[#1e1b4b]/20" />

          <h4 className="text-sm font-semibold text-indigo-200/70">Add Team</h4>
          <Field label="Team Name">
            <input value={teamName} onChange={(e) => setTeamName(e.target.value)} className={inputCls} placeholder="e.g., Thunderbolts" />
          </Field>
          <Field label="Short Name (2-3 letters)">
            <input value={teamShort} onChange={(e) => setTeamShort(e.target.value)} maxLength={3} className={inputCls} placeholder="e.g., THU" />
          </Field>
          <Field label="Color">
            <input type="color" value={teamColor} onChange={(e) => setTeamColor(e.target.value)} className="h-10 w-full cursor-pointer rounded-lg border border-indigo-700/40" />
          </Field>
          <Field label="Group (optional)">
            <select value={teamGroup} onChange={(e) => setTeamGroup(e.target.value)} className={inputCls}>
              <option value="">-- None --</option>
              {store.groups.map((g) => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>
          </Field>
          <button onClick={handleAddTeam} className={btnPrimary}>Add Team</button>
        </div>
      </Modal>

      <Modal open={modal === 'players'} onClose={close} title="Manage Players">
        <div className="space-y-4">
          <div className="max-h-48 space-y-1 overflow-y-auto">
            {store.players.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between rounded-lg border border-[#1e1b4b]/20 px-3 py-2"
              >
                <span className="text-sm text-indigo-100">
                  {p.name}{' '}
                  <span className="text-indigo-400/40">
                    ({getTeamName(p.teamId)})
                  </span>
                </span>
                <button
                  onClick={() => {
                    store.deletePlayer(p.id);
                    toast.success('Player deleted');
                  }}
                  className="text-indigo-400/40 hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <hr className="border-[#1e1b4b]/20" />
          <h4 className="text-sm font-semibold text-indigo-200/70">Add Player</h4>
          <Field label="Player Name">
            <input value={playerName} onChange={(e) => setPlayerName(e.target.value)} className={inputCls} placeholder="Full name" />
          </Field>
          <Field label="Team">
            <select value={playerTeam} onChange={(e) => setPlayerTeam(e.target.value)} className={inputCls}>
              <option value="">-- Select --</option>
              {store.teams.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </Field>
          <button onClick={handleAddPlayer} className={btnPrimary}>Add Player</button>
        </div>
      </Modal>

      <Modal open={modal === 'schedule'} onClose={close} title="Schedule Match">
        <div className="space-y-4">
          <Field label="Round">
            <input value={matchRound} onChange={(e) => setMatchRound(e.target.value)} className={inputCls} placeholder="e.g., Group A - Day 1" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Team A">
              <select value={matchTeamA} onChange={(e) => setMatchTeamA(e.target.value)} className={inputCls}>
                <option value="">-- Select --</option>
                {store.teams.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </Field>
            <Field label="Team B">
              <select value={matchTeamB} onChange={(e) => setMatchTeamB(e.target.value)} className={inputCls}>
                <option value="">-- Select --</option>
                {store.teams.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </Field>
          </div>
          <Field label="Court">
            <input value={matchCourt} onChange={(e) => setMatchCourt(e.target.value)} className={inputCls} placeholder="Court 1" />
          </Field>
          <Field label="Date & Time">
            <input type="datetime-local" value={matchDate} onChange={(e) => setMatchDate(e.target.value)} className={inputCls} />
          </Field>
          <Field label="Group (optional)">
            <select value={matchGroup} onChange={(e) => setMatchGroup(e.target.value)} className={inputCls}>
              <option value="">-- None --</option>
              {store.groups.map((g) => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>
          </Field>
          <button onClick={handleAddMatch} className={btnPrimary}>Schedule Match</button>
        </div>
      </Modal>

      <Modal open={modal === 'announcements'} onClose={close} title="Announcements">
        <div className="space-y-4">
          <div className="max-h-40 space-y-1 overflow-y-auto">
            {store.announcements.map((a) => (
              <div
                key={a.id}
                className="flex items-center justify-between rounded-lg border border-[#1e1b4b]/20 px-3 py-2"
              >
                <div>
                  <p className="text-sm font-medium text-indigo-100">{a.title}</p>
                  <p className="text-xs text-indigo-400/40 line-clamp-1">{a.body}</p>
                </div>
                <button
                  onClick={() => {
                    store.deleteAnnouncement(a.id);
                    toast.success('Deleted');
                  }}
                  className="text-indigo-400/40 hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <hr className="border-[#1e1b4b]/20" />
          <h4 className="text-sm font-semibold text-indigo-200/70">New Announcement</h4>
          <Field label="Title">
            <input value={annTitle} onChange={(e) => setAnnTitle(e.target.value)} className={inputCls} />
          </Field>
          <Field label="Body">
            <textarea value={annBody} onChange={(e) => setAnnBody(e.target.value)} className={inputCls} rows={3} />
          </Field>
          <Field label="Type">
            <select value={annType} onChange={(e) => setAnnType(e.target.value as Announcement['type'])} className={inputCls}>
              <option value="info">Info</option>
              <option value="match">Match</option>
              <option value="winner">Winner</option>
              <option value="champion">Champion</option>
            </select>
          </Field>
          <button onClick={handleAddAnnouncement} className={btnPrimary}>Add Announcement</button>
        </div>
      </Modal>

      <Modal open={modal === 'updates'} onClose={close} title="Tournament Updates">
        <div className="space-y-4">
          <div className="max-h-40 space-y-1 overflow-y-auto">
            {store.updates.map((u) => (
              <div
                key={u.id}
                className="flex items-center justify-between rounded-lg border border-[#1e1b4b]/20 px-3 py-2"
              >
                <p className="text-sm text-indigo-100 line-clamp-1">{u.text}</p>
                <button
                  onClick={() => {
                    store.deleteUpdate(u.id);
                    toast.success('Deleted');
                  }}
                  className="text-indigo-400/40 hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <hr className="border-[#1e1b4b]/20" />
          <Field label="Update Text">
            <textarea value={updateText} onChange={(e) => setUpdateText(e.target.value)} className={inputCls} rows={3} />
          </Field>
          <button onClick={handleAddUpdate} className={btnPrimary}>Add Update</button>
        </div>
      </Modal>

      <Modal open={modal === 'gallery'} onClose={close} title="Gallery Management">
        <div className="space-y-2">
          {store.gallery.length === 0 ? (
            <p className="py-4 text-center text-sm text-indigo-300/50">
              No photos yet. Upload from the Gallery page.
            </p>
          ) : (
            <div className="max-h-60 space-y-1 overflow-y-auto">
              {store.gallery.map((g) => (
                <div
                  key={g.id}
                  className="flex items-center justify-between rounded-lg border border-[#1e1b4b]/20 px-3 py-2"
                >
                  <div className="flex items-center gap-2">
                    {g.photo && (
                      <img src={g.photo} alt="" className="h-8 w-8 rounded object-cover" />
                    )}
                    <span className="text-sm text-indigo-100 line-clamp-1">
                      {g.caption}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      store.deleteGalleryItem(g.id);
                      toast.success('Photo deleted');
                    }}
                    className="text-indigo-400/40 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <p className="text-xs text-indigo-400/40">
            To upload new photos, go to the{' '}
            <Link to="/gallery" className="text-indigo-400 hover:underline" onClick={close}>
              Gallery page
            </Link>.
          </p>
        </div>
      </Modal>

      <Modal open={modal === 'pin'} onClose={close} title="Change PIN">
        <div className="space-y-4">
          <Field label="Current PIN">
            <input type="password" inputMode="numeric" maxLength={6} value={oldPin} onChange={(e) => setOldPin(e.target.value.replace(/\D/g, ''))} className={inputCls} />
          </Field>
          <Field label="New PIN (6 digits)">
            <input type="password" inputMode="numeric" maxLength={6} value={newPin} onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ''))} className={inputCls} />
          </Field>
          <Field label="Confirm New PIN">
            <input type="password" inputMode="numeric" maxLength={6} value={confirmPin} onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ''))} className={inputCls} />
          </Field>
          <div className="flex gap-3">
            <button onClick={close} className={btnSecondary}>Cancel</button>
            <button onClick={handleChangePin} className={btnPrimary}>Change PIN</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
