export * from './user';
export * from './meeting';
export * from './participations';

export interface Contact {
  fullName: string;
  email: string;
  phoneNumber: string;
  subject: string;
  body: string;
  date: number;
}
