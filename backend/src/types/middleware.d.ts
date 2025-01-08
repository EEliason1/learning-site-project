import { UserPayload } from './auth';

declare module 'express' {
  interface Request {
    user?: UserPayload;
  }
}
