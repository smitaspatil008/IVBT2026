import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTournamentStore } from '../store/tournamentStore';

export default function Login() {
  const navigate = useNavigate();
  const login = useTournamentStore((s) => s.login);

  const [pin, setPin] = useState('');
  const [role, setRole] = useState<'admin' | 'umpire'>('admin');
  const [error, setError] = useState('');
  const [showPin, setShowPin] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (pin.length !== 6) {
      setError('PIN must be 6 digits');
      return;
    }

    const success = login(pin, role);
    if (success) {
      toast.success(`Logged in as ${role}`);
      navigate('/admin');
    } else {
      setError('Invalid PIN. Please try again.');
      setPin('');
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="rounded-2xl border border-indigo-800/30 bg-[#1a1730] p-8 shadow-xl">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600/20">
            <Lock className="h-8 w-8 text-indigo-400" />
          </div>

          <h1 className="mb-1 text-center text-xl font-bold text-white">
            Login
          </h1>
          <p className="mb-6 text-center text-sm text-indigo-300/50">
            Enter the tournament PIN to access controls
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-indigo-200/70">
                Tournament PIN
              </label>
              <div className="relative">
                <input
                  type={showPin ? 'text' : 'password'}
                  inputMode="numeric"
                  maxLength={6}
                  value={pin}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setPin(val);
                    setError('');
                  }}
                  placeholder="Enter 6-digit PIN"
                  className={`w-full rounded-lg border px-4 py-3 text-center text-lg font-mono tracking-[0.5em] transition-colors placeholder:tracking-normal placeholder:text-sm bg-indigo-950/50 text-white focus:outline-none focus:ring-2 ${
                    error
                      ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-indigo-700/40 focus:border-indigo-500 focus:ring-indigo-500/20'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-400/40 hover:text-indigo-300"
                >
                  {showPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1.5 text-sm text-red-400"
                >
                  {error}
                </motion.p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-indigo-200/70">
                Login as
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`flex items-center justify-center gap-2 rounded-lg border-2 px-4 py-2.5 text-sm font-medium transition-all ${
                    role === 'admin'
                      ? 'border-amber-400/60 bg-amber-400/10 text-amber-400'
                      : 'border-indigo-700/30 text-indigo-300/50 hover:border-indigo-600/40'
                  }`}
                >
                  <ShieldCheck className="h-4 w-4" />
                  Admin
                </button>
                <button
                  type="button"
                  onClick={() => setRole('umpire')}
                  className={`flex items-center justify-center gap-2 rounded-lg border-2 px-4 py-2.5 text-sm font-medium transition-all ${
                    role === 'umpire'
                      ? 'border-amber-400/60 bg-amber-400/10 text-amber-400'
                      : 'border-indigo-700/30 text-indigo-300/50 hover:border-indigo-600/40'
                  }`}
                >
                  <Eye className="h-4 w-4" />
                  Umpire
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={pin.length < 6}
              className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Login
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
