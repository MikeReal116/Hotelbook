import express from 'express';

import { getAllReviews, postReview } from '../controllers/review';

const router = express.Router({ mergeParams: true });

router.get('/', getAllReviews);
router.post('/', postReview);

export default router;
