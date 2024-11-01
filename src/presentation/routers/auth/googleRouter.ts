import dotenv from 'dotenv';
import { Router } from 'express';
import passport from 'passport';
import { User } from '../../../domain/models/user';

const env = process.env.NODE_ENV || 'local';

dotenv.config({
  path: `.env.${env}`,
});

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
    const user = req.user as User;
    const redirectUrlBase =
      process.env.REDIRECT_URL_BASE || 'http://localhost:5173';

    if (user) {
      res.redirect(
        `${redirectUrlBase}?token=${user.access_token}&user=${encodeURIComponent(
          JSON.stringify(user),
        )}`,
      );
    } else {
      res.redirect('/');
    }
  },
);

export default googleRouter;
