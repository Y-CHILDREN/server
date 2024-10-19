import { Router } from 'express';
import passport from 'passport';
import { User } from '../../../domain/models/user';


const naverRouter = Router();

naverRouter.get(
  '/',
  passport.authenticate('naver', { scope: ['profile', 'email'] }),
);

naverRouter.get(
  '/callback',
  passport.authenticate('naver', { failureRedirect: '/' }),
  (req, res) => {
    const user = req.user as User;
    if (user) {
      res.redirect(
        `http://y-children.s3-website.ap-northeast-2.amazonaws.com/auth/naver?token=${user.access_token}&user=${encodeURIComponent(
            JSON.stringify(user)
          )}`
        );
    } else {
      res.redirect('/');
    }
  },
);

export default naverRouter;
