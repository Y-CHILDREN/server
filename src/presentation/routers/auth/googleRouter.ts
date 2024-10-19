import { Router } from 'express';
import passport from 'passport';

const googleRouter = Router();

// 로그인 라우터
googleRouter.get(
  '/',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

googleRouter.get(
  '/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.send('구글 인증 성공');
  },
);

export default googleRouter;
