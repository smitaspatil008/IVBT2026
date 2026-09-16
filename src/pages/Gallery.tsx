import { useMemo, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Plus, Trash2, X, Image as ImageIcon } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import toast from 'react-hot-toast';
import { useTournamentStore } from '../store/tournamentStore';
import type { GalleryItem } from '../types';

const CATEGORIES = ['all', 'match', 'celebration', 'team', 'player'] as const;
type Category = (typeof CATEGORIES)[number];

const CATEGORY_LABELS: Record<Category, string> = {
  all: 'All',
  match: 'Match',
  celebration: 'Celebration',
  team: 'Team',
  player: 'Player',
};

const CATEGORY_COLORS: Record<string, string> = {
  match: 'bg-blue-900/30 text-blue-400',
  celebration: 'bg-yellow-900/30 text-yellow-400',
  team: 'bg-emerald-900/30 text-emerald-400',
  player: 'bg-purple-900/30 text-purple-400',
};

function compressImage(file: File, maxWidth = 800, quality = 0.7): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ratio = Math.min(maxWidth / img.width, 1);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('Canvas not supported'));
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function Gallery() {
  const { gallery, auth, addGalleryItem, deleteGalleryItem } = useTournamentStore(
    useShallow((s) => ({
      gallery: s.gallery,
      auth: s.auth,
      addGalleryItem: s.addGalleryItem,
      deleteGalleryItem: s.deleteGalleryItem,
    })),
  );

  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [showUpload, setShowUpload] = useState(false);
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState<GalleryItem['category']>('match');
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return gallery;
    return gallery.filter((g) => g.category === activeCategory);
  }, [gallery, activeCategory]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    try {
      const compressed = await compressImage(file);
      setPreview(compressed);
    } catch {
      toast.error('Failed to process image');
    }
  };

  const handleUpload = () => {
    if (!preview) {
      toast.error('Please select an image');
      return;
    }
    if (!caption.trim()) {
      toast.error('Please add a caption');
      return;
    }

    setUploading(true);
    const item: GalleryItem = {
      id: `gallery-${Date.now()}`,
      photo: preview,
      caption: caption.trim(),
      category,
      uploadedAt: new Date().toISOString(),
    };
    addGalleryItem(item);
    toast.success('Photo uploaded!');

    setCaption('');
    setCategory('match');
    setPreview(null);
    setShowUpload(false);
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this photo?')) {
      deleteGalleryItem(id);
      toast.success('Photo deleted');
    }
  };

  return (
    <div className="mx-auto max-w-6xl py-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Camera className="h-7 w-7 text-indigo-400" />
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Gallery
          </h1>
        </div>
        {auth.isLoggedIn && (
          <button
            onClick={() => setShowUpload(true)}
            className="flex items-center gap-1.5 rounded-lg bg-[#1e1b4b] px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-500 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Upload
          </button>
        )}
      </div>

      {/* Category Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeCategory === cat
                ? 'bg-[#1e1b4b] text-white shadow'
                : 'bg-[#1e1b4b]/30 text-indigo-300/70 hover:bg-[#1e1b4b]/30 border border-[#1e1b4b]/20'
            }`}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-20 text-center"
        >
          <ImageIcon className="mx-auto mb-3 h-16 w-16 text-indigo-700" />
          <p className="text-lg font-medium text-indigo-300/50">
            No photos yet
          </p>
          <p className="text-sm text-indigo-400/40">
            {auth.isLoggedIn
              ? 'Upload photos to get the gallery started!'
              : 'Photos will appear here once uploaded.'}
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <AnimatePresence>
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative overflow-hidden rounded-xl border border-[#1e1b4b]/30 bg-[#12102a] shadow-sm"
              >
                {/* Image */}
                <div className="aspect-square overflow-hidden bg-indigo-950/50">
                  {item.photo ? (
                    <img
                      src={item.photo}
                      alt={item.caption}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <ImageIcon className="h-12 w-12 text-indigo-700" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-3">
                  <span className={`mb-1.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${CATEGORY_COLORS[item.category] ?? 'bg-[#1e1b4b]/30 text-indigo-400'}`}>
                    {item.category}
                  </span>
                  <p className="text-sm font-medium text-indigo-100 line-clamp-2">
                    {item.caption}
                  </p>
                </div>

                {/* Delete button for admin */}
                {auth.isLoggedIn && auth.role === 'admin' && (
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="absolute right-2 top-2 rounded-full bg-black/50 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Upload Modal */}
      <AnimatePresence>
        {showUpload && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={() => setShowUpload(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border border-[#1e1b4b]/30 bg-[#12102a] p-6 shadow-xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Upload Photo</h3>
                <button
                  onClick={() => setShowUpload(false)}
                  className="rounded-lg p-1 text-indigo-400/40 hover:bg-[#1e1b4b]/30"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-indigo-200/70">
                    Photo
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full rounded-lg border border-indigo-700/40 bg-indigo-950/50 px-3 py-2 text-sm text-indigo-200 file:mr-3 file:rounded file:border-0 file:bg-[#1e1b4b]/40 file:px-3 file:py-1 file:text-sm file:font-medium file:text-indigo-300"
                  />
                  {preview && (
                    <img
                      src={preview}
                      alt="Preview"
                      className="mt-2 h-32 w-full rounded-lg object-cover"
                    />
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-indigo-200/70">
                    Caption
                  </label>
                  <input
                    type="text"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Describe the photo..."
                    className="w-full rounded-lg border border-indigo-700/40 bg-indigo-950/50 px-3 py-2 text-sm text-white placeholder-indigo-400/40 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-indigo-200/70">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as GalleryItem['category'])}
                    className="w-full rounded-lg border border-indigo-700/40 bg-indigo-950/50 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  >
                    <option value="match">Match</option>
                    <option value="celebration">Celebration</option>
                    <option value="team">Team</option>
                    <option value="player">Player</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setShowUpload(false)}
                    className="flex-1 rounded-lg border border-indigo-700/40 px-4 py-2 text-sm font-medium text-indigo-200/70 hover:bg-[#1e1b4b]/30"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpload}
                    disabled={uploading || !preview}
                    className="flex-1 rounded-lg bg-[#1e1b4b] px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-500 disabled:opacity-50"
                  >
                    {uploading ? 'Uploading...' : 'Upload'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
