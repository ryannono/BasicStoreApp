import express from 'express';
import {
  registerUser,
  loginUser,
  refreshUser,
  logoutUser,
  resetPassword,
} from '../controllers/authController';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh', refreshUser);
router.post('/logout', logoutUser);
router.post('/reset-password', resetPassword);

export default router;
