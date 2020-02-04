import {
  ParticipateParticipation,
  HostParticipation,
  BereavedParticipation
} from './participations';

export interface User {
  id?: string;
  profile?: UserProfile;
  role?: UserRole;
  photoURL?: string;
  isAdmin?: boolean;
  bereavedProfile?: BereavedProfile;
  participateParticipation?: UserParticipation<ParticipateParticipation>;
  hostParticipation?: UserParticipation<HostParticipation>;
  bereavedParticipation?: UserParticipation<BereavedParticipation>;
  meetingMapGuideLastVisit?: number;
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

export interface BereavedProfile {
  story: string;
  slains: Slain[];
}

export interface Slain {
  id: string;
  firstName: string;
  lastName: string;
  deathDate: number;
}

export interface UserParticipation<T> {
  [year: number]: T;
}
