import { Router } from 'express';

import { getNumber } from '../controllers/calculationController';

const calculationRouter = Router();

calculationRouter.get('/', getNumber);

export { calculationRouter };
