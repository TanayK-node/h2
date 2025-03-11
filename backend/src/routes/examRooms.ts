import express from 'express';
import {
  getExamRooms,
  createExamRoom,
  updateExamRoom,
  deleteExamRoom,
  getRoomAvailability
} from '../controllers/examRoomController';

const router = express.Router();

router.get('/', getExamRooms);
router.post('/', createExamRoom);
router.get('/:id/availability', getRoomAvailability);
router.put('/:id', updateExamRoom);
router.delete('/:id', deleteExamRoom);

export default router;  