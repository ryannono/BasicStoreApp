// eslint-disable-next-line node/no-extraneous-import
import {Response} from 'express';
import {MINUTE, DAY} from './constants';
import {
  generateAccessToken,
  generateRefreshToken,
  isTokenUserPayload,
} from './tokenUtil';
import {prisma} from '../app';
import {getEssentialUserProps} from './userUtil';
import {UserWithCart} from '../types';
import {TokenUserPayload} from '../types/userTypes';

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
export async function handleAuthentication(
  user: UserWithCart | TokenUserPayload,
  res: Response,
  withRefreshToken?: boolean
): Promise<Response> {
  // send tokens as cookies
  const accessToken = generateAccessToken(user);
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    domain:
      process.env.NODE_ENV !== 'production' ? 'localhost' : '.railway.app',
    maxAge: 20 * MINUTE,
  });

  if (withRefreshToken) {
    const refreshToken = generateRefreshToken(user);

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        expiresAt: new Date(Date.now() + 14 * DAY),
        tokenUser: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      domain:
        process.env.NODE_ENV !== 'production' ? 'localhost' : '.railway.app',
      maxAge: 14 * DAY,
    });
  }

  // send user in response body
  return res.json(
    isTokenUserPayload(user) ? user : getEssentialUserProps(user)
  );
}
