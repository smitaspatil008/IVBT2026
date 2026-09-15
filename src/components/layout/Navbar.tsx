import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Shield, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShallow } from 'zustand/react/shallow';
import { useUIStore } from '../../store/uiStore';
import { useTournamentStore } from '../../store/tournamentStore';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/live', label: 'Live' },
  { to: '/groups', label: 'Groups' },
  { to: '/bracket', label: 'Bracket' },
  { to: '/teams', label: 'Teams' },
  { to: '/schedule', label: 'Schedule' },
  { to: '/leaderboard', label: 'Leaderboard' },
];

function ShuttlecockIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="18" r="3" fill="currentColor" opacity={0.3} />
      <path d="M12 15V5" />
      <path d="M8 7l4-4 4 4" />
      <path d="M6 9l6-2 6 2" />
      <path d="M5 12l7-1 7 1" />
    </svg>
  );
}

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { darkMode, toggleDarkMode } = useUIStore(
    useShallow((s) => ({ darkMode: s.darkMode, toggleDarkMode: s.toggleDarkMode }))
  );

  const { matches, auth } = useTournamentStore(
    useShallow((s) => ({ matches: s.matches, auth: s.auth }))
  );

  const hasLiveMatches = useMemo(
    () => matches.some((m) => m.status === 'live'),
    [matches]
  );

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  function isActive(path: string) {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-indigo-900/30 bg-[#0f0d1a]/95 backdrop-blur-xl shadow-lg shadow-indigo-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <ShuttlecockIcon className="h-8 w-8 text-amber-400 transition-transform group-hover:rotate-12" />
              <div className="absolute inset-0 h-8 w-8 rounded-full bg-amber-400/20 blur-md group-hover:bg-amber-400/30 transition" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-bold tracking-wider text-amber-400 font-outfit">
                INSPIRIT VISION
              </span>
              <span className="text-[10px] font-medium tracking-widest text-indigo-300/70 uppercase">
                Badminton 2026
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.to)
                    ? 'text-amber-400 bg-amber-400/10'
                    : 'text-indigo-200/70 hover:text-amber-300 hover:bg-white/5'
                }`}
              >
                {link.label}
                {link.label === 'Live' && hasLiveMatches && (
                  <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-indigo-300/60 hover:text-amber-400 hover:bg-white/5 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {auth.isLoggedIn ? (
              <Link
                to="/admin"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-colors"
              >
                <Shield className="h-4 w-4" />
                Admin
              </Link>
            ) : (
              <Link
                to="/login"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-indigo-700/50 text-indigo-200 text-sm font-medium hover:bg-indigo-900/30 hover:border-indigo-600 transition-colors"
              >
                <LogIn className="h-4 w-4" />
                Login
              </Link>
            )}

            <button
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="md:hidden p-2 rounded-lg text-indigo-300/60 hover:text-amber-400 hover:bg-white/5 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t border-indigo-900/30 bg-[#0f0d1a]"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.to)
                      ? 'text-amber-400 bg-amber-400/10'
                      : 'text-indigo-200/70 hover:text-amber-300 hover:bg-white/5'
                  }`}
                >
                  {link.label}
                  {link.label === 'Live' && hasLiveMatches && (
                    <span className="flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                    </span>
                  )}
                </Link>
              ))}

              <div className="pt-2 border-t border-indigo-900/30">
                {auth.isLoggedIn ? (
                  <Link
                    to="/admin"
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-amber-400 bg-amber-400/10"
                  >
                    <Shield className="h-4 w-4" />
                    Admin Panel
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-indigo-200/70 hover:bg-white/5"
                  >
                    <LogIn className="h-4 w-4" />
                    Login
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
