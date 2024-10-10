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

export default authRouter;
