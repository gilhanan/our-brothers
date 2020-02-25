/* tslint:disable */

export interface Meeting {
  hostId: string;
  id: string;
  title: string;
  address: MeetingAddress;
  date: number;
  contact: UserProfile;
  capacity: number;
  count: number;
  invited: boolean;
  accessibility: boolean;
  media: boolean;
  reviewable: boolean;
  audience: MeetingAudience;
  bereaved?: MeetingBereaved;
}

export interface MeetingParticipate {
  id?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  accompanies: number;
}

export interface Address {
  latitude: number;
  longitude: number;
  formattedAddress: string;
}

export interface MeetingAddress extends Address {
  notes?: string;
}

export interface MeetingBereaved {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  slains: { firstName: string; lastName: string; }[];
}

export enum MeetingAudience {
  all = "all",
  schoolStudents = "schoolStudents",
  youthMovement = "youthMovement",
  militaryPreparation = "militaryPreparation",
  soldiers = "soldiers",
  students = "students"
}

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
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  address?: Address;
  birthDay?: number;
  otherLang?: string;
}

export enum UserRole {
  bereaved = "bereaved",
  participate = "participate",
  host = "host"
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


export interface ParticipateParticipation {
  meetings: ParticipateParticipationMeeting[];
}

export interface HostParticipation {
  meetings: UserParticipationMeeting[];
}

export interface BereavedParticipation {
  meetings: UserParticipationMeeting[];
  status: BereavedStatus;
  guidance: BereavedGuidance;
  notes: string;
}

export interface UserParticipationMeeting {
  hostId?: string;
  id?: string;
  title: string;
}

export interface ParticipateParticipationMeeting extends UserParticipationMeeting {
  accompanies: number;
}

export enum BereavedStatus {
  done = "done",
  inactive = "inactive",
  waiting = "waiting"
}

export interface BereavedGuidance {
  answered: boolean;
  general: string[];
}

export enum BereavedGuidanceGeneral {
  jerusalem = "jerusalem",
  telAviv = "telAviv",
  haifa = "haifa"
}

export interface Contact {
  name: string;
  email: string;
  phoneNumber: string;
  subject: string;
  body: string;
  date: number;
}
