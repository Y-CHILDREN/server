import { Request, Response } from 'express';
import { TripEventService } from '../../domain/services/tripEventService';

import { TripEventDto } from '../../data/dtos/event/tripEventDto';
import { TripEventConverter } from '../../data/converters/tripEventConverter';

export class TripEventController {
  constructor(private readonly tripEventService: TripEventService) {}

  // 이벤트 생성
  createTripEvent = async (req: Request, res: Response) => {
    try {
      // service 갖고오는 로직이 이게 맞나? 왜 this.tripEventService는 안됨?
      const tripEventService = req.app.get(
        'tripEventService',
      ) as TripEventService;

      const tripEventDto: TripEventDto = req.body; // DTO 사용
      const tripEvent = TripEventConverter.fromDto(tripEventDto); // DTO를 엔티티로 변환
      const createdTripEvent =
        await tripEventService.createTripEvent(tripEvent);
      res.status(201).json(TripEventConverter.toDto(createdTripEvent)); // 엔티티를 DTO로 변환하여 응답
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  // 이벤트 업데이트
  updateTripEvent = async (req: Request, res: Response) => {
    try {
      const tripEventService = req.app.get(
        'tripEventService',
      ) as TripEventService;
      const tripEventDto: TripEventDto = req.body; // DTO 사용
      const tripEvent = TripEventConverter.fromDto(tripEventDto); // DTO를 엔티티로 변환
      const updatedTripEvent =
        await tripEventService.updateTripEvent(tripEvent);
      res.status(200).json(TripEventConverter.toDto(updatedTripEvent)); // 엔티티를 DTO로 변환하여 응답
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  // event_id로 event 단일 조회
  getTripEventById = async (req: Request, res: Response) => {
    try {
      const tripEventService = req.app.get(
        'tripEventService',
      ) as TripEventService;
      const event_id = parseInt(req.params.event_id);
      const tripEvent = await tripEventService.getTripEventById(event_id);
      res.status(200).json(TripEventConverter.toDto(tripEvent));
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  };

  // event_id로 event 단일 삭제
  deleteTripEventById = async (req: Request, res: Response) => {
    try {
      const tripEventService = req.app.get(
        'tripEventService',
      ) as TripEventService;
      const event_id = parseInt(req.params.event_id);
      await tripEventService.deleteTripEventById(event_id);
      res.status(204).send();
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  };

  // trip_id로 event 모두 조회
  getTripEventsByTripId = async (req: Request, res: Response) => {
    try {
      const tripEventService = req.app.get(
        'tripEventService',
      ) as TripEventService;
      const trip_id = parseInt(req.params.trip_id);
      const tripEvents = await tripEventService.getTripEventsByTripId(trip_id);
      res.status(200).json(tripEvents?.map(TripEventConverter.toDto));
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  };
}
