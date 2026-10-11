import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase, ref, set, get, onValue, update } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAfv7K3uBBlP8AyLGaQ_49vceduli01raw",
  authDomain: "badminton-tournament-2d3d4.firebaseapp.com",
  databaseURL: "https://badminton-tournament-2d3d4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "badminton-tournament-2d3d4",
  storageBucket: "badminton-tournament-2d3d4.firebasestorage.app",
  messagingSenderId: "386212936704",
  appId: "1:386212936704:web:cc04f7da76bbf657922ce5",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const database = getDatabase(app);
const tournamentRef = ref(database, 'tournament');

export { database, tournamentRef, ref, set, get, onValue, update };
export default app;
