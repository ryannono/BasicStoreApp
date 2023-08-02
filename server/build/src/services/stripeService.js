"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrievePaymentIntent = exports.getStripeCustomerId = exports.stripe = void 0;
// eslint-disable-next-line node/no-extraneous-require
const stripe_1 = __importDefault(require("stripe"));
exports.stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15',
});
/**
 * Retrieves or creates a Stripe customer ID.
 *
 * This function first checks if a Stripe customer exists with the given email. If the customer exists,
 * it returns the customer's ID. If the customer does not exist, it creates a new customer with the
 * given email, name, and phone number, and then returns the new customer's ID.
 *
 * @async
 * @function
 * @param {Omit<MutableUserPayload, 'password' | 'role'>} param0 - An object containing
 * the user's email, first name, last name, and phone number.
 * @returns {Promise<string>} - A promise that resolves to a Stripe customer ID.
 * @throws {Error} Will throw an error if there's an issue with fetching or creating Stripe customer.
 */
async function getStripeCustomerId({ email, firstName, lastName, phoneNumber, }) {
    try {
        const existingCustomer = (await exports.stripe.customers.search({
            query: `email:"${email}"`,
        })).data[0];
        if (existingCustomer)
            return existingCustomer.id;
        else {
            const newStripeCustomer = await exports.stripe.customers.create({
                email,
                name: `${firstName} ${lastName}`,
                phone: phoneNumber !== null && phoneNumber !== void 0 ? phoneNumber : undefined,
            });
            return newStripeCustomer.id;
        }
    }
    catch (err) {
        throw new Error(`Error getting stripe customer Id intent: ${err}`);
    }
}
exports.getStripeCustomerId = getStripeCustomerId;
/**
 * Retrieves a Stripe PaymentIntent object using its ID.
 *
 * This function communicates with the Stripe API to fetch the details of a PaymentIntent.
 * A PaymentIntent represents an attempt to collect payment from a user.
 *
 * @async
 * @function
 * @param {string} id - The ID of the PaymentIntent to retrieve.
 * @returns {Promise<Stripe.PaymentIntent>} - A promise that resolves to a Stripe PaymentIntent object.
 * @throws {Error} Will throw an error if there's an issue retrieving the PaymentIntent.
 */
async function retrievePaymentIntent(id) {
    try {
        const paymentIntent = await exports.stripe.paymentIntents.retrieve(id);
        return paymentIntent;
    }
    catch (err) {
        console.error('Error retrieving payment intent: ', err);
        throw err;
    }
}
exports.retrievePaymentIntent = retrievePaymentIntent;
exports.default = exports.stripe;
//# sourceMappingURL=stripeService.js.map