import passport from 'passport';
import configureGooglePassport from './googleOAuth';
import configuresNaverPassport from './naverOAuth';
import configuresKakaoPassport from './kakoOAuth';

function initPassport() {
  passport.initialize();
  passport.session();

  configureGooglePassport(passport);
  configuresNaverPassport(passport);
  configuresKakaoPassport(passport);
}

export default initPassport;
