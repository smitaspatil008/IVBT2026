import { useEffect, Component, type ReactNode } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 40, fontFamily: 'monospace', background: '#fff', color: '#c00' }}>
          <h1>Render Error</h1>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{this.state.error.message}</pre>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontSize: 11, color: '#666' }}>{this.state.error.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}
import { Toaster } from 'react-hot-toast';
import { useTournamentStore } from './store/tournamentStore';
import Layout from './components/layout/Layout';
import Landing from './pages/Landing';
import LiveMatches from './pages/LiveMatches';
import Groups from './pages/Groups';
import Bracket from './pages/Bracket';
import Teams from './pages/Teams';
import Players from './pages/Players';
import Schedule from './pages/Schedule';
import MatchDetails from './pages/MatchDetails';
import Login from './pages/Login';
import AdminPortal from './pages/AdminPortal';
import UmpireScreen from './pages/UmpireScreen';
import Leaderboard from './pages/Leaderboard';
import Gallery from './pages/Gallery';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const initFirebaseSync = useTournamentStore((s) => s.initFirebaseSync);
  const isLoading = useTournamentStore((s) => s.isLoading);

  useEffect(() => {
    initFirebaseSync();
  }, [initFirebaseSync]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0820]">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-[#1e1b4b] border-t-orange-500 rounded-full animate-spin mb-4" />
          <p className="text-indigo-300/60 font-medium">Loading Tournament...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <ScrollToTop />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: { background: '#1f2937', color: '#fff' },
        }}
      />
      <ErrorBoundary>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/live" element={<LiveMatches />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/bracket" element={<Bracket />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/players" element={<Players />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/match/:id" element={<MatchDetails />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminPortal />} />
        </Route>
        <Route path="/umpire/:id" element={<UmpireScreen />} />
      </Routes>
      </ErrorBoundary>
    </>
  );
}

export default App;
