import passport from 'passport';
import {
  Strategy as KakaoStrategy,
  Profile as KakaoProfile,
} from 'passport-kakao';

import {
  createUser,
  findUserByEmail,
  updateTokens,
  findUserById,
} from '../../../domain/repositories/userModel';

const configuresKakaoPassport = (passport: any) => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_CLIENT_ID as string,
        callbackURL: process.env.KAKAO_REDIRECT_URI as string,
      },
      async (
        accessToken: string,
        refreshToken: string,
        profile: KakaoProfile,
        done: any
      ) => {
        console.log('Profile: ', profile); // 로그 확인

        try {
          const data = profile._json;
          let user = findUserById(profile.id || '');

          const userImage =
            profile.photos && profile.photos.length > 0
              ? profile.photos[0].value
              : '';

          if (!user) {
            const newUser = createUser({
              email: profile._json.kakao_account.email,
              // email: profile._json.kakao_account.email,
              user_image: userImage,
              profile: profile.displayName,
              accessToken: accessToken,
              refreshToken: refreshToken,
            });
            return done(null, newUser);
          }
          updateTokens(profile.id, accessToken, refreshToken);
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
