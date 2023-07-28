import express from 'express';
import {
  getAllOrders,
  getOrderById,
  deleteOrderById,
  getOrderItemsById,
} from '../controllers/orderController';
import {
  authenticateAccessToken,
  verifyAdmin,
} from '../middlewares/authMiddleware';

const router = express.Router();

// -- note order creation is handled by payment controller
router.get('/', authenticateAccessToken, verifyAdmin, getAllOrders);
router.get('/:id', getOrderById);
router.delete('/:id', authenticateAccessToken, verifyAdmin, deleteOrderById);
router.delete('/:orderId/items', getOrderItemsById);

export default router;
