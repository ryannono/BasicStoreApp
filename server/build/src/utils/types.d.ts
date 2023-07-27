import { UserPayload } from '@prisma/client';
export declare type MutableUserPayload = Omit<UserPayload['scalars'], 'createdAt' | 'updatedAt' | 'id' | 'stripeCustomerId'>;
export declare type TokenUserPayload = Pick<UserPayload['scalars'], 'id' | 'email' | 'firstName' | 'lastName'>;
export declare type LoginUserPayload = Pick<MutableUserPayload, 'email' | 'password'>;
