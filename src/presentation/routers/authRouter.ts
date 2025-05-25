import { Router } from 'express';

import googleRouter from './auth/googleRouter';
import naverRouter from './auth/naverRouter';
import kakaoRouter from './auth/kakaoRouter';
import userRouter from './auth/userRouter';

const authRouter = Router();

authRouter.use('/google', googleRouter);
authRouter.use('/naver', naverRouter);
authRouter.use('/kakao', kakaoRouter);
authRouter.use('/users', userRouter);

export default authRouter;
