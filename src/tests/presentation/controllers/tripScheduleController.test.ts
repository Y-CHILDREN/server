import { vi } from 'vitest';

mockTripScheduleService = {
  createTripSchedule: vi.fn(),
  addMemberByEmail: vi.fn(),
  tripRepository: {
    findTripById(id: number): Promise<TripSchedule | null> {},
  },
};
