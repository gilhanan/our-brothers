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

export enum BereavedStatus {
  done = 'done',
  inactive = 'inactive',
  waiting = 'waiting'
}

export interface BereavedGuidance {
  answered: boolean;
  general: string[];
}

export enum BereavedGuidanceGeneral {
  jerusalem = 'jerusalem',
  telAviv = 'telAviv',
  haifa = 'haifa'
}
