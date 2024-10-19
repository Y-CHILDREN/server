import { Router } from 'express';
import passport from 'passport';

const kakaoRouter = Router();

kakaoRouter.get(
  '/',
  passport.authenticate('kakao', {
    scope: ['profile_nickname', 'profile_image	', 'account_email	'],
  }),
);

kakaoRouter.get(
  '/callback',
  passport.authenticate('kakao', { failureRedirect: '/' }),
  (req, res) => {
    res.send('카카오 인증 성공');
  },
);

export default kakaoRouter;
