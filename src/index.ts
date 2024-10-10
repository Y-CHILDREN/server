import express from 'express';
import dotenv from 'dotenv';
import { Request } from 'express';
import cors from 'cors';

import session from 'express-session';

import initPassport from './data/integrations/passport/initPassport';
import authRouter from './presentation/routes/authRouter';

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

app.use('/', authRouter);

app.listen(app.get('port'), async () => {
  console.log(`Hello, world!`);
});
