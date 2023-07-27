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
export declare function generateAccessToken({ id, email, firstName, lastName }: User): string;
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
export declare function generateRefreshToken({ id, email, firstName, lastName }: User): string;
/**
 * Asynchronous function to verify a given JSON Web Token (JWT).
 *
 * This function will use JWT's verify method to validate the token
 * against the refresh token secret defined in the environment variables.
 *
 * @param token - The JWT that needs to be verified.
 *
 * @returns A Promise that either:
 *   1. Resolves with the user payload data (of type TokenUserPayload),
 *      which includes properties such as the user ID, username, email,
 *      first name and last name, if the token is valid.
 *   2. Resolves with null, indicating that the token is invalid or
 *      has been tampered with.
 */
export declare function verifyToken(token: string): Promise<TokenUserPayload | null>;
