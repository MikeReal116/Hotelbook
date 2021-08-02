import express from 'express';

import {
  createBooking,
  getBooking,
  getFree,
  getBooked,
  stripeCheckout
} from '../controllers/booking';
import auth from '../middlewares/auth';

const router = express.Router({ mergeParams: true });

router.post('/', auth, createBooking);
router.post('/:roomId/checkout', auth, stripeCheckout);

router.get('/', auth, getBooking);
router.post('/:id/free', getFree);

router.get('/:id/booked', getBooked);
export default router;
