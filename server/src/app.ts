import express from 'express';
import dotenv from 'dotenv';

import roomRouter from './routers/room';
import errorHanldler from './middlewares/error';

dotenv.config({ path: '../.env' });
const app = express();

app.use(express.json());

app.use('/api/v1/rooms', roomRouter);

app.use(errorHanldler);

export default app;
