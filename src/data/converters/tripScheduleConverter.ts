import { TripSchedule } from '../../domain/entities/tripSchedule';
import { CreateTripDto } from '../dtos/trip/createTripDto';
import { TripScheduleResponseDto } from '../dtos/trip/tripScheduleResponseDto';

export class TripScheduleConverter {
  static fromCreateTripDto(source: CreateTripDto): Omit<TripSchedule, 'id'> {
    return {
      name: source.title,
      destination: source.destination,
      start_date: new Date(source.start_date),
      end_date: new Date(source.end_date),
      members: source.members,
      created_by: source.created_by,
    };
  }

  static toResDto(tripSchedule: TripSchedule): TripScheduleResponseDto {
    return {
      id: tripSchedule.id,
      title: tripSchedule.name, // `name`-> `title`
      destination: tripSchedule.destination,
      start_date: tripSchedule.start_date.toISOString(), // Date -> ISO string
      end_date: tripSchedule.end_date.toISOString(),
      members: tripSchedule.members,
      created_by: tripSchedule.created_by,
    };
  }
}
