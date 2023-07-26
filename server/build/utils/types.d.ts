import { UserPayload } from '@prisma/client';
export declare type MutableUserPayload = Omit<UserPayload['scalars'], 'createdAt' | 'updatedAt' | 'id' | 'stripeCustomerId'>;
export declare type TokenUserPayload = Omit<MutableUserPayload, 'phoneNumber' | 'password'>;
