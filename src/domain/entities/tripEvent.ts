interface Cost {
  category: string;
  value: number;
}

interface TripEvent {
  trip_id: number;
  event_id: number;
  event_name: string;
  location: string;
  start_date: Date;
  end_date: Date;
  cost: Cost[];
}

const validateTripEvent = (event: TripEvent): boolean => {
  if (event.start_date > event.end_date) {
    return false;
  }
  return true;
};

export { TripEvent, validateTripEvent, Cost };
