import express from 'express';
import dotenv from 'dotenv';
import { Request } from 'express';
import cors from 'cors';
import passport from 'passport';
import googleRouter from './routes/googleRouter';
import userRouter from './routes/userRouter';
import configurePassprot from './config/auth/googleOAuth';

const app = express();

dotenv.config();

app.set('port', process.env.PORT);

app.use(cors<Request>());

app.use(passport.initialize());

configurePassprot(passport);

app.use('/', googleRouter);

app.use('/', userRouter);

app.listen(app.get('port'), async () => {
  console.log(`Hello, world!`);
});
