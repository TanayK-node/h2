import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Student } from '../entities/Student';

export const getStudents = async (req: Request, res: Response) => {
  try {
    const studentRepository = getRepository(Student);
    const students = await studentRepository.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createStudent = async (req: Request, res: Response) => {
  try {
    const studentRepository = getRepository(Student);
    const newStudent = studentRepository.create(req.body);
    const result = await studentRepository.save(newStudent);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const studentRepository = getRepository(Student);
    const student = await studentRepository.findOne(req.params.id);
    
    if (!student) return res.status(404).json({ message: 'Student not found' });

    studentRepository.merge(student, req.body);
    const result = await studentRepository.save(student);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const studentRepository = getRepository(Student);
    const result = await studentRepository.delete(req.params.id);
    
    if (result.affected === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};