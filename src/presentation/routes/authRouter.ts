import { Router } from 'express';
import googleRouter from './googleRouter';
import naverRouter from './naverRouter';
import kakaoRouter from './kakaoRouter';
import userRouter from './userRouter';

const authRouter = Router();

authRouter.use('/', googleRouter);
authRouter.use('/', naverRouter);
authRouter.use('/', kakaoRouter);
authRouter.use('/', userRouter);

authRouter.get('/auth/profile', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ message: 'You are authenticated', user: req.user });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

export default authRouter;
