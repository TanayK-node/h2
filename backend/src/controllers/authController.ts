import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { User } from '../entities/User';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { email } });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    res.json({ 
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const userRepository = getRepository(User);
    const newUser = userRepository.create(req.body);
    const result = await userRepository.save(newUser);
    
    const token = jwt.sign(
      { userId: result.id, role: result.role },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    res.status(201).json({ 
      token,
      user: {
        id: result.id,
        name: result.name,
        email: result.email,
        role: result.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};