import { Router } from 'express';
import passport from 'passport';
import { User } from '../../../domain/models/user';

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
    if (user) {
      res.redirect(
        `http://y-children.s3-website.ap-northeast-2.amazonaws.com/auth/kakao?token=${user.access_token}&user=${encodeURIComponent(
            JSON.stringify(user)
          )}`
        );
    } else {
      res.redirect('/');
    }
  }
);

export default kakaoRouter;
