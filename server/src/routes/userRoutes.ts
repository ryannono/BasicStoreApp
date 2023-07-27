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

const router = express.Router();

// ------------------- user model routes --------------- //

router.get('/', getAllUsers); // GET all users
router.get('/:id', getUserById); // GET a specific user
router.put('/:id', updateUserById); // UPDATE a specific user
router.delete('/:id', deleteUserById); // DELETE a specific user

// ----------------- user cart model routes --------------- //

router.get('/:userid/cart', getCart); // GET a user's cart
router.post('/:userid/cart', addItemToCart); // POST add item to a user's cart
router.put('/:userid/cart', updateCartItem); // UPDATE a user's cart
router.delete('/:userid/cart/:productId', removeItemFromCart); // DELETE a specific product from a user's cart.
router.delete('/:userid/cart/', clearCart); // DELETE (clear) a user's cart

export default router;
