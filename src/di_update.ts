import express from 'express';

import { UserService } from './domain/services/userService_update';
import { InMemoryTripScheduleRepositoryImpl } from './data/repositoryImpls/inMemoryTripScheduleRepositoryImpl';
import { TripScheduleService } from './domain/services/tripScheduleService';
import { userDataLocalRepository } from './data/repositoryImpls/localUserRepositoryImpl';
import { TripEventService } from './domain/services/tripEventService';

import { PrismaUserRepositoryImpl } from './data/repositoryImpls/prismaUserRepositoryImpl';
import { PrismaTripEventRepositoryImpl } from './data/repositoryImpls/prismaTripEventRepositoryImple';

export function di_update(app: ReturnType<typeof express>) {
  // User
  const userRepository = new PrismaUserRepositoryImpl(); // class 형식으로 작성.
  const userService = UserService(userRepository); // 화살표 함수 형식으로 작성.
  app.set('userService', userService);

  // TripSchedule
  const userRepo = userDataLocalRepository();
  const tripScheduleRepository = new InMemoryTripScheduleRepositoryImpl();
  const tripScheduleService = new TripScheduleService(
    tripScheduleRepository,
    userRepo,
  );
  app.set('tripScheduleService', tripScheduleService);

  // TripEvent
  const tripEventRepository = new PrismaTripEventRepositoryImpl();
  const tripEventService = new TripEventService(tripEventRepository);
  app.set('tripEventService', tripEventService);
}
