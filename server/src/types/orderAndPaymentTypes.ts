// eslint-disable-next-line node/no-extraneous-import
// eslint-disable-next-line node/no-extraneous-import
import {AddressPayload, OrderPayload, Prisma} from '@prisma/client';
import {MutableCartItemPayload} from './userTypes';

export type MutableOrderPayload = Pick<
  OrderPayload['scalars'],
  'userId' | 'totalPrice'
>;

export type MutableAddressPayload = Omit<AddressPayload['scalars'], 'id'>;

export type CreateOrderData =
  | (Prisma.Without<Prisma.OrderCreateInput, Prisma.OrderUncheckedCreateInput> &
      Prisma.OrderUncheckedCreateInput)
  | (Prisma.Without<Prisma.OrderUncheckedCreateInput, Prisma.OrderCreateInput> &
      Prisma.OrderCreateInput);

export type CreatePaymentIntentPayload = {
  items: MutableCartItemPayload[];
  shippingAddress: MutableAddressPayload;
  orderDetails: MutableOrderPayload;
};
