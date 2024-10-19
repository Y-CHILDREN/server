import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { UserRepository } from '../../../domain/models/userRepository';

const configureGooglePassport = (
  passport: any,
  userRepository: UserRepository
) => {
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

        const email = data.email || '';
        const provider = profile.provider;

        let user = await userRepository.findUserByEmailAndProvider(
          email,
          provider
        );

        if (!user) {
          const existingUser = await userRepository.findUserByEmail(email);

          if (existingUser) {
            console.log(
              `이미 다른 플랫폼으로 가입된 이메일입니다. 가입된 플랫폼: ${existingUser.provider}`
            );
            return done(null, false);
          }
          const newUser = await userRepository.createUser({
            provider: provider,
            email: email,
            user_image: data.picture || '',
            nickname: data.name || '',
            user_memo: '',
            access_token: access_token,
            refresh_token: refresh_token,
            trip_history: [],
          });
          return done(null, newUser);
        }

        await userRepository.updateTokens(email, access_token, refresh_token);
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
    done(null, user.email);
  });

  passport.deserializeUser((email: string, done: any) => {
    try {
      const user = userRepository.findUserByEmail(email);
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

export default configureGooglePassport;
