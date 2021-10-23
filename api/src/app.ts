import express from 'express';
import connectToDatabase from './db';
import routes from './routes';

import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
// @ts-ignore
app.options('*', cors());

app.listen(3333, () => {
  console.info('*** server running at http://localhost:3333');

  routes(app);
  connectToDatabase();
});
