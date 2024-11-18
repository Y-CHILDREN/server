// src/presentation/routes/tripEventRoutes.ts
import { Router } from 'express';
import { TripEventController } from '../controllers/tripEventController';
import express from 'express';
const app = express();

const tripEventController = new TripEventController(
  app.get('tripEventService'),
);

// 라우터 생성
const eventRouter = Router();

// 이벤트 생성
eventRouter.post('/', tripEventController.createTripEvent);

// 이벤트 업데이트
eventRouter.put('/', tripEventController.updateTripEvent);

// event_id로 event 단일 조회
eventRouter.get('/:event_id', tripEventController.getTripEventById);

// event_id로 event 단일 삭제
eventRouter.delete('/:event_id', tripEventController.deleteTripEventById);

// trip_id로 event 모두 조회
eventRouter.get('/:trip_id', tripEventController.getTripEventsByTripId);

export { eventRouter };
