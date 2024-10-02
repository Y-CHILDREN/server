import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import { access } from 'fs/promises';

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: `${process.env.BASE_URL}/auth/google/callback`,
    },
    async (accessToken, refeshToken, profile, done) => {
      console.log('google profile : ', profile);
      try {
        const exUser = await User.findOne({
          where: { snsId: profile.id, provider: 'google' },
        });
        if (exUser) {
          done(null, exUser);
        } else {
          const newUser = await User.create({
            email: profile?.emails,
            nickname: profile.displayName,
            Id: profile.id,
            Image: profile.photos,
            provider: 'Google',
          });
          done(null, newUser);
        }
      } catch (error) {
        console.log(error);
        done(error);
      }
    }
  )
);
