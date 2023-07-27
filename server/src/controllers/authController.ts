import {NextFunction, Request, Response} from 'express';
import {LoginUserPayload, MutableUserPayload} from '../utils/types';
import {prisma} from '../app';
import {hashPassword, verifyPassword} from '../utils/encryptionUtil';
import {DAY, MINUTE} from '../utils/constants';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from '../utils/tokenUtil';

/**
 * Asynchronous function to register a new user.
 *
 * This function validates if a user with the provided email exists.
 * If it doesn't, the function will hash the password,
 * create a new Stripe customer ID (placeholder in this example),
 * and store the new user in the database.
 *
 * @param req - The Express.js request object. The request body
 * should be a user payload.
 * @param res - The Express.js response object.
 * @param next - The next middleware function.
 *
 * @returns The created user in JSON format.
 * @throws An error if there was an issue creating the user.
 */
export async function registerUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {password, ...otherData} = req.body as MutableUserPayload;

    // check existing user
    const existingUser = await prisma.user.findUnique({
      where: {email: otherData.email},
    });
    if (existingUser) {
      return res
        .status(400)
        .json({error: 'A user with this email already exists'});
    }

    // Hash the plain text password
    const passwordHash = await hashPassword(password);

    // Create a new Stripe customer for the user
    const stripeCustomerId = 'placeholder';

    const createdUser = await prisma.user.create({
      data: {
        password: passwordHash,
        stripeCustomerId,
        ...otherData,
      },
    });
    return res.status(200).json(createdUser);
  } catch (err) {
    return next(err);
  }
}

/**
 * Asynchronous function to log in a user.
 *
 * This function will check if the user exists, and if it does,
 * verifies the password and generates an access token and a refresh token.
 * It will then send the tokens as cookies and returns the user data.
 *
 * @param req - The Express.js request object. The request body
 * should contain email and password of the user.
 * @param res - The Express.js response object.
 * @param next - The next middleware function.
 *
 * @returns The user data in JSON format.
 * @throws An error if there was an issue logging in the user.
 */
export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {email, password} = req.body as LoginUserPayload;

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

    // send tokens as cookies
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: 20 * MINUTE,
    });
    res.cookie('refreshToken', refreshToken, {httpOnly: true, maxAge: DAY});

    // send accessToken and user in response body
    return res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
}

/**
 * Asynchronous function to refresh a user's access token.
 *
 * This function will validate the refresh token provided in the
 * request cookies. If the token is valid and exists in the database,
 * it will generate a new access token and return it as a HttpOnly
 * cookie in the response.
 *
 * @param req - The Express.js request object. The refresh token
 * should be provided in the request cookies.
 * @param res - The Express.js response object.
 * @param next - The next middleware function.
 *
 * @returns A success message and a new access token in JSON format.
 * @throws An error if there was an issue refreshing the token.
 */
export async function refreshUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Get refresh token from the request cookies
    const refreshToken = req.cookies.refreshToken;

    // If no refresh token, return an error response
    if (!refreshToken) {
      return res.status(401).json({error: 'Refresh token is missing'});
    }

    // Check if the provided refresh token exists in the database
    const tokenInDb = await prisma.refreshToken.findUnique({
      where: {token: refreshToken},
      include: {tokenUser: true},
    });

    // If the token does not exist in the DB, return an error response
    if (!tokenInDb) {
      return res.status(403).json({
        error: "The used token's access was either revoked or never existed",
      });
    }

    // Verify the refresh token and extract user data
    const userData = await verifyToken(refreshToken);

    // If user data does not match with the one in the DB, return an error response
    if (!userData || userData.id !== tokenInDb.tokenUser.id) {
      return res.status(403).json({
        error: 'Refresh token is invalid',
      });
    }

    // If the token is valid, generate a new access token
    const accessToken = generateAccessToken(tokenInDb.tokenUser);

    // Return the new access token in the response as a secure HttpOnly cookie
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: 20 * MINUTE,
    });

    // Send a success response
    return res
      .status(200)
      .json({message: 'Access token refreshed successfully'});
  } catch (err) {
    return next(err);
  }
}

/**
 * Asynchronous function to log out a user.
 *
 * This function will delete the refresh token from the database
 * and clear the access token and refresh token cookies.
 *
 * @param req - The Express.js request object. The request body
 * should contain the refresh token.
 * @param res - The Express.js response object.
 * @param next - The next middleware function.
 *
 * @returns A success message in JSON format.
 * @throws An error if there was an issue logging out the user.
 */
export async function logoutUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Get refresh token from the request cookies
    const refreshToken = req.cookies.refreshToken;

    // Remove token from database
    await prisma.refreshToken.delete({
      where: {token: refreshToken},
    });

    // Clear the access and refresh token cookies
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    // Send response
    res.status(200).json({message: 'User logged out successfully'});
  } catch (err) {
    return next(err);
  }
}

/**
 * Asynchronous function to reset a user's password.
 *
 * This function will check if the user exists, and if it does,
 * hashes the new password and updates it in the database.
 * It will then clear the access token and refresh token cookies.
 *
 * @param req - The Express.js request object. The request body
 * should contain the email and the new password.
 * @param res - The Express.js response object.
 * @param next - The next middleware function.
 *
 * @returns A success message in JSON format.
 * @throws An error if there was an issue resetting the password.
 */
export async function resetPassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {email, newPassword} = req.body;

    // identify the user
    const user = await prisma.user.findUnique({where: {email}});
    if (!user) {
      return res.status(404).json({error: 'User not found'});
    }

    // hash the new password
    const passwordHash = await hashPassword(newPassword);

    // update the user's password in the database
    await prisma.user.update({
      where: {email},
      data: {password: passwordHash},
    });

    // Clear the access and refresh token cookies
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    // Send response
    return res.status(200).json({message: 'Password reset successfully'});
  } catch (err) {
    return next(err);
  }
}
