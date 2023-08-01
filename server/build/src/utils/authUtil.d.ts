import { Response } from 'express';
import { UserWithCart } from '../types';
import { TokenUserPayload } from '../types/userTypes';
/**
 * Asynchronous function to handle user authentication.
 *
 * This function generates and sends an access token (and optionally a refresh token)
 * as HTTP-only cookies. The access token has a lifespan of 20 minutes, while the
 * refresh token (if generated) lasts for 14 days.
 *
 * If the `withRefreshToken` parameter is true, the function will store the refresh
 * token in the database along with the expiry date and the user's ID.
 *
 * It also sends a JSON response containing the authenticated user's ID, email,
 * first name, and last name.
 *
 * @param user - The user to authenticate.
 * @param res - Express.js response object for sending responses to the client.
 * @param withRefreshToken - Boolean flag indicating whether to generate and send a
 * refresh token along with the access token. Optional and defaults to false.
 *
 * @returns {Promise<Response>} Promise object represents the HTTP response.
 */
export declare function handleAuthentication(user: UserWithCart | TokenUserPayload, res: Response, withRefreshToken?: boolean): Promise<Response>;
/**
 * Function to handle user deauthentication. It clears the access and refresh token cookies.
 *
 * @param {Response} res - The response object from Express.js.
 *
 * @returns {Response} - The response object with the cleared cookies and a success message.
 */
export declare function handleDeauthentication(res: Response): Response<any, Record<string, any>>;
