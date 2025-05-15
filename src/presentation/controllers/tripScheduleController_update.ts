import { Request, Response } from 'express';

import { CreateTripDto } from '../../data/dtos/trip/createTripDto';
import {
  TripSchedule,
  TripScheduleWithMembers,
} from '../../domain/entities/tripSchedule_update';
import { TripScheduleResponseDto } from '../../data/dtos/trip/tripScheduleResponseDto_update';
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
        !req.body.title ||
        !req.body.start_date ||
        !req.body.end_date ||
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

  // 유저가 속한 여행 일정 목록 조회
  async getTripsByUserId(req: Request, res: Response) {
    try {
      const tripScheduleService = req.app.get(
        'tripScheduleService',
      ) as TripScheduleService;

      const userId = req.params.userId;

      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }

      const trips: TripSchedule[] =
        await tripScheduleService.getTripSchedulesByUserId(userId);

      // 등록된 여행이 없을 때
      if (trips.length === 0) {
        res.status(404).json({ message: 'No trips for this user' });
        return;
      }

      // TripSchedule + member(email) 포함해서 DTO로 변환
      const responseDtos = await Promise.all(
        trips.map(async (trip) => {
          const tripWithMembers =
            await tripScheduleService.getTripScheduleWithmembers(trip.id);
          return TripScheduleConverter.toResDto(tripWithMembers);
        }),
      );

      return res.status(200).json(responseDtos);
    } catch (error) {
      console.error('TripScheduleController getTripsByUserId error:', error);
      return res
        .status(500)
        .json({ message: 'Failed to get trip schedules for user' });
    }
  }

  // 단일 여행 데이터 조회
  async getTripById(req: Request, res: Response) {
    try {
      const tripScheduleService = req.app.get(
        'tripScheduleService',
      ) as TripScheduleService;

      const tripId = Number(req.params.tripId);
      if (!isNaN(tripId)) {
        return res.status(400).json({ message: 'Invalid trip ID' });
      }

      const tripWithMembers =
        await tripScheduleService.getTripScheduleWithmembers(tripId);
      const responseDto = TripScheduleConverter.toResDto(tripWithMembers);

      return res.status(200).json(responseDto);
    } catch (error) {
      console.error('TripScheduleController getTripById error:', error);
      return res.status(500).json({ message: 'Failed to get trip schedule' });
    }
  }
}
