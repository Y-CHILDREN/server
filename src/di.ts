import express from 'express';
import { CalculationService } from './domain/services/calculationService';
import { InMemoryCalculationRepositoryImpl } from './data/repositoryImpls/inMemoryCalculationRepositoryImpl';
import { TripScheduleService } from './domain/services/tripScheduleService';
import { InMemoryUserRepositoryImpl } from './data/repositoryImpls/inMemoryUserRepositoryImpl';
import { InMemoryTripScheduleRepositoryImpl } from './data/repositoryImpls/inMemoryTripScheduleRepositoryImpl';

export function di(app: ReturnType<typeof express>) {
  const calculationRepository = new InMemoryCalculationRepositoryImpl();
  const calculationService = new CalculationService(calculationRepository);
  app.set('calculationService', calculationService);

  // tripSchedule
  const tripScheduleRepository = new InMemoryTripScheduleRepositoryImpl();
  const userRepository = new InMemoryUserRepositoryImpl();
  const tripScheduleService = new TripScheduleService(
    tripScheduleRepository,
    userRepository,
  );
  app.set('tripScheduleService', tripScheduleService);
}
