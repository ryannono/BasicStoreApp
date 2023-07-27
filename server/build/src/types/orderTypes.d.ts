import { MutableCartItemPayload } from './userTypes';
import { AddressPayload, OrderPayload, Prisma } from '@prisma/client';
export declare type MutableOrderPayload = Pick<OrderPayload['scalars'], 'userId' | 'totalPrice'>;
export declare type MutableAddressPayload = Omit<AddressPayload['scalars'], 'id'>;
export declare type CreateOrderPayload = {
    orderDetails: MutableOrderPayload;
    shippingAddress: MutableAddressPayload;
    items: MutableCartItemPayload[];
};
export declare type CreateOrderData = (Prisma.Without<Prisma.OrderCreateInput, Prisma.OrderUncheckedCreateInput> & Prisma.OrderUncheckedCreateInput) | (Prisma.Without<Prisma.OrderUncheckedCreateInput, Prisma.OrderCreateInput> & Prisma.OrderCreateInput);
