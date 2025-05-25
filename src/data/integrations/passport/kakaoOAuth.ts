import express from 'express';
import { Strategy as KakaoStrategy } from 'passport-kakao';
import { UserRepository } from '../../../domain/repositories/userRepository';

const app = express();

const configuresKakaoPassport = (
  passport: any,
  userRepository: UserRepository,
) => {
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
        done: any,
      ) => {
        console.log(profile);
        console.log(`accessToken : ${access_token}`);
        console.log(`refreshToken :  ${refresh_token}`);
        try {
          const data = profile._json;

          const email = data.kakao_account.email || '';
          const provider = profile.provider;

          let user = await userRepository.findUserByEmailAndProvider(
            email,
            provider,
          );

          if (!user) {
            const existingUser = await userRepository.findUserByEmail(email);

            if (existingUser) {
              console.log(
                `이미 가입된 이메일입니다. 가입된 플랫폼: ${existingUser.provider}`,
              );
              return done(null, false);
            }
            const newUser = await userRepository.createUser({
              provider: profile.provider,
              email: email,
              user_image: data.properties.profile_image || '',
              nickname: data.properties.nickname || '',
              user_memo: '',
              access_token: access_token,
              refresh_token: refresh_token,
              created_at: new Date(),
            });
            return done(null, newUser);
          }

          await userRepository.updateTokens(
            data.kakao_account.email || '',
            access_token,
            refresh_token,
          );
          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      },
    ),
  );
  passport.serializeUser((user: any, done: any) => {
    done(null, user.email);
  });

  passport.deserializeUser((email: string, done: any) => {
    const user = userRepository.findUserByEmail(email);
    try {
      if (user) {
        done(null, user);
      } else {
        done(new Error('유저를 찾을수 없습니다'), null);
      }
    } catch (error) {
      done(error, null);
    }
  });
};

export default configuresKakaoPassport;
