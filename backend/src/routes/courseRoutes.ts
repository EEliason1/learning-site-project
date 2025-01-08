import express from 'express';
import {
  createCourse,
  getAllCourses,
  getCourseById,
  deleteCourse,
} from '../controllers/courseController';
import { authenticate, authorize } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', getAllCourses);
router.get('/:id', getCourseById);

router.post('/', authenticate, authorize('Instructor'), createCourse);
router.delete('/:id', authenticate, authorize('Instructor'), deleteCourse);

export default router;
