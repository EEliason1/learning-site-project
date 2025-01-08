import { Request, Response } from 'express';
import Content from '../models/Content';
import { ValidationError, InternalServerError } from '../errors/CustomErrors';

export const createContent = async (req: Request, res: Response) => {
  try {
    const { title, type, url, text, courseId } = req.body;

    const content = await Content.create({ title, type, url, text, course: courseId });
    res.status(201).json({ message: 'Content created successfully', content });
  } catch (error) {
    throw new InternalServerError('Failed to create content');
  }
};

export const getAllContent = async (_: Request, res: Response) => {
  try {
    const content = await Content.find();
    res.status(200).json(content);
  } catch (error) {
    throw new InternalServerError('Failed to fetch content');
  }
};

export const getContentById = async (req: Request, res: Response) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      throw new ValidationError('Content not found');
    }
    res.status(200).json(content);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to fetch content' });
  }
};

export const deleteContent = async (req: Request, res: Response) => {
  try {
    const content = await Content.findByIdAndDelete(req.params.id);
    if (!content) {
      throw new ValidationError('Content not found');
    }
    res.status(200).json({ message: 'Content deleted successfully' });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to delete content' });
  }
};
