import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Exam } from '../entities/Exam';
import { ExamRoom } from '../entities/ExamRoom';

export const scheduleExam = async (req: Request, res: Response) => {
  try {
    const examRepository = getRepository(Exam);
    const roomRepository = getRepository(ExamRoom);
    
    // Find selected rooms
    const rooms = await roomRepository.findByIds(req.body.roomIds);
    if (!rooms.length) {
      return res.status(400).json({ message: 'No valid rooms selected' });
    }

    // Create new exam
    const newExam = examRepository.create({
      courseName: req.body.courseName,
      date: new Date(req.body.date),
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      rooms
    });

    const savedExam = await examRepository.save(newExam);
    res.status(201).json(savedExam);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllExams = async (req: Request, res: Response) => {
  try {
    const examRepository = getRepository(Exam);
    const exams = await examRepository.find({ relations: ['rooms'] });
    res.json(exams);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getExamById = async (req: Request, res: Response) => {
  try {
    const examRepository = getRepository(Exam);
    const exam = await examRepository.findOne(req.params.id, {
      relations: ['rooms']
    });
    
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }
    res.json(exam);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateExam = async (req: Request, res: Response) => {
  try {
    const examRepository = getRepository(Exam);
    const roomRepository = getRepository(ExamRoom);
    
    const exam = await examRepository.findOne(req.params.id, {
      relations: ['rooms']
    });
    
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    // Update rooms if provided
    if (req.body.roomIds) {
      const rooms = await roomRepository.findByIds(req.body.roomIds);
      exam.rooms = rooms;
    }

    // Update other fields
    examRepository.merge(exam, req.body);
    const updatedExam = await examRepository.save(exam);
    res.json(updatedExam);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteExam = async (req: Request, res: Response) => {
  try {
    const examRepository = getRepository(Exam);
    const result = await examRepository.delete(req.params.id);
    
    if (result.affected === 0) {
      return res.status(404).json({ message: 'Exam not found' });
    }
    
    res.json({ message: 'Exam deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};