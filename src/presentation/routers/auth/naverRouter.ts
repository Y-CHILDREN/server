import dotenv from 'dotenv';
import { Router } from 'express';
import passport from 'passport';
import { User } from '../../../domain/models/user';

const naverRouter = Router();

const env = process.env.NODE_ENV || 'local';

dotenv.config({
  path: `.env.${env}`,
});

dotenv.config();

naverRouter.get(
  '/',
  passport.authenticate('naver', { scope: ['profile', 'email'] }),
);

naverRouter.get(
  '/callback',
  passport.authenticate('naver', { failureRedirect: '/' }),
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

export default naverRouter;
