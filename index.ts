import express from 'express';
import dotenv from 'dotenv';
import { Request } from 'express';
import cors from 'cors';

const app = express();

dotenv.config();

app.set('port', process.env.PORT);

app.use(cors<Request>());
app.listen(app.get('port'), async () => {
  console.log('Hello, world!');
});
