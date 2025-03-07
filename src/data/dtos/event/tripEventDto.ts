import { Cost } from '../../../domain/entities/tripEvent.js';

export interface TripEventDto {
  trip_id: number;
  event_id: number;
  event_name: string;
  location: string;
  start_date: Date;
  end_date: Date;
  cost: Cost[];
}
