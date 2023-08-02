import { MutableCartItemPayload } from '../types';
/**
 * Creates an object containing arrays of items to be created, updated or deleted in a user's cart.
 *
 * @param {MutableCartItemPayload[]} items - An array of mutable cart item payloads.
 * @param {Map<string, MutableCartItemPayload>} userCartMap - A map of user cart items.
 * @returns {Object} An object containing arrays of items to be created, updated or deleted.
 */
export declare function getActionArrays(items: MutableCartItemPayload[], userCartMap: Map<string, MutableCartItemPayload>): {
    deletes: string[];
    updates: MutableCartItemPayload[];
    creates: MutableCartItemPayload[];
};
/**
 * Deletes cart items corresponding to the provided product IDs.
 *
 * @param {string} cartId - The cart's ID from which items are to be deleted.
 * @param {string[]} deleteIds - Array of product IDs to be deleted from the cart.
 * @throws {Error} If Prisma encounters an error during the database operation.
 */
export declare function deleteCartItems(cartId: string, deleteIds: string[]): Promise<void>;
/**
 * Creates new cart items from the provided item payloads.
 *
 * @param {string} cartId - The cart's ID in which new items are to be created.
 * @param {MutableCartItemPayload[]} creates - Array of mutable cart item payloads.
 * @throws {Error} If Prisma encounters an error during the database operation.
 */
export declare function createCartItems(cartId: string, creates: MutableCartItemPayload[]): Promise<void>;
/**
 * Updates existing cart items based on the provided item payloads.
 *
 * @param {string} cartId - The cart's ID for which items are to be updated.
 * @param {MutableCartItemPayload[]} updates - Array of mutable cart item payloads representing updates.
 * @throws {Error} If Prisma encounters an error during the database operation.
 */
export declare function updateCartItems(cartId: string, updates: MutableCartItemPayload[]): Promise<void>;
