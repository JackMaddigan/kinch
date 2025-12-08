import type { EventId } from '@wca/helpers';

export interface KinchEntry {
  country: string;
  iso2: string;
  scores: Record<EventId, number>;
  overall: number;
  rank: number;
}
