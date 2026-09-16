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
    <nav className="sticky top-0 z-50 border-b border-[#1e1b4b]/40 bg-[#0a0820]/95 backdrop-blur-xl shadow-lg shadow-[#1e1b4b]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src="/logo.png"
              alt="IVBT 2026"
              className="h-11 w-11 rounded-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col leading-none">
              <span className="text-sm font-bold tracking-wider text-orange-500 font-outfit">
                INSPIRIT VISION
              </span>
              <span className="text-[10px] font-medium tracking-widest text-[#1e1b4b]/70 dark:text-indigo-300/70 uppercase">
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
                    ? 'text-orange-500 bg-orange-500/10'
                    : 'text-indigo-200/70 hover:text-orange-400 hover:bg-white/5'
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
              className="p-2 rounded-lg text-indigo-300/60 hover:text-orange-500 hover:bg-white/5 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {auth.isLoggedIn ? (
              <Link
                to="/admin"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1e1b4b] text-white text-sm font-medium hover:bg-[#2d2a5e] transition-colors"
              >
                <Shield className="h-4 w-4" />
                Admin
              </Link>
            ) : (
              <Link
                to="/login"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1e1b4b]/50 text-indigo-200 text-sm font-medium hover:bg-[#1e1b4b]/30 hover:border-[#1e1b4b] transition-colors"
              >
                <LogIn className="h-4 w-4" />
                Login
              </Link>
            )}

            <button
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="md:hidden p-2 rounded-lg text-indigo-300/60 hover:text-orange-500 hover:bg-white/5 transition-colors"
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
            className="md:hidden overflow-hidden border-t border-[#1e1b4b]/30 bg-[#0a0820]"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.to)
                      ? 'text-orange-500 bg-orange-500/10'
                      : 'text-indigo-200/70 hover:text-orange-400 hover:bg-white/5'
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

              <div className="pt-2 border-t border-[#1e1b4b]/30">
                {auth.isLoggedIn ? (
                  <Link
                    to="/admin"
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-orange-500 bg-orange-500/10"
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
