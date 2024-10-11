import express from 'express';
import session from 'express-session';
import { Request } from 'express';

import dotenv from 'dotenv';
import cors from 'cors';

import initPassport from './data/integrations/passport/initPassport';
import authRouter from './presentation/routes/authRouter';

import passport from 'passport';

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

initPassport();

app.use(passport.initialize());
app.use(passport.session());

app.use('/', authRouter);

app.listen(app.get('port'), async () => {
  console.log(`Hello, world!`);
});
