import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ValidationError, AuthenticationError, InternalServerError } from '../errors/CustomErrors';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ValidationError('Email is already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to register user' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new AuthenticationError('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new AuthenticationError('Invalid email or password');
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return res.status(401).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to login' });
  }
};

export const getAllUsers = async (_: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    throw new InternalServerError('Failed to fetch users');
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new ValidationError('User not found');
    }
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};
