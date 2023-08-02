"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCartItems = exports.createCartItems = exports.deleteCartItems = exports.getActionArrays = void 0;
const app_1 = require("../app");
/**
 * Creates an object containing arrays of items to be created, updated or deleted in a user's cart.
 *
 * @param {MutableCartItemPayload[]} items - An array of mutable cart item payloads.
 * @param {Map<string, MutableCartItemPayload>} userCartMap - A map of user cart items.
 * @returns {Object} An object containing arrays of items to be created, updated or deleted.
 */
function getActionArrays(items, userCartMap) {
    const deletes = [];
    const updates = [];
    const creates = [];
    items.forEach(item => {
        if (item.productQuantity <= 0) {
            if (userCartMap.has(item.productId)) {
                deletes.push(item.productId);
            }
        }
        else if (userCartMap.has(item.productId)) {
            updates.push(item);
        }
        else {
            creates.push(item);
        }
    });
    return { deletes, updates, creates };
}
exports.getActionArrays = getActionArrays;
/**
 * Deletes cart items corresponding to the provided product IDs.
 *
 * @param {string} cartId - The cart's ID from which items are to be deleted.
 * @param {string[]} deleteIds - Array of product IDs to be deleted from the cart.
 * @throws {Error} If Prisma encounters an error during the database operation.
 */
async function deleteCartItems(cartId, deleteIds) {
    if (deleteIds.length > 0) {
        await app_1.prisma.cart.update({
            where: { id: cartId },
            data: {
                items: {
                    deleteMany: {
                        productId: { in: deleteIds },
                    },
                },
            },
        });
    }
}
exports.deleteCartItems = deleteCartItems;
/**
 * Creates new cart items from the provided item payloads.
 *
 * @param {string} cartId - The cart's ID in which new items are to be created.
 * @param {MutableCartItemPayload[]} creates - Array of mutable cart item payloads.
 * @throws {Error} If Prisma encounters an error during the database operation.
 */
async function createCartItems(cartId, creates) {
    if (creates.length > 0) {
        await app_1.prisma.cart.update({
            where: { id: cartId },
            data: {
                items: {
                    createMany: {
                        data: creates,
                    },
                },
            },
        });
    }
}
exports.createCartItems = createCartItems;
/**
 * Updates existing cart items based on the provided item payloads.
 *
 * @param {string} cartId - The cart's ID for which items are to be updated.
 * @param {MutableCartItemPayload[]} updates - Array of mutable cart item payloads representing updates.
 * @throws {Error} If Prisma encounters an error during the database operation.
 */
async function updateCartItems(cartId, updates) {
    if (updates.length > 0) {
        await Promise.all(updates.map(item => app_1.prisma.cart.update({
            where: { id: cartId },
            data: {
                items: {
                    update: {
                        where: {
                            cartId_productId: {
                                cartId,
                                productId: item.productId,
                            },
                        },
                        data: { productQuantity: item.productQuantity },
                    },
                },
            },
        })));
    }
}
exports.updateCartItems = updateCartItems;
//# sourceMappingURL=cartUtil.js.map