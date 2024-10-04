import { Router } from 'express';
import { getAllUser } from '../domain/models/userModel';

const userRouter = Router();

userRouter.get('/users', (req, res) => {
  const users = getAllUser();
  res.json(users);
});

export default userRouter;
