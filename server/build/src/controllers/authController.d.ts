import { NextFunction, Request, Response } from 'express';
/**
 * Asynchronous function to register a new user.
 *
 * This function takes in request data, checks if a user with the provided
 * email already exists, hashes the password, creates a new Stripe customer
 * ID, and creates a new user in the database. Upon successful creation of
 * the user, the user is authenticated and tokens are set in the HTTP-only
 * cookies on the response. An existing cart is also associated with the
 * user in the process of user creation.
 *
 * @param req - The Express.js request object. The request body should contain
 *              user data including email and password.
 * @param res - The Express.js response object for sending responses to the client.
 * @param next - The next middleware function.
 *
 * @returns The response object with the user data in JSON format,
 *          and the access and refresh tokens set as HTTP-only cookies.
 * @throws An error if there was an issue creating the user,
 *         generating the tokens, or setting the cookies.
 */
export declare function registerUser(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
/**
 * Asynchronous function to log in a user.
 *
 * This function takes in request data, verifies if the user exists,
 * checks the password and then authenticates the user. The process of
 * authentication includes generating tokens and setting them in the
 * HTTP-only cookies on the response.
 *
 * @param req - The Express.js request object. The request body should
 *              contain the email and password of the user.
 * @param res - The Express.js response object for sending responses to the client.
 * @param next - The next middleware function.
 *
 * @returns The response object with the user data in JSON format, and the
 *          access and refresh tokens set as HTTP-only cookies.
 * @throws An error if there was an issue identifying the user, verifying the
 *         password, or during the authentication process.
 */
export declare function loginUser(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
/**
 * Asynchronous function to refresh the access token for a user.
 *
 * This function retrieves the refresh token from the incoming request's cookies,
 * verifies its existence in the database, and checks if the decoded user data
 * matches the user data associated with the token in the database. If all checks
 * pass, it authenticates the user by sending a new access token in an HTTP-only
 * cookie.
 *
 * If the refresh token is missing, or if it's not verified or doesn't exist in
 * the database, a JSON response with an error message is sent and the middleware
 * chain is interrupted.
 *
 * This function should be used in routes where token refreshing is required.
 *
 * @param req - Express.js request object containing the client request information.
 * @param res - Express.js response object for sending responses to the client.
 * @param next - Callback function to invoke the next middleware function in the chain.
 *
 * @throws {Error} When an unexpected error occurs during token verification or
 *                 user authentication.
 *
 * @returns {Response} This function returns the response object with a new access
 *                     token in an HTTP-only cookie.
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
