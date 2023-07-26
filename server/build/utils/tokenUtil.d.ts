import { User } from '@prisma/client';
import { TokenUserPayload } from './types';
/**
 * Generate an access token for a given user. The token will contain the user's ID,
 * username, email, and names.
 *
 * @param {User} user - The user object which should include id, username, email, firstName, lastName.
 *
 * @returns {string} The generated JSON Web Token (JWT).
 *
 * @throws {Error} If any error occurs during the token generation.
 */
export declare function generateAccessToken({ id, username, email, firstName, lastName, }: User): string;
/**
 * Generate a refresh token for a given user. The token will contain the user's ID,
 * username, email, and names.
 *
 * @param {User} user - The user object which should include id, username, email, firstName, lastName.
 *
 * @returns {string} The generated JSON Web Token (JWT).
 *
 * @throws {Error} If any error occurs during the token generation.
 */
export declare function generateRefreshToken({ id, username, email, firstName, lastName, }: User): string;
/**
 * Verify a given JSON Web Token (JWT). If the token is valid, the function will return
 * the user data embedded in the token.
 *
 * @param {string} token - The JWT to be verified.
 *
 * @returns {Promise<TokenUserPayload>} A promise that resolves with the user data if the token is valid.
 * @throws {Error} If the token is not valid, the promise is rejected with an error.
 */
export declare function verifyToken(token: string): Promise<TokenUserPayload>;
