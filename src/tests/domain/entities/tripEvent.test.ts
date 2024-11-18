import { describe, it, expect } from 'vitest';
import {
  TripEvent,
  validateTripEvent,
} from '../../../domain/entities/tripEvent.js';

describe('tripEvent Entity', () => {
  it('should return correctly', () => {
    const input: TripEvent = {
      trip_id: 1,
      event_id: 1,
      event_name: 'hi',
      location: '대전',
      start_date: new Date('2024-11-13'),
      end_date: new Date('2024-11-16'),
      cost: [
        {
          category: '식비',
          value: 350,
        },
        {
          category: '입장료',
          value: 1200,
        },
      ],
    };

    const result = validateTripEvent(input);
    expect(result).toEqual(true);
  });
});
