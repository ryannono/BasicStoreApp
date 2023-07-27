/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line node/no-extraneous-import
import {User} from '@prisma/client';
import jwt, {JwtPayload} from 'jsonwebtoken';
import {TokenUserPayload} from './types';

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
export function generateAccessToken({
  id,
  username,
  email,
  firstName,
  lastName,
}: User) {
  return jwt.sign(
    {id, username, email, firstName, lastName},
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: '20m',
    }
  );
}

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
export function generateRefreshToken({
  id,
  username,
  email,
  firstName,
  lastName,
}: User) {
  return jwt.sign(
    {id, username, email, firstName, lastName},
    process.env.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: '14d',
    }
  );
}

/**
 * Verify a given JSON Web Token (JWT). If the token is valid, the function will return
 * the user data embedded in the token.
 *
 * @param {string} token - The JWT to be verified.
 *
 * @returns {Promise<TokenUserPayload>} A promise that resolves with the user data if the token is valid.
 * @throws {Error} If the token is not valid, the promise is rejected with an error.
 */
export function verifyToken(token: string): Promise<TokenUserPayload> {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET as string,
      (err, tokenUserPayloadAndJwt) => {
        if (err) {
          reject(new Error(`error: ${err.message}`));
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
