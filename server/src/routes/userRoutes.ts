import express from 'express';
import {
  getUserById,
  getAllUsers,
  updateUserById,
  deleteUserById,
  addItemToCart,
  clearCart,
  getCart,
  removeItemFromCart,
  updateCartItem,
} from '../controllers/userController';
import {
  authenticateAccessToken,
  verifyAdmin,
} from '../middlewares/authMiddleware';

const router = express.Router();

// ------------------- user model routes --------------- //

router.get('/', authenticateAccessToken, verifyAdmin, getAllUsers); // GET all users
router.get('/:id', authenticateAccessToken, getUserById); // GET a specific user
router.put('/:id', authenticateAccessToken, verifyAdmin, updateUserById); // UPDATE a specific user
router.delete('/:id', authenticateAccessToken, verifyAdmin, deleteUserById); // DELETE a specific user

// ----------------- user cart model routes --------------- //

router.get('/:userid/cart', authenticateAccessToken, getCart); // GET a user's cart
router.post('/:userid/cart', authenticateAccessToken, addItemToCart); // POST add item to a user's cart
router.put('/:userid/cart', authenticateAccessToken, updateCartItem); // UPDATE a user's cart
router.delete(
  '/:userid/cart/:productId',
  authenticateAccessToken,
  removeItemFromCart
); // DELETE a specific product from a user's cart.
router.delete('/:userid/cart/', authenticateAccessToken, clearCart); // DELETE (clear) a user's cart

export default router;
