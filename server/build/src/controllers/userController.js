"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUserById = exports.getUserById = exports.createUser = exports.getUsers = void 0;
const app_1 = require("../app");
const _500errorsUtil_1 = require("../../utils/500errorsUtil");
const encryptionUtil_1 = require("../../utils/encryptionUtil");
/**
 * Fetch all users from the database.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 *
 * @returns {Response} Response object with the status code and all users.
 * @throws {500} If any error occurs during the operation.
 */
async function getUsers(req, res) {
    try {
        const allUsers = await app_1.prisma.user.findMany();
        res.status(200).json(allUsers);
    }
    catch (err) {
        (0, _500errorsUtil_1.handle500Error)(res, err);
    }
}
exports.getUsers = getUsers;
/**
 * Create a new user with the provided request body data.
 *
 * @param {Request} req - Express request object with the body containing user information.
 * @param {Response} res - Express response object.
 *
 * @returns {Response} Response object with the status code and created user.
 * @throws {500} If any error occurs during the operation.
 */
async function createUser(req, res) {
    const { password, ...otherData } = req.body;
    try {
        const passwordHash = await (0, encryptionUtil_1.hashPassword)(password);
        const createdUser = await app_1.prisma.user.create({
            data: {
                password: passwordHash,
                stripeCustomerId: 'placeholder',
                ...otherData,
            },
        });
        res.status(200).json(createdUser);
    }
    catch (err) {
        (0, _500errorsUtil_1.handle500Error)(res, err);
    }
}
exports.createUser = createUser;
/**
 * Fetch a specific user by their id.
 *
 * @param {Request} req - Express request object with the params containing user id.
 * @param {Response} res - Express response object.
 *
 * @returns {Response} Response object with the status code and user data.
 * @throws {404} If the user is not found.
 * @throws {500} If any other error occurs during the operation.
 */
async function getUserById(req, res) {
    const { id } = req.params;
    try {
        const user = await app_1.prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
        }
        else {
            res.status(200).json(user);
        }
    }
    catch (err) {
        (0, _500errorsUtil_1.handle500Error)(res, err);
    }
}
exports.getUserById = getUserById;
/**
 * Update a specific user's data with the provided request body.
 *
 * @param {Request} req - Express request object with the params containing user id and body with new data.
 * @param {Response} res - Express response object.
 *
 * @returns {Response} Response object with the status code and updated user data.
 * @throws {500} If any error occurs during the operation.
 */
async function updateUserById(req, res) {
    const { id } = req.params;
    try {
        const updatedUser = await app_1.prisma.user.update({
            where: { id },
            data: req.body,
        });
        res.status(200).json(updatedUser);
    }
    catch (err) {
        (0, _500errorsUtil_1.handle500Error)(res, err);
    }
}
exports.updateUserById = updateUserById;
/**
 * Delete a specific user by their id.
 *
 * @param {Request} req - Express request object with the params containing user id.
 * @param {Response} res - Express response object.
 *
 * @returns {Response} Response object with the status code and deleted user data.
 * @throws {500} If any error occurs during the operation.
 */
async function deleteUser(req, res) {
    const { id } = req.params;
    try {
        const deletedUser = await app_1.prisma.user.delete({
            where: { id },
        });
        res.status(200).json(deletedUser);
    }
    catch (err) {
        (0, _500errorsUtil_1.handle500Error)(res, err);
    }
}
exports.deleteUser = deleteUser;
//# sourceMappingURL=userController.js.map