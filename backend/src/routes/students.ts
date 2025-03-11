import express from 'express';
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent
} from '../controllers/studentController';

const router = express.Router();

router.get('/', getStudents);
router.post('/', createStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

export default router;