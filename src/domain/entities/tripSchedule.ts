export interface TripSchedule {
  id: number; // auto_increase
  name: string;
  start_date: Date;
  end_date: Date;
  members: string[];
  created_by: string; // 사용자 이메일
}

// 날짜 유효성 검사.
export function validateTripDates(trip: Omit<TripSchedule, 'id'>): boolean {
  if (trip.start_date > trip.end_date) {
    console.log('The start date must be earlier than the end date.');
    return false;
  }
  return true;
}
