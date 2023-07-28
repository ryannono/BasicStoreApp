import { Request, Response, NextFunction } from 'express';
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
export declare function createPaymentIntent(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
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
export declare function handleStripeWebhook(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
