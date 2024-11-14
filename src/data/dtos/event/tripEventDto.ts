export interface TripEventDto {
  trip_id: number;
  event_id: number;
  event_name: string;
  location: string;
  start_date: string; // ISO 8601 형식의 문자열로 변환
  end_date: string; // ISO 8601 형식의 문자열로 변환
  cost: {
    category: string;
    value: number;
  }[];
}
