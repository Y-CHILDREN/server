import { Router } from 'express';

import { pingRouter } from './pingRouter';

const rootRouter = Router();

rootRouter.use('/ping', pingRouter);

export { rootRouter };
