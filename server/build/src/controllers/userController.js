"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCart = exports.removeItemFromCart = exports.updateCartItem = exports.addItemToCart = exports.getCart = exports.deleteUserById = exports.updateUserById = exports.getUserById = exports.getAllUsers = void 0;
const app_1 = require("../app");
const utils_1 = require("../utils/");
// ------------------- User Controller ---------------------- //
/**
 * Asynchronous Express middleware to fetch all users from the database.
 * If successful, responds with a JSON array of all user objects.
 * If an error occurs, it is passed on to the next middleware for error handling.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the Express pipeline.
 *
 * @returns {Promise<void>} Nothing.
 *
 * @throws {Error} If any error occurs during the process.
 */
async function getAllUsers(req, res, next) {
    try {
        const allUsers = await app_1.prisma.user.findMany();
        const essentialAllUsers = allUsers.map(user => (0, utils_1.getEssentialUserProps)(user));
        return res.status(200).json(essentialAllUsers);
    }
    catch (err) {
        return next(err);
    }
}
exports.getAllUsers = getAllUsers;
/**
 * Asynchronous Express middleware to fetch a specific user from the database by their ID.
 * If successful, responds with a JSON object of the user.
 * If an error occurs or the user is not found, it is passed on to the next middleware for error handling.
 *
 * @param {Request} req - The Express request object, expecting the user's ID in the parameters.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the Express pipeline.
 *
 * @returns {Promise<void>} Nothing.
 *
 * @throws {Error} If any error occurs during the process.
 */
async function getUserById(req, res, next) {
    const { id } = req.params;
    try {
        const user = await app_1.prisma.user.findUnique({
            where: { id },
        });
        if (!user)
            return res.status(404).json({ error: 'User not found' });
        return res.status(200).json((0, utils_1.getEssentialUserProps)(user));
    }
    catch (err) {
        return next(err);
    }
}
exports.getUserById = getUserById;
/**
 * Asynchronous Express middleware to update a specific user in the database by their ID.
 * If successful, responds with a JSON object of the updated user.
 * If an error occurs, it is passed on to the next middleware for error handling.
 *
 * @param {Request} req - The Express request object, expecting the user's ID in the parameters and the updated data in the body.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the Express pipeline.
 *
 * @returns {Promise<void>} Nothing.
 *
 * @throws {Error} If any error occurs during the user updating process.
 */
async function updateUserById(req, res, next) {
    const { id } = req.params;
    const { role, ...otherUpdateData } = req.body;
    try {
        await app_1.prisma.user.update({
            where: { id },
            data: {
                role: role ? { set: role } : undefined,
                ...otherUpdateData,
            },
        });
        return res.status(200).json({ message: 'User updated successfully' });
    }
    catch (err) {
        return next(err);
    }
}
exports.updateUserById = updateUserById;
/**
 * Asynchronous Express middleware to delete a specific user from the database by their ID.
 * If successful, responds with a JSON object of the deleted user.
 * If an error occurs, it is passed on to the next middleware for error handling.
 *
 * @param {Request} req - The Express request object, expecting the user's ID in the parameters.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the Express pipeline.
 *
 * @returns {Promise<void>} Nothing.
 *
 * @throws {Error} If any error occurs during the user deletion process.
 */
