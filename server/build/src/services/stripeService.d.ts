import Stripe from 'stripe';
import { MutableUserPayload } from '../types';
export declare const stripe: Stripe;
export declare function getStripeCustomerId({ email, firstName, lastName, phoneNumber, }: Omit<MutableUserPayload, 'password' | 'role'>): Promise<string>;
export declare function retrievePaymentIntent(id: string): Promise<Stripe.Response<Stripe.PaymentIntent>>;
export default stripe;
