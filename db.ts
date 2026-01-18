
import { User, ProProfile, Appointment, AppState } from './types';

const DB_KEY = 'smart_appointment_db';

const initialState: AppState = {
  currentUser: null,
  users: [],
  proProfiles: [],
  appointments: [],
};

export const getDB = (): AppState => {
  const data = localStorage.getItem(DB_KEY);
  return data ? JSON.parse(data) : initialState;
};

export const saveDB = (state: AppState) => {
  localStorage.setItem(DB_KEY, JSON.stringify(state));
};

export const clearSession = () => {
  const db = getDB();
  db.currentUser = null;
  saveDB(db);
};
