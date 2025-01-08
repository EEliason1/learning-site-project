import { userResolvers } from './UserResolver';
import { courseResolvers } from './CourseResolver';
import { contentResolvers } from './ContentResolver';

export const resolvers = [userResolvers, courseResolvers, contentResolvers];
