"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleStripeWebhook = exports.createPaymentIntent = void 0;
const stripeService_1 = __importDefault(require("../services/stripeService"));
const app_1 = require("../app");
const utils_1 = require("../utils");
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
async function createPaymentIntent(req, res, next) {
    try {
        // Extract necessary information from request body
        const { items, orderDetails, shippingAddress } = req.body;
        const { totalPrice, userId } = orderDetails;
        // Create a new Stripe PaymentIntent
        const paymentIntent = await stripeService_1.default.paymentIntents.create({
            amount: parseInt((totalPrice * utils_1.TO_CENTS_MULTIPLIER).toFixed()),
            currency: 'cad',
            automatic_payment_methods: {
                enabled: true,
            },
        });
        console.log(JSON.stringify(paymentIntent.id));
        // Construct data for new Order
        const data = {
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
                connect: { id: userId },
            };
        }
        // Create new Order in the database
        await app_1.prisma.order.create({ data });
        // Respond with the client secret of the PaymentIntent. The frontend will use this
        // client secret to confirm the payment with Stripe.
        return res.status(201).json({
            clientSecret: paymentIntent.client_secret,
        });
    }
    catch (error) {
        // Pass any errors to the error handler middleware
        console.log(error);
        return next(error);
    }
}
exports.createPaymentIntent = createPaymentIntent;
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
async function handleStripeWebhook(req, res, next) {
    let event;
    const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    // Retrieve the event by verifying the signature using the raw body and secret.
    // Note** The 'stripe-signature' header is included in the webhook events sent by Stripe
    const sig = req.headers['stripe-signature'] || '';
    try {
        // validate the authenticity of the incoming webhook event
        event = stripeService_1.default.webhooks.constructEvent(req.body, sig, stripeWebhookSecret);
    }
    catch (err) {
        // On error, log and return the error message
        console.log(`Error message: ${err}`);
        return res.status(400).send(`Webhook Error: ${err}`);
    }
    try {
        // Handle the payment_intent.succeeded event
        if (event.type === 'payment_intent.succeeded') {
            const paymentIntent = event.data.object;
            // Use paymentIntent.id to find the corresponding order and update its status
            const order = await app_1.prisma.order.update({
                where: { stripePaymentIntentId: paymentIntent.id },
                data: {
                    orderStatus: {
                        set: 'paymentSucceeded',
                    },
                },
                include: { items: true },
            });
            if (order.userId) {
                await app_1.prisma.user.update({
                    where: { id: order.userId },
                    data: {
                        cart: {
                            update: {
                                data: {
                                    items: {
                                        deleteMany: {
                                            productId: {
                                                in: order.items.map(item => item.productId),
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                });
            }
            if (!order) {
                console.log('Order not found for payment intent: ', paymentIntent.id);
                return res.status(404).json({ error: 'Order not found' });
            }
        }
        else {
            console.info('Unhandled event type: ', event.type);
        }
        // Return a response to acknowledge receipt of the event
        return res.json({ received: true });
    }
    catch (err) {
        return next(err);
    }
}
exports.handleStripeWebhook = handleStripeWebhook;
//# sourceMappingURL=paymentController.js.map