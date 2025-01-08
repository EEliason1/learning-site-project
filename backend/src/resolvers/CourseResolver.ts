import { ValidationError, ForbiddenError } from '../errors/CustomErrors';
import Course from '../models/Course';
import User from '../models/User';

export const courseResolvers = {
  Query: {
    course: async (_: any, { id }: { id: string }) => {
      const foundCourse = await Course.findById(id).populate('instructor');
      if (!foundCourse) {
        throw new ValidationError('Course not found', { id });
      }
      return foundCourse;
    },
    allCourses: async () => {
      return Course.find().populate('instructor');
    },
  },
  Mutation: {
    createCourse: async (_: any, { title, description, instructorId }: any, context: any) => {
      if (!context.user || context.user.role !== 'Instructor') {
        throw new ForbiddenError('Only instructors can create courses');
      }

      const instructor = await User.findById(instructorId);
      if (!instructor) {
        throw new ValidationError('Instructor not found', { instructorId });
      }

      const newCourse = new Course({ title, description, instructor });
      return newCourse.save();
    },
    deleteCourse: async (_: any, { id }: { id: string }, context: any) => {
      if (!context.user || context.user.role !== 'Instructor') {
        throw new ForbiddenError('Only instructors can delete courses');
      }

      const result = await Course.findByIdAndDelete(id);
      if (!result) {
        throw new ValidationError('Course not found', { id });
      }

      return true;
    },
  },
};
