import express from 'express';

import {
  createRoom,
  getAllRooms,
  getRoom,
  updateRoom,
  deleteRoom
} from '../controllers/room';
import reviewRoute from './review';
import bookingRoute from './booking';

const router = express.Router();

router.use('/:roomId/review', reviewRoute);
router.use('/:roomId/booking', bookingRoute);

router.post('/', createRoom);
router.get('/', getAllRooms);
router.get('/:id', getRoom);
router.put('/:id', updateRoom);
router.delete('/:id', deleteRoom);

export default router;
