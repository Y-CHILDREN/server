import { Router } from 'express';
import passport from 'passport';

const kakaoRouter = Router();

kakaoRouter.get(
  '/auth/kakao',
  passport.authenticate('kakao', { scope: ['profile', 'email'] })
);

kakaoRouter.get(
  '/auth/kakao/callback',
  passport.authenticate('kakao', { failureRedirect: '/' }),
  (req, res) => {
    res.send('네이버 인증 성공');
  }
);

export default kakaoRouter;
