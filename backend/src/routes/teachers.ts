import express from 'express';
import {
  getTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher
} from '../controllers/teacherController';

const router = express.Router();

router.get('/', getTeachers);
router.post('/', createTeacher);
router.put('/:id', updateTeacher);
router.delete('/:id', deleteTeacher);

export default router;