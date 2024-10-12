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

authRouter.get('/auth/logout', (req, res, next) => {
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

authRouter.get('/auth/profile', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ message: '로그인된 유저가 있습니다.', user: req.user });
  } else {
    res.status(401).json({ message: '로그인된 유저가 없습니다.' });
  }
});

export default authRouter;
