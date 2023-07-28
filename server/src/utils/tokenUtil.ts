/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line node/no-extraneous-import
import {User} from '@prisma/client';
import jwt, {JwtPayload} from 'jsonwebtoken';
import {TokenUserPayload} from '../types/userTypes';

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
export function generateAccessToken({id, email, firstName, lastName}: User) {
  return jwt.sign(
    {id, email, firstName, lastName},
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: '20m',
    }
  );
}

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
export function generateRefreshToken({id, email, firstName, lastName}: User) {
  return jwt.sign(
    {id, email, firstName, lastName},
    process.env.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: '14d',
    }
  );
}

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
export function verifyToken(token: string): Promise<TokenUserPayload | null> {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET!,
      (err, tokenUserPayloadAndJwt) => {
        if (err) {
          resolve(null);
        } else {
          const {iat, exp, ...tokenUserPayload} =
            tokenUserPayloadAndJwt as TokenUserPayload &
              Pick<JwtPayload, 'iat' | 'exp'>;
          resolve(tokenUserPayload);
        }
      }
    );
  });
}
