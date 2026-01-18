
export type UserRole = 'PRO' | 'CLIENT';

export type ProfessionCategory = 'Médecin' | 'Coiffeur' | 'Professeur' | 'Consultant' | 'Autre';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  password?: string;
}

export interface ProProfile {
  userId: string;
  companyName: string;
  category: ProfessionCategory;
  maxDailyAppointments: number;
  workingDays: number[]; // 0 for Sunday, 1-5 for Mon-Fri, etc.
  workingHours: {
    start: string; // "09:00"
    end: string;   // "18:00"
  };
  pauseHours: {
    start: string;
    end: string;
  };
}

export type AppointmentStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED';

export interface Appointment {
  id: string;
  proId: string;
  clientId: string;
  date: string; // ISO string
  time: string; // "14:30"
  status: AppointmentStatus;
}

export interface AppState {
  currentUser: User | null;
  users: User[];
  proProfiles: ProProfile[];
  appointments: Appointment[];
}
