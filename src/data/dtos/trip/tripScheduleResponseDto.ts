// Server -> Client
export interface TripScheduleResponseDto {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  members: string[];
}
