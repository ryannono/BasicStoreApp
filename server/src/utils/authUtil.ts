// eslint-disable-next-line node/no-extraneous-import
import {User} from '@prisma/client';
import {Response} from 'express';
import {MINUTE, DAY} from './constants';
import {generateAccessToken, generateRefreshToken} from './tokenUtil';

/**
 * Asynchronous function to handle the authentication of a user.
 *
 * This function generates an access token for a given user,
 * sets the token as an HTTP-only cookie on the response,
 * and sends a response back to the client with the user data.
 * If the `withRefreshToken` parameter is true, a refresh token
 * is also generated and set as an HTTP-only cookie.
 *
 * @param user - The User object representing the user to authenticate.
 * @param res - The Express.js response object for sending responses to the client.
 * @param withRefreshToken - Boolean value indicating whether to generate
 *                           and set a refresh token as an HTTP-only cookie.
 *
 * @returns The Express.js response object with the user data in JSON format,
 *          and the access (and optionally refresh) token(s) set as HTTP-only cookies.
 *
 * @throws An error if there was an issue generating the tokens or setting the cookies.
 */
export async function handleAuthentication(
  user: User,
  res: Response,
  withRefreshToken?: boolean
): Promise<Response> {
  // send tokens as cookies
  const accessToken = generateAccessToken(user);
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    maxAge: 20 * MINUTE,
  });

  if (withRefreshToken) {
    const refreshToken = generateRefreshToken(user);
    res.cookie('refreshToken', refreshToken, {httpOnly: true, maxAge: DAY});
  }

  // send user in response body
  return res.status(200).json(user);
}
