import {Router} from 'express';
import {
  getAllAddresses,
  createAddress,
  getAddress,
  updateAddress,
  deleteAddress,
} from '../controllers/addressController';
import {authenticateAccessToken} from '../middlewares/authMiddleware';

const router = Router();

router.get('/', authenticateAccessToken, getAllAddresses); // Get all addresses of the authenticated user
router.post('/', authenticateAccessToken, createAddress); // Create a new address for the authenticated user
router.get('/:id', authenticateAccessToken, getAddress); // Get a specific address of the authenticated user
router.put('/:id', authenticateAccessToken, updateAddress); // Update a specific address of the authenticated user
router.delete('/:id', authenticateAccessToken, deleteAddress); // Delete a specific address of the authenticated user

export default router;
