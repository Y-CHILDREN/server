import express from 'express';

import { UserService } from './domain/services/userService';
import { PrismaTripScheduleRepositoryImpl } from './data/repositoryImpls/prismaTripScheduleRepositoryImpl';
import { TripScheduleService } from './domain/services/tripScheduleService';
import { TripEventService } from './domain/services/tripEventService';
import { PrismaUserRepositoryImpl } from './data/repositoryImpls/prismaUserRepositoryImpl';
import { PrismaTripEventRepositoryImpl } from './data/repositoryImpls/prismaTripEventRepositoryImple';

export function di(app: ReturnType<typeof express>) {
  // User
  const userRepository = new PrismaUserRepositoryImpl(); // class 형식으로 작성.
  const userService = UserService(userRepository); // 화살표 함수 형식으로 작성.
  app.set('userService', userService);

  // TripSchedule
  const tripScheduleRepository = new PrismaTripScheduleRepositoryImpl();
  const tripScheduleService = new TripScheduleService(tripScheduleRepository);
  app.set('tripScheduleService', tripScheduleService);

  // TripEvent
  const tripEventRepository = new PrismaTripEventRepositoryImpl();
  const tripEventService = new TripEventService(tripEventRepository);
  app.set('tripEventService', tripEventService);
}
