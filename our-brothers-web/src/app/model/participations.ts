export interface ParticipateParticipation {
  events: Array<{
    event: string;
    accompanies: number;
  }>;
}

export interface HostParticipation {
  event: string;
}

export interface BereavedParticipation {
  events: Array<{
    event: string;
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
