// eslint-disable-next-line node/no-extraneous-require
import Stripe from 'stripe';
import {MutableUserPayload} from '../types';
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
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
export async function getStripeCustomerId({
  email,
  firstName,
  lastName,
  phoneNumber,
}: Omit<MutableUserPayload, 'password' | 'role'>) {
  try {
    const existingCustomer = (
      await stripe.customers.search({
        query: `email:"${email}"`,
      })
    ).data[0];

    if (existingCustomer) return existingCustomer.id;
    else {
      const newStripeCustomer = await stripe.customers.create({
        email,
        name: `${firstName} ${lastName}`,
        phone: phoneNumber ?? undefined,
      });

      return newStripeCustomer.id;
    }
  } catch (err) {
    throw new Error(`Error getting stripe customer Id intent: ${err}`);
  }
}

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
export async function retrievePaymentIntent(id: string) {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(id);
    return paymentIntent;
  } catch (err) {
    console.error('Error retrieving payment intent: ', err);
    throw err;
  }
}

export default stripe;
