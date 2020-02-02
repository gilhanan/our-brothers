import {
  ParticipateParticipation,
  HostParticipation,
  BereavedParticipation
} from './participations';

export enum UserType {
  BROTHER,
  GUEST,
  HOST
}

export interface User {
  id?: string;
  profile?: UserProfile;
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

export interface UserParticipation<T> {
  [year: number]: T;
}
