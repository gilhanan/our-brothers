export interface ParticipateParticipation {
  meetings: Array<{
    id: string;
    accompanies: number;
  }>;
}

export interface HostParticipation {
  meetings: Array<{
    id: string;
    title: string;
  }>;
}

export interface BereavedParticipation {
  meetings: Array<{
    id: string;
    title: string;
  }>;
  status: BereavedStatus;
  guidance: BereavedGuidance;
  notes: string;
}

export type BereavedStatus = 'שובץ' | 'הושלם' | 'ממתין';

export interface BereavedGuidance {
  answered: boolean;
  general: BereavedGuidanceGeneralOptions;
}

export type BereavedGuidanceGeneralOptions = 'ירושלים' | 'תל אביב' | 'ראשון לציון';
