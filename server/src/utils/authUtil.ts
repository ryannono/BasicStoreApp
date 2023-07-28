// eslint-disable-next-line node/no-extraneous-import
import {User} from '@prisma/client';
import {Response} from 'express';
import {MINUTE, DAY} from './constants';
import {generateAccessToken, generateRefreshToken} from './tokenUtil';
import {prisma} from '../app';

/**
 * Asynchronous function to handle user authentication.
 *
 * This function generates and sends an access token (and optionally a refresh token)
 * as HTTP-only cookies. The access token has a lifespan of 20 minutes, while the
 * refresh token (if generated) lasts for one day.
 *
 * It also sends a JSON response containing the authenticated user's ID, email,
 * and name.
 *
 * @param user - The user to authenticate.
 * @param res - Express.js response object for sending responses to the client.
 * @param withRefreshToken - Boolean flag indicating whether to generate and send a
 * refresh token. Optional, and defaults to false.
 *
 * @returns {Promise<Response>} Promise object represents the HTTP response.
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
      maxAge: 14 * DAY,
    });
  }

  // send user in response body
  const {id, email, firstName, lastName} = user;
  return res.status(200).json({id, email, firstName, lastName});
}
