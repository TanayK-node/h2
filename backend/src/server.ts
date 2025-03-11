// src/server.ts
import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import cors from 'cors';
import dotenv from 'dotenv';
import studentRoutes from './routes/students';  // Remove .js extension
import teacherRoutes from './routes/teachers';
import examRoutes from './routes/exams';
import examRoomRoutes from './routes/examRooms';
import authRoutes from './routes/auth';
import logger from './utils/logger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/exam-rooms', examRoomRoutes);

// Database connection
createConnection().then(() => {
  logger.info('Connected to PostgreSQL');
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
}).catch(error => logger.error('Database connection error:', error));