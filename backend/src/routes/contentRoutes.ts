import express from 'express';
import {
  createContent,
  getAllContent,
  getContentById,
  deleteContent,
} from '../controllers/contentController';
import { authenticate, authorize } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', getAllContent);
router.get('/:id', getContentById);

router.post('/', authenticate, authorize('Instructor'), createContent);
router.delete('/:id', authenticate, authorize('Instructor'), deleteContent);

export default router;
