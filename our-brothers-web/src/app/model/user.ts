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
  isVolunteer?: boolean;
  bereavedProfile?: BereavedProfile;
  participateParticipation?: UserParticipation<ParticipateParticipation>;
  hostParticipation?: UserParticipation<HostParticipation>;
  bereavedParticipation?: UserParticipation<BereavedParticipation>;
  meetingMapGuideLastVisit?: number;
  lastSignInDate?: number;
  registered?: number;
}

export interface UserProfile {
  address?: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  email?: string;
  birthDay?: number;
  otherLang?: string;
  agree?: boolean;
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
  id?: string;
  firstName: string;
  lastName: string;
  deathDate: number;
}

export interface UserParticipation<T> {
  [year: number]: T;
}
