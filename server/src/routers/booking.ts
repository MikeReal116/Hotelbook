import express from 'express';

import { createBooking, getBooking } from '../controllers/booking';
import auth from '../middlewares/auth';

const router = express.Router({ mergeParams: true });

router.post('/', auth, createBooking);
router.get('/', auth, getBooking);

export default router;
