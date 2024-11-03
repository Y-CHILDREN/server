import express from 'express';
import session from 'express-session';
import { Request } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import passport from 'passport';
import path from 'path';

import initPassport from './data/integrations/passport/initPassport';
import { rootRouter } from './presentation/routers';
import { di } from './di';

const app = express();

di(app);
dotenv.config();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);

app.set('port', process.env.PORT);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
app.use(cors<Request>());
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

app.use(cors<Request>());
app.listen(app.get('port'), async () => {
  console.log(`Server is running on port ${app.get('port')}`);
});
