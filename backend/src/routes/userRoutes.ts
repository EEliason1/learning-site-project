import express from 'express';
import { authenticate, authorize } from '../middlewares/authMiddleware';
import { getAllUsers, getUserById, registerUser, loginUser } from '../controllers/userController';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/', authenticate, authorize('Admin'), getAllUsers);
router.get('/:id', authenticate, getUserById);

export default router;
