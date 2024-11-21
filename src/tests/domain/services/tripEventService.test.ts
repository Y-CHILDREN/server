import { beforeEach, describe, expect, it, vi } from 'vitest';

import { TripEventRepository } from '../../../domain/repositories/tripEventRepository.js';
import { TripEventService } from '../../../domain/services/tripEventService.js';
import { TripEvent } from '../../../domain/entities/tripEvent.js';

describe('tripEventService', () => {
  let tripEventRepository: TripEventRepository;
  let tripEventService: TripEventService;
  let mockData: Omit<TripEvent, 'event_id'>;

  // It 블록 실행전에 실행되는 코드들
  // 이러면 매번 새로운 상태에서 독립적으로 테스팅이 가능하다.
  beforeEach(() => {
    tripEventRepository = {
      // mock function 생성
      createTripEvent: vi.fn(),
      updateTripEvent: vi.fn(),
      getTripEventById: vi.fn(),
      deleteTripEventById: vi.fn(),
      getTripEventsByTripId: vi.fn(),
    };

    tripEventService = new TripEventService(tripEventRepository);

    mockData = {
      trip_id: 1,
      event_name: '여행 이벤트',
      location: '서울',
      start_date: new Date('2024-01-01'),
      end_date: new Date('2024-01-05'),
      cost: [
        {
          category: '식사',
          value: 30000,
        },
        {
          category: '교통',
          value: 15000,
        },
      ],
    };
  });

  it('createTripSchedule should create a trip event', async () => {
    // createTripEvent 함수를 모의 함수로 바꾸고 예측되는 값이 mockResolvedValue이다.
    vi.spyOn(tripEventRepository, 'createTripEvent').mockResolvedValue({
      ...mockData,
      event_id: 1,
    });

    const result = await tripEventService.createTripEvent(mockData);
    expect(result).toEqual({ ...mockData, event_id: 1 });
    expect(tripEventRepository.createTripEvent).toHaveBeenCalledWith(mockData);
  });

  it('updateTripSchedule should update a trip event', async () => {
    const updatedData: TripEvent = { ...mockData, event_id: 1 };
    vi.spyOn(tripEventRepository, 'updateTripEvent').mockResolvedValue(
      updatedData,
    );

    const result = await tripEventService.updateTripEvent(updatedData);
    expect(result).toEqual(updatedData);
    expect(tripEventRepository.updateTripEvent).toHaveBeenCalledWith(
      updatedData,
    );
  });

  it('getTripEventById should return a trip event by event_id', async () => {
    const event_id = 1;
    vi.spyOn(tripEventRepository, 'getTripEventById').mockResolvedValue({
      ...mockData,
      event_id,
    });

    const result = await tripEventService.getTripEventById(event_id);
    expect(result).toEqual({ ...mockData, event_id });
    expect(tripEventRepository.getTripEventById).toHaveBeenCalledWith(event_id);
  });

  it('deleteTripEventById should delete a trip event by event_id', async () => {
    const event_id = 1;
    vi.spyOn(tripEventRepository, 'deleteTripEventById').mockResolvedValue(
      true,
    );

    const result = await tripEventService.deleteTripEventById(event_id);
    expect(result).toBe(true);
    expect(tripEventRepository.deleteTripEventById).toHaveBeenCalledWith(
      event_id,
    );
  });

  it('getTripEventsByTripId should return all trip events by trip_id', async () => {
    const trip_id = 1;
    vi.spyOn(tripEventRepository, 'getTripEventsByTripId').mockResolvedValue([
      { ...mockData, event_id: 1 },
    ]);

    const result = await tripEventService.getTripEventsByTripId(trip_id);
    expect(result).toEqual([{ ...mockData, event_id: 1 }]);
    expect(tripEventRepository.getTripEventsByTripId).toHaveBeenCalledWith(
      trip_id,
    );
  });

  it('createTripSchedule should throw error for invalid date range', async () => {
    const invalidData = {
      ...mockData,
      start_date: new Date('2024-01-06'),
      end_date: new Date('2024-01-05'),
    };

    await expect(tripEventService.createTripEvent(invalidData)).rejects.toThrow(
      '잘못된 날짜 범위: 시작일은 마감일보다 앞서야 합니다.',
    );
  });

  it('createTripSchedule should throw error for missing input', async () => {
    const invalidData = { ...mockData, event_name: '' };

    await expect(tripEventService.createTripEvent(invalidData)).rejects.toThrow(
      '모든 입력값에 올바른 값을 입력해주세요',
    );
  });
});
