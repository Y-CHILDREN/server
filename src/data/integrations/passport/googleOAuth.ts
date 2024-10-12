import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import {
  createUser,
  findUserByEmail,
  updateTokens,
  findUserById,
} from '../../../domain/repositories/userModel';

const configureGooglePassport = (passport: any) => {
  const googleStrategy = new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.GOOGLE_REDIRECT_URI as string,
      scope: ['profile', 'email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log('Profile:', profile);
      console.log('Access Token:', accessToken);
      console.log('Refresh Token:', refreshToken); // Refresh Token 확인

      try {
        const data = profile._json;
        let user = findUserByEmail(data.email || '');

        if (!user) {
          const newUser = createUser({
            email: data.email || '',
            user_image: data.picture || '',
            profile: data.name || '',
            accessToken: accessToken,
            refreshToken: refreshToken,
          });
          return done(null, newUser);
        }

        updateTokens(data.email || '', accessToken, refreshToken);
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  );

  googleStrategy.authorizationParams = () => {
    return {
      access_type: 'offline',
      prompt: 'consent',
    };
  };

  passport.use(googleStrategy);

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

export default configureGooglePassport;