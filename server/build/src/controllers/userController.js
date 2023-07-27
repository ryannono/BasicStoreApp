"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.updateUserById = exports.getUserById = exports.getAllUsers = void 0;
const app_1 = require("../app");
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
        return res.status(200).json(allUsers);
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
        return res.status(200).json(user);
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
    try {
        const updatedUser = await app_1.prisma.user.update({
            where: { id },
            data: req.body,
        });
        return res.status(200).json(updatedUser);
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
        const deletedUser = await app_1.prisma.user.delete({
            where: { id },
        });
        return res.status(200).json(deletedUser);
    }
    catch (err) {
        return next(err);
    }
}
exports.deleteUserById = deleteUserById;
//# sourceMappingURL=userController.js.map