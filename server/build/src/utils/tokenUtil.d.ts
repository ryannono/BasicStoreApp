import { TokenUserPayload, UserWithCart } from '../types/userTypes';
export declare function isTokenUserPayload(user: UserWithCart | TokenUserPayload): user is TokenUserPayload;
/**
 * The `generateAccessToken` function creates a new JSON Web Token (JWT)
 * which can be used as an access token for authenticating a user.
 *
 * @param {User} user - The user object from which token payload will be generated.
 *
 * @returns {string} - Returns a JWT as a string.
 *
 * The function uses the 'sign' method from the 'jsonwebtoken' library
 * to create a new token with the user's data (id, email, firstName, lastName)
 * and the secret key from the environment variable 'ACCESS_TOKEN_SECRET'.
 * The token will expire in 20 minutes ('20m').
 */
export declare function generateAccessToken(userData: UserWithCart | TokenUserPayload): string;
/**
 * The `generateRefreshToken` function creates a new JSON Web Token (JWT)
 * which can be used as a refresh token for refreshing the user's access token.
 *
 * @param {User} user - The user object from which token payload will be generated.
 *
 * @returns {string} - Returns a JWT as a string.
 *
 * This function uses the 'sign' method from the 'jsonwebtoken' library
 * to create a new token with the user's data (id, email, firstName, lastName)
 * and the secret key from the environment variable 'REFRESH_TOKEN_SECRET'.
 * The token will expire in 14 days ('14d').
 */
export declare function generateRefreshToken(userData: UserWithCart | TokenUserPayload): string;
/**
 * Asynchronous function to verify a given JSON Web Token (JWT).
 *
 * This function will use JWT's verify method to validate the token
 * against either the access token secret or refresh token secret,
 * depending on the `tokenType` parameter, defined in the environment variables.
 *
 * @param token - The JWT that needs to be verified.
 * @param tokenType - The type of token to verify, either 'access' or 'refresh'.
 *
 * @returns A Promise that either:
 *   1. Resolves with the user payload data (of type TokenUserPayload),
 *      which includes properties such as the user ID, email, first name,
 *      and last name, if the token is valid.
 *   2. Resolves with null, indicating that the token is invalid or
 *      has been tampered with.
 */
export declare function verifyToken(token: string, tokenType: 'access' | 'refresh'): Promise<TokenUserPayload | null>;
/**
 * Deletes all expired refresh tokens from the database.
 *
 * @param {PrismaClient} prisma - An instance of PrismaClient which is used to perform database operations.
 *
 * This function works by getting the current date and time, then deleting all refresh tokens in the database
 * where the expiration date is less than or equal to the current time. This means it removes all tokens that have expired.
 *
 * If an error occurs while deleting the tokens, the error is logged to the console.
 *
 * @returns {Promise<void>} A Promise that resolves when the deletion is completed. This Promise doesn't resolve with any value.
 */
export declare function deleteExpiredRefreshTokens(): Promise<void>;
