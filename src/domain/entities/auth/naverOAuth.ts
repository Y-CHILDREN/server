import passport from 'passport';
import {
  Strategy as NaverStrategy,
  Profile as NaverProfile,
} from 'passport-naver-v2';

import {
  createUser,
  findUserByEmail,
  updateTokens,
  findUserById,
} from '../userModel';

const configuresNaverPassport = (passport: any) => {
  passport.use(
    new NaverStrategy(
      {
        clientID: process.env.NAVER_CLIENT_ID,
        clientSecret: process.env.NAVER_CLIENT_SECRET,
        callbackURL: process.env.NAVER_REDIRECT_URI,
      },
      async (
        accessToken: string,
        refreshToken: string,
        profile: NaverProfile,
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

export default configuresNaverPassport;
