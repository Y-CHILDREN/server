import express from 'express';
import passport from 'passport';
import configureGooglePassport from './googleOAuth';
import configuresNaverPassport from './naverOAuth';
import configuresKakaoPassport from './kakoOAuth';

function initPassport() {
  configureGooglePassport(passport);
  configuresNaverPassport(passport);
  configuresKakaoPassport(passport);
}

export default initPassport;
