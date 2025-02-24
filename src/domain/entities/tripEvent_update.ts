interface TripEvent {
  id: number;
  tripSchedule_id: number;
  event_name: string;
  location: string;
  start_date: Date;
  end_date: Date;
  costs: Cost[];
}

interface Cost {
  id: number;
  category: string;
  value: number;
  tripEvent_id: number;
}

const validateTripEvent = (event: TripEvent): boolean => {
  if (event.start_date > event.end_date) {
    return false;
  }
  return true;
};

export { TripEvent, validateTripEvent, Cost };
