import { Router } from 'express';
import passport from 'passport';
import { User } from '../../../domain/models/user';

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
    if (user) {
      res.redirect(
        `http://y-children.s3-website.ap-northeast-2.amazonaws.com?token=${user.access_token}&user=${encodeURIComponent(
          JSON.stringify(user),
        )}`,
      );
    } else {
      res.redirect('/');
    }
  },
);

export default googleRouter;
