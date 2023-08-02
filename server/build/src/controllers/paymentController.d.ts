import { Request, Response, NextFunction } from 'express';
/**
 * Asynchronous function to create a new Stripe PaymentIntent and an Order in the database.
 *
 * This function retrieves necessary information from the incoming request's body,
 * uses this information to create a new PaymentIntent via Stripe's API and also
 * create a new Order in the database. The amount for Stripe is transformed
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
 * Handle Stripe's webhook events.
 *
 * This asynchronous function first validates the incoming Stripe webhook event,
 * checking the signature using the raw request body and the Stripe webhook secret.
 * If the event type is 'payment_intent.succeeded', it finds the corresponding order and updates its status.
 * It then empties the cart of the user who placed the order.
 * If the event type is not handled, it logs the event type.
 * Finally, it responds with a JSON object to acknowledge the receipt of the event.
 *
 * @async
 * @function
 * @param {Request} req - Express.js request object.
 * @param {Response} res - Express.js response object.
 * @param {NextFunction} next - Express.js next function for error handling.
 * @throws {Error} Will throw an error if the signature of the Stripe event cannot be verified,
 * if the corresponding order for a payment intent cannot be found,
 * or if there is an error in processing the event or updating the order.
 */
export declare function handleStripeWebhook(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
