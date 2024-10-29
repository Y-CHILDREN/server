import { Router } from 'express';

import { pingRouter } from './pingRouter';
import { calculationRouter } from './calculationRouter';
import authRouter from './authRouter';
import tripScheduleRouter from './tripScheduleRouter';
import userRouter from './auth/userRouter';

const rootRouter = Router();

rootRouter.use('/ping', pingRouter);
rootRouter.use('/calculation', calculationRouter);
rootRouter.use('/auth', authRouter);
rootRouter.use('/users', userRouter);
rootRouter.use('/trips', tripScheduleRouter);

export { rootRouter };
