import { Router } from 'express';

import { pingController } from '../controllers/pingController';

const pingRouter = Router();

pingRouter.get('/', pingController);

export { pingRouter };
