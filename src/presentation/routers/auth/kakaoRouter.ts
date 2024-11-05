import dotenv from 'dotenv';
import { Router } from 'express';
import passport from 'passport';
import { User } from '../../../domain/models/user';

dotenv.config();

const env = process.env.NODE_ENV || 'local';

dotenv.config({
  path: `.env.${env}`,
});

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
    const user = req.user as User;
    const redirectUrlBase =
      process.env.REDIRECT_URL_BASE || 'http://localhost:5173';

    if (user) {
      res.redirect(
        `${redirectUrlBase}/login?token=${user.access_token}&user=${encodeURIComponent(
          JSON.stringify(user),
        )}`,
      );
    } else {
      res.redirect('/');
    }
  },
);

export default kakaoRouter;
