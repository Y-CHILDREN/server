export interface TripSchedule {
  id: number; // auto_increase
  name: string;
  start_date: Date;
  end_date: Date;
  members: string[];
}

// 날짜 유효성 검사.
export function validateTripDates(trip: {
  name: string;
  start_date: Date;
  end_date: Date;
  members: string[];
}): boolean {
  return trip.start_date < trip.end_date;
}
