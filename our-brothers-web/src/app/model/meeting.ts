import { UserProfile } from './user';

export interface Meeting {
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
  audience?: MeetingAudience[];
}

export interface MeetingAddress {
  latitude: number;
  longitude: number;
  formattedAddress: string;
  notes?: string;
}

export enum MeetingAudience {
  all = "all",
  schoolStudents = "schoolStudents",
  youthMovement = "youthMovement",
  militaryPreparation = "militaryPreparation",
  soldiers = "soldiers",
  students = "students"
}

export const MeetingAudienceLabels: {[audience in MeetingAudience]: string} = {
  all: 'כולם',
  schoolStudents: 'תלמידים',
  youthMovement: 'תנועות נוער',
  militaryPreparation: 'מכינות',
  soldiers: 'חיילים',
  students: 'סטודנטים'
}
