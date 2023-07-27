import { NextFunction, Request, Response } from 'express';
/**
 * Asynchronous function to register a new user.
 *
 * This function validates if a user with the provided email exists.
 * If it doesn't, the function will hash the password,
 * create a new Stripe customer ID (placeholder in this example),
 * and store the new user in the database.
 *
 * @param req - The Express.js request object. The request body
 * should be a user payload.
 * @param res - The Express.js response object.
 * @param next - The next middleware function.
 *
 * @returns The created user in JSON format.
 * @throws An error if there was an issue creating the user.
 */
export declare function registerUser(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
/**
 * Asynchronous function to log in a user.
 *
 * This function will check if the user exists, and if it does,
 * verifies the password and generates an access token and a refresh token.
 * It will then send the tokens as cookies and returns the user data.
 *
 * @param req - The Express.js request object. The request body
 * should contain email and password of the user.
 * @param res - The Express.js response object.
 * @param next - The next middleware function.
 *
 * @returns The user data in JSON format.
 * @throws An error if there was an issue logging in the user.
 */
export declare function loginUser(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
/**
 * Asynchronous function to refresh a user's access token.
 *
 * This function will validate the refresh token provided in the
 * request cookies. If the token is valid and exists in the database,
 * it will generate a new access token and return it as a HttpOnly
 * cookie in the response.
 *
 * @param req - The Express.js request object. The refresh token
 * should be provided in the request cookies.
 * @param res - The Express.js response object.
 * @param next - The next middleware function.
 *
 * @returns A success message and a new access token in JSON format.
 * @throws An error if there was an issue refreshing the token.
 */
export declare function refreshUser(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
/**
 * Asynchronous function to log out a user.
 *
 * This function will delete the refresh token from the database
 * and clear the access token and refresh token cookies.
 *
 * @param req - The Express.js request object. The request body
 * should contain the refresh token.
 * @param res - The Express.js response object.
 * @param next - The next middleware function.
 *
 * @returns A success message in JSON format.
 * @throws An error if there was an issue logging out the user.
 */
export declare function logoutUser(req: Request, res: Response, next: NextFunction): Promise<void>;
/**
 * Asynchronous function to reset a user's password.
 *
 * This function will check if the user exists, and if it does,
 * hashes the new password and updates it in the database.
 * It will then clear the access token and refresh token cookies.
 *
 * @param req - The Express.js request object. The request body
 * should contain the email and the new password.
 * @param res - The Express.js response object.
 * @param next - The next middleware function.
 *
 * @returns A success message in JSON format.
 * @throws An error if there was an issue resetting the password.
 */
export declare function resetPassword(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
