import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import {
  createUser,
  findUserByEmail,
  updateTokens,
} from '../../domain/models/userModel';

const configurePassport = (passport: any) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: process.env.GOOGLE_REDIRECT_URI as string,
        scope: ['profile', 'email'],
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
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
    )
  );
};

export default configurePassport;
