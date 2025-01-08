import { ValidationError, ForbiddenError } from '../errors/CustomErrors';
import Content from '../models/Content';
import Course from '../models/Course';

export const contentResolvers = {
  Query: {
    content: async (_: any, { id }: { id: string }) => {
      const foundContent = await Content.findById(id).populate('course');
      if (!foundContent) {
        throw new ValidationError('Content not found', { id });
      }
      return foundContent;
    },
    allContent: async () => {
      return Content.find().populate('course');
    },
  },
  Mutation: {
    createContent: async (_: any, { title, type, url, text, courseId }: any, context: any) => {
      if (!context.user || context.user.role !== 'Instructor') {
        throw new ForbiddenError('Only instructors can create content');
      }

      const course = await Course.findById(courseId);
      if (!course) {
        throw new ValidationError('Course not found', { courseId });
      }

      const newContent = new Content({ title, type, url, text, course });
      return newContent.save();
    },
    deleteContent: async (_: any, { id }: { id: string }, context: any) => {
      if (!context.user || context.user.role !== 'Instructor') {
        throw new ForbiddenError('Only instructors can delete content');
      }

      const result = await Content.findByIdAndDelete(id);
      if (!result) {
        throw new ValidationError('Content not found', { id });
      }

      return true;
    },
  },
};
