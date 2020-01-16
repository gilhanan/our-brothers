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
  audience?: string[];
}

export interface MeetingAddress {
  latitude: number;
  longitude: number;
  formattedAddress: string;
  notes?: string;
}
