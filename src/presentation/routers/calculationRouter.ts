import { Router } from 'express';

import {
  getNumber,
  minusOne,
  plusOne,
} from '../controllers/calculationController';

const calculationRouter = Router();

calculationRouter.get('/', getNumber);
calculationRouter.post('/', plusOne);
calculationRouter.delete('/', minusOne);

export { calculationRouter };
