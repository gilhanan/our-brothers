export interface ParticipateParticipation {
  meetings: UserParticipationMeeting[];
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
  hostId: string;
  id: string;
  title: string;
}

export type BereavedStatus = 'שובץ' | 'הושלם' | 'ממתין';

export interface BereavedGuidance {
  answered: boolean;
  general: BereavedGuidanceGeneralOptions;
}

export type BereavedGuidanceGeneralOptions = 'ירושלים' | 'תל אביב' | 'ראשון לציון';
