import express from 'express';
import {
  createPaymentIntent,
  handleStripeWebhook,
} from '../controllers/paymentController';

const router = express.Router();

router.post('/intent', createPaymentIntent); // create Order with status 'payment initiated' along with a stripe payment intent
router.post('/webhook', handleStripeWebhook); // update the Order status to 'payment complete' in database

export default router;
