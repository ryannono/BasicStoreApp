import {NextFunction, Request, Response} from 'express';
import {AuthUserPayload} from '../utils/types';
import {prisma} from '../app';
import {verifyPassword} from '../utils/encryptionUtil';
import {DAY} from '../utils/constants';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from '../utils/tokenUtil';

/**
 * Asynchronous Express middleware for user login.
 * The function identifies the user, verifies the password, generates access and refresh tokens.
 * If successful, the refresh token is sent as an httpOnly cookie, and the access token and user data are sent in the response body.
 * If an error occurs, or if the username/password are invalid, the error is passed on to the next middleware for error handling.
 *
 * @param {Request} req - The Express request object, expecting the user's username and password in the body.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the Express pipeline.
 *
 * @returns {Promise<void>} Nothing.
 *
 * @throws {Error} If any error occurs during the user login process.
 */
export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {email, password} = req.body as AuthUserPayload;

  try {
    // identify the user
    const user = await prisma.user.findUnique({where: {email}});
    if (!user) return res.status(401).json({error: 'Invalid email'});

    // verify the password
    const validPassword = await verifyPassword(password, user.password);
    if (!validPassword) {
      return res.status(401).json({error: 'Invalid password'});
    }

    // get tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // send refresh token as cookie
    res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: DAY});

    // send accessToken and user in response body
    return res.status(200).json({accessToken, user});
  } catch (err) {
    return next(err);
  }
}
