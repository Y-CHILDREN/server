import passport from 'passport';
import session from 'express-session';
import { Express } from 'express';
import configureGooglePassport from './googleOAuth';
import configuresNaverPassport from './naverOAuth';
import configuresKakaoPassport from './kakaoOAuth';
import { userDataLocalRepository } from '../../repositoryImpls/localUserRepositoryImpl';

const userRepository = userDataLocalRepository();

function initPassport(app: Express) {
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'your-secrest-key',
      resave: false,
      saveUninitialized: true,
      rolling: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1일
        secure: process.env.NODE_ENV === 'production',
      },
    }),
  );
  configureGooglePassport(passport, userRepository);
  configuresNaverPassport(passport, userRepository);
  configuresKakaoPassport(passport, userRepository);
}

export default initPassport;
