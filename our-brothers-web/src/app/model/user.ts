import { ParticipateParticipation, HostParticipation, BereavedParticipation } from './participations';

export interface User {
  id?: string;
  profile?: UserProfile;
  role?: UserRole;
  photoURL?: string;
  isAdmin?: boolean;
  participateParticipation?: UserParticipation<ParticipateParticipation>;
  hostParticipation?: UserParticipation<HostParticipation>;
  bereavedParticipation?: UserParticipation<BereavedParticipation>;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  email?: string;
}

export enum UserRole {
  bereaved = 'bereaved',
  participate = 'participate',
  host = 'host'
}

export interface UserParticipation<T> {
  [year: number]: T;
}
