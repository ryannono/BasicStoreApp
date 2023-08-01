// eslint-disable-next-line node/no-extraneous-import
import {User} from '@prisma/client';
import {
  MutableCartItemPayload,
  TokenUserPayload,
  UserWithCart,
} from '../types/userTypes';

/**
 * Function to extract essential user properties from a User object.
 *
 * This function returns a new object containing only the `id`, `email`,
 * `firstName`, and `lastName` properties of the provided User object.
 * This can be useful for creating a payload to be encoded into a token
 * or to be sent to the client, minimizing the exposure of sensitive data.
 *
 * @param user - The User object from which to extract properties.
 *
 * @returns {TokenUserPayload} An object containing essential user properties.
 */
export function getEssentialUserProps(user: UserWithCart): TokenUserPayload {
  const {id, email, firstName, lastName, role, cart} = user;
  return {id, email, firstName, lastName, role, cartId: cart.id};
}
