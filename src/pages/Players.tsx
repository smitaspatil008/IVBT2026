import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, User, X } from 'lucide-react';
import { useTournamentStore } from '../store/tournamentStore';
import PlayerCard from '../components/tournament/PlayerCard';
import type { Player } from '../types';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Players() {
  const { players, teams, auth, updatePlayer } = useTournamentStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selected, setSelected] = useState<Player | null>(null);
  const [editName, setEditName] = useState('');
  const [editPhoto, setEditPhoto] = useState('');

  const filteredPlayers = useMemo(() => {
    if (!searchQuery.trim()) return players;
    const q = searchQuery.toLowerCase();
    return players.filter((p) => p.name.toLowerCase().includes(q));
  }, [players, searchQuery]);

  const getTeam = (teamId: string) => teams.find((t) => t.id === teamId);

  const openPlayer = (p: Player) => {
    setSelected(p);
    setEditName(p.name);
    setEditPhoto(p.photo);
  };

  const handleSave = () => {
    if (!selected) return;
    updatePlayer(selected.id, { name: editName, photo: editPhoto });
    setSelected(null);
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6 pb-12"
    >
      <motion.div variants={item}>
        <h1 className="flex items-center gap-3 text-2xl font-bold text-white md:text-3xl">
          <Users className="h-7 w-7 text-pink-500" />
          Players
        </h1>
        <p className="mt-1 text-sm text-indigo-300/50">
          {players.length} players competing in IVBT 2026
        </p>
      </motion.div>

      <motion.div variants={item} className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-indigo-400/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search players..."
            className="w-full rounded-lg border border-indigo-700/40 bg-indigo-950/50 py-2.5 pl-10 pr-4 text-sm text-white placeholder-indigo-400/40 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
          />
        </div>
        <p className="text-xs text-indigo-300/50">{filteredPlayers.length} players</p>
      </motion.div>

      <motion.div
        variants={container}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
      >
        {filteredPlayers.map((p, i) => (
          <PlayerCard
            key={p.id}
            player={p}
            delay={Math.min(i * 0.03, 0.5)}
            onClick={() => openPlayer(p)}
          />
        ))}
      </motion.div>

      {filteredPlayers.length === 0 && (
        <motion.div variants={item} className="py-12 text-center text-indigo-300/50">
          No players found matching &ldquo;{searchQuery}&rdquo;.
        </motion.div>
      )}

      {/* Player detail / edit modal */}
      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
          onClick={() => setSelected(null)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#12102a] border border-[#1e1b4b]/50 rounded-2xl shadow-xl p-6 w-full max-w-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-white">
                {auth.isLoggedIn ? 'Edit Player' : 'Player Details'}
              </h3>
              <button
                onClick={() => setSelected(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#1e1b4b]/50"
              >
                <X className="w-4 h-4 text-indigo-300/50" />
              </button>
            </div>

            <div className="flex flex-col items-center mb-4">
              {(auth.isLoggedIn ? editPhoto : selected.photo) ? (
                <img
                  src={auth.isLoggedIn ? editPhoto : selected.photo}
                  alt={selected.name}
                  loading="lazy"
                  className="w-20 h-20 rounded-full object-cover border-[3px] mb-3"
                  style={{ borderColor: getTeam(selected.teamId)?.color ?? '#6366f1' }}
                />
              ) : (
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center bg-[#1e1b4b]/50 border-[3px] mb-3"
                  style={{ borderColor: getTeam(selected.teamId)?.color ?? '#6366f1' }}
                >
                  <User className="w-10 h-10 text-indigo-400/40" />
                </div>
              )}
            </div>

            {auth.isLoggedIn ? (
              <div className="space-y-3">
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Name"
                  className="w-full px-4 py-3 rounded-lg border border-[#1e1b4b]/50 text-sm outline-none bg-[#0a0820] text-white focus:ring-2 focus:ring-pink-500/30"
                />
                <input
                  value={editPhoto}
                  onChange={(e) => setEditPhoto(e.target.value)}
                  placeholder="Photo URL"
                  className="w-full px-4 py-3 rounded-lg border border-[#1e1b4b]/50 text-sm outline-none bg-[#0a0820] text-white focus:ring-2 focus:ring-pink-500/30"
                />
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => setSelected(null)}
                    className="flex-1 py-3 rounded-lg border border-[#1e1b4b]/50 text-sm font-medium text-indigo-300/70 hover:bg-[#1e1b4b]/30"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex-1 py-3 rounded-lg text-sm font-semibold text-white bg-pink-500 hover:bg-pink-400"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-center">
                <h4 className="font-semibold text-lg text-white">{selected.name}</h4>
                {getTeam(selected.teamId) && (
                  <p className="text-sm" style={{ color: getTeam(selected.teamId)!.color }}>
                    {getTeam(selected.teamId)!.name}
                  </p>
                )}
                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#1e1b4b]/30">
                  <div className="text-center">
                    <div className="font-bold text-xl text-white">{selected.matchesPlayed}</div>
                    <div className="text-[10px] text-indigo-300/50">Played</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-xl text-emerald-400">{selected.wins}</div>
                    <div className="text-[10px] text-indigo-300/50">Won</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-xl text-rose-400">{selected.losses}</div>
                    <div className="text-[10px] text-indigo-300/50">Lost</div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
