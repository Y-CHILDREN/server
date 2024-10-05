import { Router } from 'express';
import passport from 'passport';

const googleRouter = Router();

googleRouter.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

googleRouter.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.send('구글 인증 성공');
  }
);

export default googleRouter;
