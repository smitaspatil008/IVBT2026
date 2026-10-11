import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, onValue, update } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAoEATlLEVwheFI9OioanY_zjY8G3pamY8",
  authDomain: "carrom-sequence-tournament.firebaseapp.com",
  databaseURL: "https://carrom-sequence-tournament-default-rtdb.firebaseio.com",
  projectId: "carrom-sequence-tournament",
  storageBucket: "carrom-sequence-tournament.firebasestorage.app",
  messagingSenderId: "615564107743",
  appId: "1:615564107743:web:8306aa9c11b913dbc76e6a",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const tournamentRef = ref(database, 'ivbt-2026');

export { database, tournamentRef, ref, set, get, onValue, update };
export default app;
