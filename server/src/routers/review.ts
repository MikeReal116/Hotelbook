import express from 'express';

import auth from '../middlewares/auth';
import { getAllReviews, postReview } from '../controllers/review';

const router = express.Router({ mergeParams: true });

router.get('/', getAllReviews);
router.post('/', auth, postReview);

export default router;
