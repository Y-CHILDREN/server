import { Router } from 'express';
import passport from 'passport';

const naverRouter = Router();

naverRouter.get(
  '/auth/naver',
  passport.authenticate('naver', { scope: ['profile', 'email'] })
);

naverRouter.get(
  '/auth/naver/callback',
  passport.authenticate('naver', { failureRedirect: '/' }),
  (req, res) => {
    res.send('네이버 인증 성공');
  }
);

export default naverRouter;
