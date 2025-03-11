import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { ExamRoom } from '../entities/ExamRoom';
import { Exam } from '../entities/Exam';

export const getExamRooms = async (req: Request, res: Response) => {
  try {
    const examRoomRepository = getRepository(ExamRoom);
    const rooms = await examRoomRepository.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createExamRoom = async (req: Request, res: Response) => {
  try {
    const examRoomRepository = getRepository(ExamRoom);
    const newRoom = examRoomRepository.create(req.body);
    const savedRoom = await examRoomRepository.save(newRoom);
    res.status(201).json(savedRoom);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateExamRoom = async (req: Request, res: Response) => {
  try {
    const examRoomRepository = getRepository(ExamRoom);
    const room = await examRoomRepository.findOne(req.params.id);
    
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    examRoomRepository.merge(room, req.body);
    const updatedRoom = await examRoomRepository.save(room);
    res.json(updatedRoom);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteExamRoom = async (req: Request, res: Response) => {
  try {
    const examRoomRepository = getRepository(ExamRoom);
    const result = await examRoomRepository.delete(req.params.id);
    
    if (result.affected === 0) {
      return res.status(404).json({ message: 'Room not found' });
    }
    
    res.json({ message: 'Room deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getRoomAvailability = async (req: Request, res: Response) => {
  try {
    const examRepository = getRepository(Exam);
    const exams = await examRepository
      .createQueryBuilder('exam')
      .innerJoinAndSelect('exam.rooms', 'room')
      .where('room.id = :roomId', { roomId: req.params.id })
      .getMany();

    const schedule = exams.map(exam => ({
      id: exam.id,
      course: exam.courseName,
      date: exam.date,
      startTime: exam.startTime,
      endTime: exam.endTime
    }));

    res.json({ schedule });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};