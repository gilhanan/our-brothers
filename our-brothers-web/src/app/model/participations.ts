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
  guidance: BereavedGuidance;
  notes: string;
}

export interface BereavedGuidance {
  answered: boolean;
  emotional: BereavedGuidanceRubric;
  technical: BereavedGuidanceRubric;
}

export interface BereavedGuidanceRubric {
  interested: boolean;
  cities?: string[];
}
