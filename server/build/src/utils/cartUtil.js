"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCartItems = exports.createCartItems = exports.deleteCartItems = exports.getActionArrays = void 0;
const app_1 = require("../app");
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