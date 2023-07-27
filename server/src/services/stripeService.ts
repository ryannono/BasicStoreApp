// eslint-disable-next-line node/no-extraneous-require
import Stripe from 'stripe';
import {MutableUserPayload} from '../types';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

export async function getStripeCustomerId({
  email,
  firstName,
  lastName,
  phoneNumber,
}: Omit<MutableUserPayload, 'password'>) {
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
        phone: phoneNumber,
      });

      return newStripeCustomer.id;
    }
  } catch (err) {
    throw new Error(`Error getting stripe customer Id intent: ${err}`);
  }
}

export async function createPaymentIntent(amount: number, currency = 'usd') {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    return paymentIntent;
  } catch (err) {
    throw new Error(`Error creating payment intent: ${err}`);
  }
}

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
