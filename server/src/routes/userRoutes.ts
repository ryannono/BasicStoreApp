import express from 'express';
import {
  getUserById,
  getAllUsers,
  createUser,
  updateUserById,
  deleteUserById,
} from '../controllers/userController';

const router = express.Router();

router.get('/', getAllUsers); // GET all users
router.post('/', createUser); // POST a new user
router.get('/:id', getUserById); // GET a specific user
router.put('/:id', updateUserById); // UPDATE a specific user
router.delete('/:id', deleteUserById); // DELETE a specific user

export default router;
