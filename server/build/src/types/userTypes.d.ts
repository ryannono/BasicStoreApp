import { CartItem, UserPayload } from '@prisma/client';
/**
 * The `MutableUserPayload` type is derived from the `UserPayload` type.
 * It omits certain properties that should not be modified directly by the user.
 * This includes 'createdAt', 'updatedAt', 'id', and 'stripeCustomerId'.
 *
 * The resulting type is used in places where the user is allowed to provide or update their details.
 */
export declare type MutableUserPayload = Omit<UserPayload['scalars'], 'createdAt' | 'updatedAt' | 'id' | 'stripeCustomerId'>;
/**
 * The `TokenUserPayload` type is a subset of the `UserPayload` type.
 * It only includes properties that are needed to identify the user from a token.
 * This includes 'id', 'email', 'firstName', and 'lastName'.
 *
 * This type is used when creating a token for the user.
 */
export declare type TokenUserPayload = Pick<UserPayload['scalars'], 'id' | 'email' | 'firstName' | 'lastName'>;
/**
 * The `LoginUserPayload` type represents the data needed from a user to log in.
 * It includes only 'email' and 'password', as those are the required credentials for a user to log in.
 *
 * This type is used when handling a login request from the user.
 */
export declare type LoginUserPayload = Pick<MutableUserPayload, 'email' | 'password'>;
export declare type MutableCartItemPayload = Omit<CartItem, 'id' | 'cartId'>;
