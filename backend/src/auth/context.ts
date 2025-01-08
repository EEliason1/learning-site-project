import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { AuthenticationError } from '../errors/CustomErrors';
import { UserPayload } from '../types/auth';

export const getContext = async ({ req }: { req: Request }) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    throw new AuthenticationError('Authentication token is missing');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as UserPayload;
    return { user: decoded };
  } catch (err) {
    throw new AuthenticationError('Invalid or expired token');
  }
};
