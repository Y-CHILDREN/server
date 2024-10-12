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
    async (
      access_token: string,
      refresh_token: string,
      profile: any,
      done: any
    ) => {
      console.log('Profile:', profile);
      console.log('Access Token:', access_token);
      console.log('Refresh Token:', refresh_token); // Refresh Token 확인

      try {
        const data = profile._json;
        let user = findUserByEmail(data.email || '');

        if (!user) {
          const newUser = createUser({
            email: data.email || '',
            user_image: data.picture || '',
            profile: data.name || '',
            access_token: access_token,
            refresh_token: refresh_token,
          });
          return done(null, newUser);
        }

        updateTokens(data.email || '', access_token, refresh_token);
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
