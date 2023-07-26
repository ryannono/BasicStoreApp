import { Request, Response } from 'express';
/**
 * Fetch all users from the database.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 *
 * @returns {Response} Response object with the status code and all users.
 * @throws {500} If any error occurs during the operation.
 */
export declare function getUsers(req: Request, res: Response): Promise<void>;
/**
 * Create a new user with the provided request body data.
 *
 * @param {Request} req - Express request object with the body containing user information.
 * @param {Response} res - Express response object.
 *
 * @returns {Response} Response object with the status code and created user.
 * @throws {500} If any error occurs during the operation.
 */
export declare function createUser(req: Request, res: Response): Promise<void>;
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
export declare function getUserById(req: Request, res: Response): Promise<void>;
/**
 * Update a specific user's data with the provided request body.
 *
 * @param {Request} req - Express request object with the params containing user id and body with new data.
 * @param {Response} res - Express response object.
 *
 * @returns {Response} Response object with the status code and updated user data.
 * @throws {500} If any error occurs during the operation.
 */
export declare function updateUserById(req: Request, res: Response): Promise<void>;
/**
 * Delete a specific user by their id.
 *
 * @param {Request} req - Express request object with the params containing user id.
 * @param {Response} res - Express response object.
 *
 * @returns {Response} Response object with the status code and deleted user data.
 * @throws {500} If any error occurs during the operation.
 */
export declare function deleteUser(req: Request, res: Response): Promise<void>;
