import { Cost } from '../../../domain/entities/tripEvent.js';

export interface TripEventDto {
  trip_id: number;
  event_id: number;
  event_name: string;
  location: string;
  start_date: string;
  end_date: string;
  cost: Cost[];
}
