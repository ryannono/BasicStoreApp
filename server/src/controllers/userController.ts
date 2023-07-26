import {Request, Response} from 'express';
import {prisma} from '../app';
import {handle500Error} from '../../utils/500errors';
import {MutableUserPayload} from '../../utils/types';

/**
 * Fetch all users from the database.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 *
 * @returns {Response} Response object with the status code and all users.
 * @throws {500} If any error occurs during the operation.
 */ export async function getUsers(req: Request, res: Response) {
  try {
    const allUsers = await prisma.user.findMany();
    res.status(200).json(allUsers);
  } catch (err) {
    handle500Error(res, err);
  }
}

/**
 * Create a new user with the provided request body data.
 *
 * @param {Request} req - Express request object with the body containing user information.
 * @param {Response} res - Express response object.
 *
 * @returns {Response} Response object with the status code and created user.
 * @throws {500} If any error occurs during the operation.
 */ export async function createUser(req: Request, res: Response) {
  try {
    const createdUser = await prisma.user.create({
      data: {
        ...(req.body as MutableUserPayload),
        stripeCustomerId: 'placeholder',
      },
    });
    res.status(200).json(createdUser);
  } catch (err) {
    handle500Error(res, err);
  }
}

/**
 * Fetch a specific user by their id.
 *
 * @param {Request} req - Express request object with the params containing user id.
 * @param {Response} res - Express response object.
 *
 * @returns {Response} Response object with the status code and user data.
 * @throws {404} If the user is not found.
 * @throws {500} If any other error occurs during the operation.
 */
export async function getUserById(req: Request, res: Response) {
  const {id} = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: {id},
    });

    if (!user) {
      res.status(404).json({error: 'User not found'});
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    handle500Error(res, err);
  }
}

/**
 * Update a specific user's data with the provided request body.
 *
 * @param {Request} req - Express request object with the params containing user id and body with new data.
 * @param {Response} res - Express response object.
 *
 * @returns {Response} Response object with the status code and updated user data.
 * @throws {500} If any error occurs during the operation.
 */
export async function updateUserById(req: Request, res: Response) {
  const {id} = req.params;

  try {
    const updatedUser = await prisma.user.update({
      where: {id},
      data: req.body as MutableUserPayload,
    });

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({error: 'An error occurred while updating the user'});
  }
}

/**
 * Delete a specific user by their id.
 *
 * @param {Request} req - Express request object with the params containing user id.
 * @param {Response} res - Express response object.
 *
 * @returns {Response} Response object with the status code and deleted user data.
 * @throws {500} If any error occurs during the operation.
 */
export async function deleteUser(req: Request, res: Response) {
  const {id} = req.params;

  try {
    const deletedUser = await prisma.user.delete({
      where: {id},
    });

    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(500).json({error: 'An error occurred while deleting the user'});
  }
}
