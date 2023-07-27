import { NextFunction, Request, Response } from 'express';
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
export declare function getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
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
export declare function getUserById(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
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
export declare function updateUserById(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
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
export declare function deleteUserById(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
