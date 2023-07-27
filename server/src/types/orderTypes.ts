// eslint-disable-next-line node/no-extraneous-import
import {MutableCartItemPayload} from './userTypes';
// eslint-disable-next-line node/no-extraneous-import
import {AddressPayload, OrderPayload, Prisma} from '@prisma/client';

export type MutableOrderPayload = Pick<
  OrderPayload['scalars'],
  'userId' | 'totalPrice'
>;

export type MutableAddressPayload = Omit<AddressPayload['scalars'], 'id'>;

export type CreateOrderPayload = {
  orderDetails: MutableOrderPayload;
  shippingAddress: MutableAddressPayload;
  items: MutableCartItemPayload[];
};

export type CreateOrderData =
  | (Prisma.Without<Prisma.OrderCreateInput, Prisma.OrderUncheckedCreateInput> &
      Prisma.OrderUncheckedCreateInput)
  | (Prisma.Without<Prisma.OrderUncheckedCreateInput, Prisma.OrderCreateInput> &
      Prisma.OrderCreateInput);
