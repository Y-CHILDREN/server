import { Request, Response } from 'express';

import { CreateTripDto } from '../../data/dtos/trip/createTripDto';
import { TripScheduleConverter } from '../../data/converters/tripScheduleConverter_update';

import { TripScheduleService } from '../../domain/services/tripScheduleService_update';

export class TripScheduleController {
  // create trip
  async createTrip(req: Request, res: Response) {
    try {
      const tripScheduleService = req.app.get(
        'tripScheduleService',
      ) as TripScheduleService;

      // req.body에서 CreateTripDto 타입의 데이터를 추출
      if (
        !req.body.name ||
        !req.body.startDate ||
        !req.body.endDate ||
        !req.body.created_by
      ) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const createTripDto: CreateTripDto = {
        ...req.body,
        members: [...new Set([req.body.created_by, ...req.body.members])], // 중복 제거
      };

      // TripSchedule 타입으로 변환
      const tripData = TripScheduleConverter.fromCreateTripDto(createTripDto);

      // service 호출하여 여행 일정 생성.
      const createdTrip =
        await tripScheduleService.createTripSchedule(tripData);

      return res.status(201).json(createdTrip);
    } catch (error) {
      console.error('TripScheduleController create error:', error);
      return res
        .status(500)
        .json({ message: 'Failed to create trip schedule' });
    }
  }
}
