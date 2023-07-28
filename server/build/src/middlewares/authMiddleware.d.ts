import { Request, Response, NextFunction } from 'express';
/**
 * Asynchronous middleware function to authenticate access based on a valid access token.
 *
 * This function retrieves the access token from the incoming request's cookies,
 * verifies the token, and checks whether the user is authenticated.
 * If the access token is missing, or if it's not verified, a JSON response with an
 * error message is sent and the middleware chain is interrupted. If the token is
 * valid, the user information extracted from the token is added to the res local variables,
 * and the next middleware function in the chain is invoked.
 *
 * This function should be used in routes where authenticated access is required.
 *
 * @param req - Express.js request object containing the client request information.
 * @param res - Express.js response object for sending responses to the client.
 * @param next - Callback function to invoke the next middleware function in the chain.
 *
 * @throws {Error} When an unexpected error occurs during token verification.
 *
 * @returns {void} This function does not have a return value.
 */
export declare function authenticateAccessToken(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
export declare function verifyAdmin(req: Request, res: Response, next: NextFunction): void | Response<any, Record<string, any>>;