async function deleteUserById(req, res, next) {
    const { id } = req.params;
    try {
        await app_1.prisma.user.delete({
            where: { id },
        });
        return res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (err) {
        return next(err);
    }
}
exports.deleteUserById = deleteUserById;
// ------------------- User Cart Controller ---------------------- //
/**
 * Retrieves a user's shopping cart.
 *
 * This function handles the GET request to fetch a user's cart by their ID.
 * It fetches the cart associated with the given user ID from the database.
 *
 * @async
 * @param {Request} req - The incoming HTTP request. The request parameters
 *                        should contain the user ID.
 * @param {Response} res - The outgoing HTTP response. The response body will
 *                         contain the fetched cart if the operation is successful.
 * @param {NextFunction} next - Express.js next function.
 * @throws Will throw an error if the operation fails.
 * @returns {Promise<Response>} A Promise that resolves to the Express.js
 *                              response object.
 */
async function getCart(req, res, next) {
    try {
        const userId = req.params.userId;
        console.log(userId);
        const cart = await app_1.prisma.cart.findUnique({
            where: { userId: userId },
            include: { items: true },
        });
        return res.status(200).json(cart);
    }
    catch (err) {
        return next(err);
    }
}
exports.getCart = getCart;
/**
 * Adds an item to a user's shopping cart.
 *
 * This function handles the POST request to add an item to a user's cart.
 * It updates the cart associated with the given user ID in the database.
 *
 * @async
 * @param {Request} req - The incoming HTTP request. The request parameters
 *                        should contain the user ID and the request body
 *                        should contain the product ID and quantity.
 * @param {Response} res - The outgoing HTTP response. The response body will
 *                         contain the updated cart if the operation is successful.
 * @param {NextFunction} next - Express.js next function.
 * @throws Will throw an error if the operation fails.
 * @returns {Promise<Response>} A Promise that resolves to the Express.js
 *                              response object.
 */
async function addItemToCart(req, res, next) {
    try {
        const { userId } = req.params;
        const { productId, productQuantity } = req.body;
        const updatedCart = await app_1.prisma.cart.update({
            where: { userId },
            data: {
                items: {
                    create: {
                        productId,
                        productQuantity,
                    },
                },
            },
            include: { items: true },
        });
        return res.status(200).json(updatedCart);
    }
    catch (err) {
        return next(err);
    }
}
exports.addItemToCart = addItemToCart;
/**
 * Updates the quantity of an item in a user's shopping cart.
 *
 * This function handles the PUT request to update the quantity of an item
 * in a user's cart. It fetches the cart associated with the given user ID,
 * finds the item with the provided product ID, and updates its quantity in
 * the database.
 *
 * @async
 * @param {Request} req - The incoming HTTP request. The request parameters
 *                        should contain the user ID and the request body
 *                        should contain the product ID and new quantity.
 * @param {Response} res - The outgoing HTTP response. The response body will
 *                         contain the updated cart if the operation is successful.
 * @param {NextFunction} next - Express.js next function.
 * @throws Will throw an error if the operation fails.
 * @returns {Promise<Response>} A Promise that resolves to the Express.js
 *                              response object.
 */
async function updateCartItem(req, res, next) {
    try {
        const { userId } = req.params;
        const { productId, productQuantity } = req.body;
        const cart = await app_1.prisma.cart.findUnique({
            where: { userId },
        });
        if (!cart)
            return res.status(404).json({ error: 'No cart found' });
        const updatedCart = await app_1.prisma.cart.update({
            where: { userId },
            data: {
                items: {
                    update: {
                        where: {
                            cartId_productId: {
                                cartId: cart.id,
                                productId,
                            },
                        },
                        data: {
                            productQuantity,
                        },
                    },
                },
            },
            include: { items: true },
        });
        return res.status(200).json(updatedCart);
    }
    catch (err) {
        return next(err);
    }
}
exports.updateCartItem = updateCartItem;
/**
 * Removes an item from a user's shopping cart.
 *
 * This function handles the DELETE request to remove an item from a user's
 * cart. It updates the cart associated with the given user ID in the database.
 *
 * @async
 * @param {Request} req - The incoming HTTP request. The request parameters
 *                        should contain the user ID and the product ID.
 * @param {Response} res - The outgoing HTTP response. The response body will
 *                         contain the updated cart if the operation is successful.
 * @param {NextFunction} next - Express.js next function.
 * @throws Will throw an error if the operation fails.
 * @returns {Promise<Response>} A Promise that resolves to the Express.js
 *                              response object.
 */
async function removeItemFromCart(req, res, next) {
    try {
        const { userId, productId } = req.params;
        const cart = await app_1.prisma.cart.findUnique({
            where: { userId },
        });
        if (!cart)
            return res.status(404).json({ error: 'No cart found' });
        const updatedCart = await app_1.prisma.cart.update({
            where: { id: cart === null || cart === void 0 ? void 0 : cart.id },
            data: {
                items: {
                    delete: {
                        cartId_productId: {
                            cartId: cart.id,
                            productId,
                        },
                    },
                },
            },
            include: { items: true },
        });
        return res.status(200).json(updatedCart);
    }
    catch (err) {
        return next(err);
    }
}
exports.removeItemFromCart = removeItemFromCart;
/**
 * Clears a user's shopping cart.
 *
 * This function handles the DELETE request to clear a user's cart. It deletes
 * the cart associated with the given user ID from the database.
 *
 * @async
 * @param {Request} req - The incoming HTTP request. The request parameters
 *                        should contain the user ID.
 * @param {Response} res - The outgoing HTTP response. The response body will
 *                         contain the response of the delete operation if successful.
 * @param {NextFunction} next - Express.js next function.
 * @throws Will throw an error if the operation fails.
 * @returns {Promise<Response>} A Promise that resolves to the Express.js
 *                              response object.
 */
async function clearCart(req, res, next) {
    try {
        const userId = req.params.userId;
        await app_1.prisma.cartItem.deleteMany({
            where: {
                cart: {
                    userId,
                },
            },
        });
        return res.status(200).json({ message: 'Cart cleared successfully' });
    }
    catch (err) {
        return next(err);
    }
}
exports.clearCart = clearCart;
//# sourceMappingURL=userController.js.map