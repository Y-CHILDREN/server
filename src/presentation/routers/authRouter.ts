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

authRouter.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie('connect.sid');
      res.redirect('/');
    });
  });
});

authRouter.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ message: '로그인된 유저가 있습니다.', user: req.user });
  } else {
    res.status(401).json({ message: '로그인된 유저가 없습니다.' });
  }
});

export default authRouter;
