import { ValidationError, ForbiddenError } from '../errors/CustomErrors';
import User from '../models/User';

export const userResolvers = {
  Query: {
    user: async (_: any, { id }: { id: string }, context: any) => {
      if (!context.user) {
        throw new ValidationError('User must be authenticated to access this query');
      }

      const foundUser = await User.findById(id);
      if (!foundUser) {
        throw new ValidationError('User not found', { id });
      }
      return foundUser;
    },
    allUsers: async (_: any, __: any, context: any) => {
      if (!context.user || context.user.role !== 'Admin') {
        throw new ForbiddenError('You do not have permission to view all users');
      }

      return User.find();
    },
  },
  Mutation: {
    register: async (_: any, { name, email, password, role }: any) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new ValidationError('Email is already in use', { email });
      }

      const newUser = new User({ name, email, password, role });
      return newUser.save();
    },
    deleteUser: async (_: any, { id }: { id: string }, context: any) => {
      if (!context.user || context.user.role !== 'Admin') {
        throw new ForbiddenError('Only admins can delete users');
      }

      const result = await User.findByIdAndDelete(id);
      if (!result) {
        throw new ValidationError('User not found', { id });
      }

      return true;
    },
  },
};
