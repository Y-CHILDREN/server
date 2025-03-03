// Server -> Client
export interface TripScheduleResponseDto {
  id: string;
  title: string;
  destination: string;
  start_date: string;
  end_date: string;
  members: string[];
  created_by: string;
}
