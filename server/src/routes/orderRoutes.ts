import express from 'express';
import {
  getAllOrders,
  getOrderById,
  deleteOrderById,
  getOrderItemsById,
} from '../controllers/orderController';

const router = express.Router();

// -- note order creation is handled by payment controller
router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.delete('/:id', deleteOrderById);
router.delete('/:orderId/items', getOrderItemsById);

export default router;
