import express from 'express';
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
        access_token: string,
        refresh_token: string,
        profile: any,
        done: any
      ) => {
        console.log(profile);
        console.log(`accessToken : ${access_token}`);
        console.log(`refreshToken :  ${refresh_token}`);
        try {
          const data = profile._json;
          let user = findUserByEmail(data.kakao_account.email || '');
          if (!user) {
            const newUser = createUser({
              email: data.kakao_account.email || '',
              user_image: data.properties.profile_image || '',
              nickname: data.properties.nickname || '',
              access_token: access_token,
              refresh_token: refresh_token,
              tripHistory: [],
            });
            return done(null, newUser);
          }
          updateTokens(
            data.kakao_account.email || '',
            access_token,
            refresh_token
          );
          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
  passport.serializeUser((user: any, done: any) => {
    done(null, user.email);
  });

  passport.deserializeUser((email: string, done: any) => {
    const user = findUserByEmail(email);
    if (user) {
      done(null, user);
    } else {
      done(new Error('유저를 찾을수 없습니다'), null);
    }
  });
};

export default configuresKakaoPassport;
