import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import cors from 'cors';
import passport from 'passport';
import path from 'path';

import initPassport from './data/integrations/passport/initPassport';
import { rootRouter } from './presentation/routers';
import { di } from './di';

const app = express();

di(app);

//적용 env 체크
const env = process.env.NODE_ENV || 'local';
dotenv.config({
  path: `.env.${env}`,
});
const redirectUrlBase = process.env.REDIRECT_URL_BASE;

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'http://y-children.s3-website.ap-northeast-2.amazonaws.com',
        'http://localhost:5173',
        'http://codingcanvas.store',
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        // 동적으로 출처 확인.
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }),
);

app.set('port', process.env.PORT);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
app.use(
  session({
    secret: 'defaultSecret',
    resave: false,
    saveUninitialized: false,
  }),
);

initPassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/', rootRouter);

app.listen(app.get('port'), async () => {
  console.log(`Server is running on port ${app.get('port')}`);
  console.log(`Current Environment: ${env}`);
  console.log(`Redirect URL Base: ${redirectUrlBase}`);
});
