"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrievePaymentIntent = exports.getStripeCustomerId = void 0;
// eslint-disable-next-line node/no-extraneous-require
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15',
});
async function getStripeCustomerId({ email, firstName, lastName, phoneNumber, }) {
    try {
        const existingCustomer = (await stripe.customers.search({
            query: `email:"${email}"`,
        })).data[0];
        if (existingCustomer)
            return existingCustomer.id;
        else {
            const newStripeCustomer = await stripe.customers.create({
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
async function retrievePaymentIntent(id) {
    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(id);
        return paymentIntent;
    }
    catch (err) {
        console.error('Error retrieving payment intent: ', err);
        throw err;
    }
}
exports.retrievePaymentIntent = retrievePaymentIntent;
exports.default = stripe;
//# sourceMappingURL=stripeService.js.map