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

export interface BaseParticipation<T = any> {
  meetings: T[];
}

export interface ParticipateParticipation extends BaseParticipation<ParticipateParticipationMeeting> { }

export interface HostParticipation extends BaseParticipation<UserParticipationMeeting> { }

export interface BereavedParticipation extends BaseParticipation<UserParticipationMeeting> {
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
  general: BereavedGuidanceGeneral[];
}

export enum BereavedGuidanceGeneral {
  m1 = "m1",
  m2 = "m2",
  m3 = "m3",
  m4 = "m4"
}

export interface GuidanceOption {
  label: string;
  details: string;
  value: BereavedGuidanceGeneral;
}

export const guidanceOptions: GuidanceOption[] = [{
  label: "באר שבע",
  details: "29.03.20 בבאר שבע בין השעות 17:30-21:30, משרדי WEWORK, רח' חלקיקי האור 16",
  value: BereavedGuidanceGeneral.m1
}, {
  label: "תל אביב",
  details: "31.03.20 בתל אביב בין השעות 17:00-21:00, משרדי WEWORK, רח' שוקן 23",
  value: BereavedGuidanceGeneral.m2
}, {
  label: "ירושלים",
  details: "01.04.20 בירושלים בין השעות 18:00-22:00, משרדי WEWORK, רח' קינג ג'ורג' 20",
  value: BereavedGuidanceGeneral.m3
}, {
  label: "חיפה",
  details: "02.04.20 בחיפה בין השעות 17:00-21:00, משרדי WEWORK, רח' דרך העצמאות 45",
  value: BereavedGuidanceGeneral.m4
}];

export interface Contact {
  name: string;
  email: string;
  phoneNumber: string;
  subject: string;
  body: string;
  date: number;
}

export interface PayPalOrder {
  payerId: string;
  orderId: string;
  amount: string;
  userId?: string;
}
