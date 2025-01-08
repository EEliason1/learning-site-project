import express from 'express';
import {
  enableMFA,
  verifyMFA,
  requestPasswordReset,
  resetPassword,
  verifyAccount,
} from '../controllers/authController';

const router = express.Router();

router.post('/mfa/enable', enableMFA);
router.post('/mfa/verify', verifyMFA);
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);
router.post('/verify-account', verifyAccount);

export default router;
