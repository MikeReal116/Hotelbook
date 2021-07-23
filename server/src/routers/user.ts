import express from 'express';

import {
  signup,
  login,
  forgotPassword,
  resetPassword
} from '../controllers/user';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotpassword', forgotPassword);
router.patch('/resetpassword/:id/:token', resetPassword);

export default router;
