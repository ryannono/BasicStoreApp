import express from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  deleteOrderById,
  getOrderItemsById,
} from '../controllers/orderController';

const router = express.Router();

router.post('/', createOrder);
router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.delete('/:id', deleteOrderById);
router.delete('/:orderId/items', getOrderItemsById);

export default router;
