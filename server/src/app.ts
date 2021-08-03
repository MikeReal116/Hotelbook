import express from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import cors from 'cors';

import roomRouter from './routers/room';
import reviewRouter from './routers/review';
import userRouter from './routers/user';
import bookingRouter from './routers/booking';
import webhookRouter from './routers/webhook';
import errorHanldler from './middlewares/error';

const app = express();

app.use('/api/v1/checkout-webhook', webhookRouter);
app.use(cors());
app.use(express.json());

app.use('/api/v1/rooms', roomRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/bookings', bookingRouter);

app.use(errorHanldler);

export default app;
