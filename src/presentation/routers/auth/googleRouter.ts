import dotenv from 'dotenv';
import { Router } from 'express';
import passport from 'passport';
import { User } from '../../../domain/models/user';

const env = process.env.NODE_ENV || 'local';

dotenv.config({
  path: `.env.${env}`,
});

const googleRouter = Router();

googleRouter.get(
  '/',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

googleRouter.get(
  '/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    req.session.regenerate((err) => {
      if (err) {
        console.error('세션 복구 오류:', err);
        return res.redirect('/');
      }

      const user = req.user as User;
      const redirectUrlBase =
        process.env.REDIRECT_URL_BASE || 'http://localhost:5173';

      console.log('Callback - 유저 정보:', user);
      console.log('Callback - REDIRECT_URL_BASE:', redirectUrlBase);

      if (user) {
        const redirectUrl = `${redirectUrlBase}/login?token=${user.access_token}&user=${encodeURIComponent(
          JSON.stringify(user),
        )}`;

        // 최종 리다이렉트 URL 확인
        console.log('마지막 redirect URL:', redirectUrl);

        res.redirect(redirectUrl);
      } else {
        console.log('User object is null or undefined');
        res.redirect('/');
      }
    });
  },
);

export default googleRouter;
