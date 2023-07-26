import express from 'express';
import {
  getUserById,
  getUsers,
  createUser,
  updateUserById,
  deleteUser,
} from '../controllers/userController';

const router = express.Router();

router.get('/', getUsers); // GET all users
router.post('/', createUser); // POST a new user
router.get('/:id', getUserById); // GET a specific user
router.put('/:id', updateUserById); // UPDATE a specific user
router.delete('/:id', deleteUser); // DELETE a specific user

export default router;
