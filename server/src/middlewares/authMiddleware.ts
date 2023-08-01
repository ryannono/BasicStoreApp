import {Request, Response, NextFunction} from 'express';
import {verifyToken} from '../utils/tokenUtil';
import {TokenUserPayload} from '../types/userTypes';

/**
 * Asynchronous middleware function to authenticate access based on a valid access token.
 *
 * This function retrieves the access token from the incoming request's cookies,
 * verifies the token, and checks whether the user is authenticated.
 * If the access token is missing, or if it's not verified, a JSON response with an
 * error message is sent and the middleware chain is interrupted. If the token is
 * valid, the user information extracted from the token is added to the res local variables,
 * and the next middleware function in the chain is invoked.
 *
 * This function should be used in routes where authenticated access is required.
 *
 * @param req - Express.js request object containing the client request information.
 * @param res - Express.js response object for sending responses to the client.
 * @param next - Callback function to invoke the next middleware function in the chain.
 *
 * @throws {Error} When an unexpected error occurs during token verification.
 *
 * @returns {void} This function does not have a return value.
 */
export async function authenticateAccessToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // get accessToken from request
    const accessToken = req.cookies.accessToken;
    const noAccess = () => {
      return res.status(401).json({error: 'User does not have access'});
    };

    // check token exists
    if (!accessToken) return noAccess();
    console.log('accessToken');

    // verify token
    const verifiedUser = await verifyToken(accessToken, 'access');
    if (!verifiedUser) return noAccess();

    // pass user information to next middleware
    res.locals.user = verifiedUser;

    // next function
    return next();
  } catch (err) {
    return next(err);
  }
}

export function verifyAdmin(req: Request, res: Response, next: NextFunction) {
  const user: TokenUserPayload = res.locals.user;
  if (!user) return next(new Error('Authenticate access token first'));
  if (user.role !== 'ADMIN') {
    return res.status(401).json({error: 'Access denied'});
  }
  return next();
}
