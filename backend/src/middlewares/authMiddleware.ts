import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticationError, ForbiddenError } from '../errors/CustomErrors';
import { UserPayload } from '../types/auth';

interface CustomRequest extends Request {
  user?: UserPayload;
}

export const authenticate = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    throw new AuthenticationError('Authentication token is missing');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as UserPayload;
    req.user = decoded;
    next();
  } catch {
    throw new AuthenticationError('Invalid or expired token');
  }
};

export const authorize = (role: string) => (req: CustomRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    throw new AuthenticationError('Authentication required');
  }

  if (req.user.role !== role) {
    throw new ForbiddenError('Forbidden: insufficient permissions');
  }

  next();
};
