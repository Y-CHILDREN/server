import { Router } from 'express';

import { pingRouter } from './pingRouter';
import { calculationRouter } from './calculationRouter';

const rootRouter = Router();

rootRouter.use('/ping', pingRouter);
rootRouter.use('/calculation', calculationRouter);

export { rootRouter };
