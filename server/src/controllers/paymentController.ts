import {Request, Response, NextFunction} from 'express';
import stripe from '../services/stripeService';
import {prisma} from '../app';
import {TO_CENTS_MULTIPLIER} from '../utils';
import {CreateOrderData, CreatePaymentIntentPayload} from '../types';
import Stripe from 'stripe';

/**
 * Asynchronous function to create a new Stripe PaymentIntent and an Order in the database.
 *
 * This function retrieves necessary information from the incoming request's body,
 * uses this information to create a new PaymentIntent via Stripe's API and also
 * create a new Order in the local database. The amount for Stripe is transformed
 * to cents. If the creation is successful, the client secret from the PaymentIntent
 * is sent as a JSON response.
 *
 * This function should be used in the route handling payment initiation.
 *
 * @param req - Express.js request object containing the client request information.
 * @param res - Express.js response object for sending responses to the client.
 * @param next - Callback function to invoke the next middleware function in the chain.
 *
 * @throws {Error} When an unexpected error occurs during PaymentIntent or Order creation.
 *
 * @returns {Response} This function returns the response object with the client secret
 *                     from the Stripe PaymentIntent.
 */
export async function createPaymentIntent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Extract necessary information from request body
    const {items, orderDetails, shippingAddress} =
      req.body as CreatePaymentIntentPayload;
    const {totalPrice, userId} = orderDetails;

    // Create a new Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice * TO_CENTS_MULTIPLIER, // Stripe requires amount in cents
      currency: 'cad', // Set currency to Canadian Dollar
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log(JSON.stringify(paymentIntent.id));

    // Construct data for new Order
    const data: CreateOrderData = {
      stripePaymentIntentId: paymentIntent.id,
      totalPrice,
      items: {
        createMany: {
          data: items,
        },
      },
      shippingAddress: {
        create: {
          ...shippingAddress,
        },
      },
      orderStatus: 'paymentInitiated',
    };

    // Connect order with user, if userId is provided
    if (userId) {
      data.user = {
        connect: {id: userId},
      };
    }

    // Create new Order in the database
    await prisma.order.create({data});

    // Respond with the client secret of the PaymentIntent. The frontend will use this
    // client secret to confirm the payment with Stripe.
    return res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    // Pass any errors to the error handler middleware
    console.log(error);
    return next(error);
  }
}

/**
 * Asynchronous function to handle incoming Stripe webhook events.
 *
 * This function retrieves the 'stripe-signature' from the incoming request's headers,
 * verifies the signature using the raw body and secret, and validates the
 * authenticity of the incoming webhook event. If the event type is 'payment_intent.succeeded',
 * it updates the OrderStatus in the local database.
 *
 * This function should be used in the route handling Stripe webhook events.
 *
 * @param req - Express.js request object containing the client request information.
 * @param res - Express.js response object for sending responses to the client.
 * @param next - Callback function to invoke the next middleware function in the chain.
 *
 * @throws {Error} When an unexpected error occurs during event validation or Order status update.
 *
 * @returns {Response} This function returns the response object to acknowledge receipt of the event.
 */
export async function handleStripeWebhook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let event;
  const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  // Retrieve the event by verifying the signature using the raw body and secret.
  // Note** The 'stripe-signature' header is included in the webhook events sent by Stripe
  const sig = req.headers['stripe-signature'] || '';

  try {
    // validate the authenticity of the incoming webhook event
    event = stripe.webhooks.constructEvent(req.body, sig, stripeWebhookSecret);
  } catch (err) {
    // On error, log and return the error message
    console.log(`Error message: ${err}`);
    return res.status(400).send(`Webhook Error: ${err}`);
  }

  try {
    // Handle the payment_intent.succeeded event
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      // Use paymentIntent.id to find the corresponding order and update its status
      const order = await prisma.order.update({
        where: {stripePaymentIntentId: paymentIntent.id},
        data: {
          orderStatus: {
            set: 'paymentSucceeded',
          },
        },
      });

      if (!order) {
        console.log('Order not found for payment intent: ', paymentIntent.id);
        return res.status(404).json({error: 'Order not found'});
      }
    } else {
      console.info('Unhandled event type: ', event.type);
    }

    // Return a response to acknowledge receipt of the event
    return res.json({received: true});
  } catch (err) {
    return next(err);
  }
}
