import express from 'express';
import { CalculationService } from './domain/services/calculationService';
import { InMemoryCalculationRepositoryImpl } from './data/repositoryImpls/inMemoryCalculationRepositoryImpl';
import { userDataLocalRepository } from './data/repositoryImpls/localUserRepositoryImpl';
import { UserService } from './domain/services/userService';
import { TripScheduleService } from './domain/services/tripScheduleService';
import { InMemoryUserRepositoryImpl } from './data/repositoryImpls/inMemoryUserRepositoryImpl';
import { InMemoryTripScheduleRepositoryImpl } from './data/repositoryImpls/inMemoryTripScheduleRepositoryImpl';

export function di(app: ReturnType<typeof express>) {
  const calculationRepository = new InMemoryCalculationRepositoryImpl();
  const calculationService = new CalculationService(calculationRepository);
  app.set('calculationService', calculationService);

  // User
  const userRepository = userDataLocalRepository();
  const userService = UserService(userRepository);
  app.set('userService', userService);

  // tripSchedule
  const tripScheduleRepository = new InMemoryTripScheduleRepositoryImpl();
  const userRepositoryDummy = new InMemoryUserRepositoryImpl();
  const tripScheduleService = new TripScheduleService(
    tripScheduleRepository,
    userRepositoryDummy,
  );
  app.set('tripScheduleService', tripScheduleService);
}
