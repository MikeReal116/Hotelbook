import express from 'express';

import {
  createRoom,
  getAllRooms,
  getRoom,
  updateRoom,
  deleteRoom
} from '../controllers/room';

const router = express.Router();

router.post('/', createRoom);
router.get('/', getAllRooms);
router.get('/:id', getRoom);
router.put('/:id', updateRoom);
router.delete('/:id', deleteRoom);

export default router;
