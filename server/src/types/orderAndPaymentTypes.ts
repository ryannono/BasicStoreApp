// eslint-disable-next-line node/no-extraneous-import
// eslint-disable-next-line node/no-extraneous-import
import {AddressPayload, OrderPayload, Prisma} from '@prisma/client';
import {MutableCartItemPayload} from './userTypes';

/**
 * Type representing a mutable order payload.
 * Defines the properties of an order that can be changed by the user.
 *
 * @property {string} userId - The user's ID associated with the order.
 * @property {number} totalPrice - The total price of the order.
 */
export type MutableOrderPayload = Pick<
  OrderPayload['scalars'],
  'userId' | 'totalPrice'
>;

/**
 * Type representing a mutable address payload.
 * Defines the properties of an address that can be changed by the user.
 */
export type MutableAddressPayload = Omit<AddressPayload['scalars'], 'id'>;

/**
 * Type representing the data used to create an order.
 */
export type CreateOrderData =
  | (Prisma.Without<Prisma.OrderCreateInput, Prisma.OrderUncheckedCreateInput> &
      Prisma.OrderUncheckedCreateInput)
  | (Prisma.Without<Prisma.OrderUncheckedCreateInput, Prisma.OrderCreateInput> &
      Prisma.OrderCreateInput);

/**
 * Type representing the payload for creating a PaymentIntent.
 *
 * @typedef {Object} CreatePaymentIntentPayload
 * @property {MutableCartItemPayload[]} items - An array of mutable cart item payloads.
 * @property {MutableAddressPayload} shippingAddress - The mutable address payload for the order.
 * @property {MutableOrderPayload} orderDetails - The mutable order payload.
 */
export type CreatePaymentIntentPayload = {
  items: MutableCartItemPayload[];
  shippingAddress: MutableAddressPayload;
  orderDetails: MutableOrderPayload;
};
