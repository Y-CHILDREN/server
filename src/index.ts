import express from 'express';
import dotenv from 'dotenv';
import { Request } from 'express';
import cors from 'cors';

import { rootRouter } from './presentation/routers';

const app = express();

dotenv.config();

app.set('port', process.env.PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', rootRouter);

app.use(cors<Request>());
app.listen(app.get('port'), async () => {
  console.log(`Server is running on port ${app.get('port')}`);
});
