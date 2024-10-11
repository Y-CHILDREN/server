import express from 'express';
import passport from 'passport';
import { Strategy as KakaoStrategy } from 'passport-kakao';

import {
  createUser,
  findUserByEmail,
  updateTokens,
  findUserById,
} from '../../../domain/repositories/userModel';

const app = express();

const configuresKakaoPassport = (passport: any) => {
  app.use(passport.authenticate('kakao'));
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_CLIENT_ID as string,
        clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
        callbackURL: process.env.KAKAO_REDIRECT_URI as string,
      },
      async (
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: any
      ) => {
        console.log(profile);
        console.log(`accessToken : ${accessToken}`);
        console.log(`refreshToken :  ${refreshToken}`);
        try {
          const data = profile._json;
          let user = findUserById(profile.id || '');
          if (!user) {
            const newUser = createUser({
              email: profile.email || '',
              user_image: profile.profileImage || '',
              profile: profile.name || '',
              accessToken: accessToken,
              refreshToken: refreshToken,
            });
            return done(null, newUser);
          }
          updateTokens(profile.email || '', accessToken, refreshToken);
          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
  passport.serializeUser((user: any, done: any) => {
    done(null, user.id);
  });

  passport.deserializeUser((id: string, done: any) => {
    const user = findUserById(id);
    if (user) {
      done(null, user);
    } else {
      done(new Error('유저를 찾을수 없습니다'), null);
    }
  });
};

export default configuresKakaoPassport;
