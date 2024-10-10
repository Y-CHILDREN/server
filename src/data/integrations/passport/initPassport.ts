import passport from 'passport';
import configureGooglePassport from './googleOAuth';
import configuresNaverPassport from './naverOAuth';

function initPassport() {
  passport.initialize();
  passport.session();

  configureGooglePassport(passport);
  configuresNaverPassport(passport);
}

export default initPassport;
