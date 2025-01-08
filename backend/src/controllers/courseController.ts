import { Request, Response } from 'express';
import Course from '../models/Course';
import { ValidationError, InternalServerError } from '../errors/CustomErrors';

export const createCourse = async (req: Request, res: Response) => {
  try {
    const { title, description, instructorId } = req.body;

    const course = await Course.create({ title, description, instructor: instructorId });
    res.status(201).json({ message: 'Course created successfully', course });
  } catch (error) {
    throw new InternalServerError('Failed to create course');
  }
};

export const getAllCourses = async (_: Request, res: Response) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    throw new InternalServerError('Failed to fetch courses');
  }
};

export const getCourseById = async (req: Request, res: Response) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      throw new ValidationError('Course not found');
    }
    res.status(200).json(course);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to fetch course' });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      throw new ValidationError('Course not found');
    }
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to delete course' });
  }
};
