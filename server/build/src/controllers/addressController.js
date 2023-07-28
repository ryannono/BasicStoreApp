"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAddress = exports.updateAddress = exports.getAddress = exports.createAddress = exports.getAllAddresses = void 0;
const app_1 = require("../app");
/**
 * Asynchronous function to fetch all saved addresses for a specific user.
 *
 * This function retrieves the user ID from the incoming request's body,
 * uses it to find the user in the database and then fetches all of the
 * user's saved addresses. If successful, it sends a JSON response containing
 * all of the user's saved addresses.
 *
 * If an unexpected error occurs during the operation, the error is passed to
 * the next middleware function in the chain for error handling.
 *
 * This function should be used in routes where the retrieval of all saved
 * addresses for a specific user is required.
 *
 * @param req - Express.js request object containing the client request information.
 * @param res - Express.js response object for sending responses to the client.
 * @param next - Callback function to invoke the next middleware function in the chain.
 *
 * @throws {Error} When an unexpected error occurs during the operation.
 *
 * @returns {void} This function does not have a return value.
 */
async function getAllAddresses(req, res, next) {
    try {
        const { id } = req.body.user;
        const addresses = await app_1.prisma.user.findUnique({
            where: { id },
            select: { savedAddresses: true },
        });
        return res.status(200).json(addresses);
    }
    catch (err) {
        return next(err);
    }
}
exports.getAllAddresses = getAllAddresses;
/**
 * Asynchronous function to create a new address for a specific user.
 *
 * This function retrieves the user ID from the incoming request's body,
 * along with the address details, and uses this data to create a new address
 * in the database associated with the user. If successful, it sends a JSON
 * response containing the newly created address.
 *
 * If an unexpected error occurs during the operation, the error is passed to
 * the next middleware function in the chain for error handling.
 *
 * @param req - Express.js request object containing the client request information.
 * @param res - Express.js response object for sending responses to the client.
 * @param next - Callback function to invoke the next middleware function in the chain.
 *
 * @throws {Error} When an unexpected error occurs during the operation.
 *
 * @returns {void} This function does not have a return value.
 */
async function createAddress(req, res, next) {
    try {
        const { id } = req.body.user;
        const newAddress = await app_1.prisma.user.update({
            where: { id },
            data: {
                savedAddresses: {
                    create: { ...req.body },
                },
            },
        });
        return res.status(201).json(newAddress);
    }
    catch (err) {
        return next(err);
    }
}
exports.createAddress = createAddress;
/**
 * Asynchronous function to retrieve a specific address for a user.
 *
 * This function uses the provided address ID to retrieve the corresponding
 * address from the database. If successful, it sends a JSON response
 * containing the requested address.
 *
 * If the specified address does not exist, a 404 error is returned. If an
 * unexpected error occurs during the operation, the error is passed to the
 * next middleware function in the chain for error handling.
 *
 * @param req - Express.js request object containing the client request information.
 * @param res - Express.js response object for sending responses to the client.
 * @param next - Callback function to invoke the next middleware function in the chain.
 *
 * @throws {Error} When an unexpected error occurs during the operation.
 *
 * @returns {void} This function does not have a return value.
 */
async function getAddress(req, res, next) {
    try {
        const { id } = req.params;
        const address = await app_1.prisma.address.findUnique({
            where: {
                id,
            },
        });
        if (!address) {
            return res.status(404).json({ error: 'Address not found' });
        }
        return res.status(200).json(address);
    }
    catch (err) {
        return next(err);
    }
}
exports.getAddress = getAddress;
/**
 * Asynchronous function to update a specific address for a user.
 *
 * This function uses the provided address ID and the new address details to
 * update the corresponding address in the database. If successful, it sends a
 * JSON response containing the updated address.
 *
 * If an unexpected error occurs during the operation, the error is passed to
 * the next middleware function in the chain for error handling.
 *
 * @param req - Express.js request object containing the client request information.
 * @param res - Express.js response object for sending responses to the client.
 * @param next - Callback function to invoke the next middleware function in the chain.
 *
 * @throws {Error} When an unexpected error occurs during the operation.
 *
 * @returns {void} This function does not have a return value.
 */
async function updateAddress(req, res, next) {
    try {
        const { id } = req.params;
        const updatedAddress = await app_1.prisma.address.update({
            where: {
                id,
            },
            data: { ...req.body },
        });
        return res.status(200).json(updatedAddress);
    }
    catch (err) {
        return next(err);
    }
}
exports.updateAddress = updateAddress;
/**
 * Asynchronous function to delete a specific address for a user.
 *
 * This function uses the provided address ID to delete the corresponding
 * address from the database. If successful, it ends the request-response
 * cycle with a 204 status code, indicating that the request has succeeded
 * but does not include an entity-body in the response.
 *
 * If an unexpected error occurs during the operation, the error is passed to
 * the next middleware function in the chain for error handling.
 *
 * @param req - Express.js request object containing the client request information.
 * @param res - Express.js response object for sending responses to the client.
 * @param next - Callback function to invoke the next middleware function in the chain.
 *
 * @throws {Error} When an unexpected error occurs during the operation.
 *
 * @returns {void} This function does not have a return value.
 */
async function deleteAddress(req, res, next) {
    try {
        const { id } = req.params;
        await app_1.prisma.address.delete({
            where: {
                id,
            },
        });
        return res.status(204).end();
    }
    catch (err) {
        return next(err);
    }
}
exports.deleteAddress = deleteAddress;
//# sourceMappingURL=addressController.js.map