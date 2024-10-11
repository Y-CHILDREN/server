import { rejects } from 'assert';
import { Router } from 'express';
import passport from 'passport';

const googleRouter = Router();

// 로그인 라우터
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

// 구글 로그아웃 
googleRouter.get('/auth/google/logout', (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }

    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie('connect.sid');
      res.redirect('/');
    });
  });
});

export default googleRouter;
