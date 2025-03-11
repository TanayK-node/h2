import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Teacher } from '../entities/Teacher';

export const getTeachers = async (req: Request, res: Response) => {
  try {
    const teacherRepository = getRepository(Teacher);
    const teachers = await teacherRepository.find();
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createTeacher = async (req: Request, res: Response) => {
  try {
    const teacherRepository = getRepository(Teacher);
    const newTeacher = teacherRepository.create({
      ...req.body,
      subjects: req.body.subjects.split(',').map((s: string) => s.trim())
    });
    
    const savedTeacher = await teacherRepository.save(newTeacher);
    res.status(201).json(savedTeacher);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateTeacher = async (req: Request, res: Response) => {
  try {
    const teacherRepository = getRepository(Teacher);
    const teacher = await teacherRepository.findOne(req.params.id);
    
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    const updates = {
      ...req.body,
      subjects: req.body.subjects ? 
        req.body.subjects.split(',').map((s: string) => s.trim()) : 
        teacher.subjects
    };

    teacherRepository.merge(teacher, updates);
    const updatedTeacher = await teacherRepository.save(teacher);
    res.json(updatedTeacher);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteTeacher = async (req: Request, res: Response) => {
  try {
    const teacherRepository = getRepository(Teacher);
    const result = await teacherRepository.delete(req.params.id);
    
    if (result.affected === 0) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    
    res.json({ message: 'Teacher deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};