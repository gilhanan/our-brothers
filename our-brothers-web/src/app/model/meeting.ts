import { UserProfile } from './user';

export interface Meeting {
  hostId: string;
  id: string;
  year: number;
  title: string;
  address: MeetingAddress;
  date: number;
  time: { hour: number; minute: number };
  contact: UserProfile;
  capacity: number;
  count: number;
  invited: boolean;
  open: boolean;
  accessibility: boolean;
  media: boolean;
  reviewable: boolean;
  bereaved?: MeetingBereaved;
  audience?: MeetingAudience[];
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

export const MeetingAudienceLabels: { [audience in MeetingAudience]: string } = {
  all: 'כולם',
  schoolStudents: 'תלמידים',
  youthMovement: 'תנועות נוער',
  militaryPreparation: 'מכינות',
  soldiers: 'חיילים',
  students: 'סטודנטים'
}
