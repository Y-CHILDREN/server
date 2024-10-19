import passport from 'passport';
import configureGooglePassport from './googleOAuth';
import configuresNaverPassport from './naverOAuth';
import configuresKakaoPassport from './kakaoOAuth';
import { userDataLocalRepository } from '../../repositoryImpls/localUserRepositoryImpl';

const userRepository = userDataLocalRepository();

function initPassport() {
  configureGooglePassport(passport, userRepository);
  configuresNaverPassport(passport, userRepository);
  configuresKakaoPassport(passport, userRepository);
}

export default initPassport;
