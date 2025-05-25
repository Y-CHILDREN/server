import {
  Strategy as NaverStrategy,
  Profile as NaverProfile,
} from 'passport-naver-v2';

import { UserRepository } from '../../../domain/repositories/userRepository';

const configuresNaverPassport = (
  passport: any,
  userRepository: UserRepository,
) => {
  passport.use(
    new NaverStrategy(
      {
        clientID: process.env.NAVER_CLIENT_ID,
        clientSecret: process.env.NAVER_CLIENT_SECRET,
        callbackURL: process.env.NAVER_REDIRECT_URI,
      },
      async (
        access_token: string,
        refresh_token: string,
        profile: NaverProfile,
        done: any,
      ) => {
        console.log(profile);
        console.log(`accessToken : ${access_token}`);
        console.log(`refreshToken :  ${refresh_token}`);
        try {
          // const data = profile._json;

          const email = profile.email || '';
          const provider = profile.provider || '';

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
              email: profile.email || '',
              user_image: profile.profileImage || '',
              nickname: profile.name || '',
              user_memo: '',
              access_token: access_token,
              refresh_token: refresh_token,
              created_at: new Date(),
            });
            return done(null, newUser);
          }

          userRepository.updateTokens(
            profile.email || '',
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

export default configuresNaverPassport;
