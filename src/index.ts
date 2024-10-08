import express from 'express';
import dotenv from 'dotenv';
import { Request } from 'express';
import cors from 'cors';

import passport from 'passport';
import session from 'express-session';

import googleRouter from './presentation/routes/googleRouter';
import naverRouter from './presentation/routes/naverRouter';
import userRouter from './presentation/routes/userRouter';

import configureGooglePassport from './domain/entities/auth/googleOAuth';
import configuresNaverPassport from './domain/entities/auth/naverOAuth';

const app = express();

dotenv.config();

app.set('port', process.env.PORT);

app.use(cors<Request>());

app.use(
  session({
    secret: 'defaultSecret',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

configureGooglePassport(passport);
configuresNaverPassport(passport);

app.use('/', googleRouter);
app.use('/', naverRouter);
app.use('/', userRouter);

app.listen(app.get('port'), async () => {
  console.log(`Hello, world!`);
});
