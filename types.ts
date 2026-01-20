
export type UserRole = 'ADMIN' | 'CLIENT';

export interface User {
  id: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  businessInfo?: BusinessInfo;
}

export interface BusinessInfo {
  name: string;
  category: string;
  weeklyConfig: WeeklyConfig;
  maxDailyAppointments: number;
}

export interface WeeklyConfig {
  days: string[]; // ['Monday', 'Tuesday'...]
  startTime: string; // '09:00'
  endTime: string; // '17:00'
  breakStart?: string;
  breakEnd?: string;
}

export type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'REJECTED' | 'CANCELLED';

export interface Appointment {
  id: string;
  professionalId: string;
  clientId: string;
  clientName: string;
  businessName: string;
  date: string; // ISO String
  time: string; // '10:30'
  status: AppointmentStatus;
}

export const CATEGORIES = [
  'Médecin',
  'Coiffeur',
  'Professeur',
  'Consultant',
  'Avocat',
  'Sport & Bien-être',
  'Autre'
];

export const DAYS_OF_WEEK = [
  'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'
];
