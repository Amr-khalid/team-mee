
export type Role = 'Tank' | 'Damage' | 'Support' | 'Captain' | 'Specialist' | 'Recruit' | 'مدرع' | 'مهاجم' | 'دعم' | 'قائد' | 'متخصص' | 'مستجد';

export interface Member {
  id: string;
  name: string;
  role: Role;
  level: number;
}

export interface Team {
  id: string;
  name: string;
  members: Member[];
  score: number;
}

export enum GenerationMode {
  RANDOM = 'RANDOM',
  BALANCED = 'BALANCED',
  LEADER = 'LEADER'
}

export interface Addons {
  timer: boolean;
  sounds: boolean;
  scoring: boolean;
  highlightWinner: boolean;
  statistics: boolean;
}
