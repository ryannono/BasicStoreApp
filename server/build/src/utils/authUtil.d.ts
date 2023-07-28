import { User } from '@prisma/client';
import { Response } from 'express';
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
export declare function handleAuthentication(user: User, res: Response, withRefreshToken?: boolean): Promise<Response>;
