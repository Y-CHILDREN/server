import express from 'express';

import dotenv from 'dotenv';
import { Request } from 'express';
import cors from 'cors';
import passport from 'passport';
import googleRouter from './presentation/routes/googleRouter';
import userRouter from './presentation/routes/userRouter';
import configurePassprot from './domain/entities/auth/googleOAuth';
import session from 'express-session';

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

configurePassprot(passport);

app.use('/', googleRouter);

app.use('/', userRouter);

app.listen(app.get('port'), async () => {
  console.log(`Hello, world!`);
});
