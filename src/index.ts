import express from 'express';
import dotenv from 'dotenv';
import { Request } from 'express';
import cors from 'cors';
import { InMemoryUserRepositoryImpl } from './data/repositoryImpls/inMemoryUserRepositoryImpl';
import { InMemoryTripScheduleRepositoryImpl } from './data/repositoryImpls/inMemoryTripScheduleRepositoryImpl';
import { TripScheduleService } from './domain/services/tripScheduleService';
import tripScheduleRouter from './presentation/routers/tripScheduleRouter';

const app = express();

dotenv.config();

app.set('port', process.env.PORT);

app.use(cors<Request>());

const tripRepository = new InMemoryTripScheduleRepositoryImpl();
const userRepository = new InMemoryUserRepositoryImpl();
const tripScheduleService = new TripScheduleService(
  tripRepository,
  userRepository,
);

// D.I
app.set('tripScheduleService', tripScheduleService);

// Router
app.use('/api', tripScheduleRouter); // /api/trips, /api/trips/members, /api/trips/:id

app.listen(app.get('port'), async () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
