export interface TripSchedule {
  id: number; // auto_increase
  name: string;
  destination: string;
  start_date: Date;
  end_date: Date;
  created_by: string; // 생성한 유저 ID
}

// 날짜 유효성 검사.
export function validateTripDates(trip: Omit<TripSchedule, 'id'>): boolean {
  if (trip.start_date > trip.end_date) {
    console.log('The start date must be earlier than the end date.');
    return false;
  }
  return true;
}
