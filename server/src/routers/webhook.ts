import express from 'express';

import { listenCheckout } from '../controllers/booking';

const router = express.Router();

router.post('/', express.raw({ type: 'application/json' }), listenCheckout);

export default router;
