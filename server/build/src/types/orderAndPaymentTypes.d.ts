import { AddressPayload, OrderPayload, Prisma } from '@prisma/client';
import { MutableCartItemPayload } from './userTypes';
export declare type MutableOrderPayload = Pick<OrderPayload['scalars'], 'userId' | 'totalPrice'>;
export declare type MutableAddressPayload = Omit<AddressPayload['scalars'], 'id'>;
export declare type CreateOrderData = (Prisma.Without<Prisma.OrderCreateInput, Prisma.OrderUncheckedCreateInput> & Prisma.OrderUncheckedCreateInput) | (Prisma.Without<Prisma.OrderUncheckedCreateInput, Prisma.OrderCreateInput> & Prisma.OrderCreateInput);
export declare type CreatePaymentIntentPayload = {
    items: MutableCartItemPayload[];
    shippingAddress: MutableAddressPayload;
    orderDetails: MutableOrderPayload;
};
