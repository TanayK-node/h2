import express from 'express';
import {
  scheduleExam,
  getAllExams,
  updateExam,
  deleteExam,
  getExamById
} from '../controllers/examController';

const router = express.Router();

router.post('/', scheduleExam);
router.get('/', getAllExams);
router.get('/:id', getExamById);
router.put('/:id', updateExam);
router.delete('/:id', deleteExam);

export default router;