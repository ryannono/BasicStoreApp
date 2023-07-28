import {Request, Response, NextFunction} from 'express';
// eslint-disable-next-line node/no-extraneous-import
import {PrismaClient, AddressPayload} from '@prisma/client';
import {TokenUserPayload} from '../types/userTypes';
import {prisma} from '../app';

/**
 * Asynchronous function to fetch all saved addresses for a specific user.
 *
 * This function retrieves the user ID from the incoming request's body,
 * uses it to find the user in the database and then fetches all of the
 * user's saved addresses. If successful, it sends a JSON response containing
 * all of the user's saved addresses.
 *
 * If an unexpected error occurs during the operation, the error is passed to
 * the next middleware function in the chain for error handling.
 *
 * This function should be used in routes where the retrieval of all saved
 * addresses for a specific user is required.
 *
 * @param req - Express.js request object containing the client request information.
 * @param res - Express.js response object for sending responses to the client.
 * @param next - Callback function to invoke the next middleware function in the chain.
 *
 * @throws {Error} When an unexpected error occurs during the operation.
 *
 * @returns {void} This function does not have a return value.
 */
export async function getAllAddresses(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {id} = req.body.user as TokenUserPayload;

    const addresses = await prisma.user.findUnique({
      where: {id},
      select: {savedAddresses: true},
    });

    return res.status(200).json(addresses);
  } catch (err) {
    return next(err);
  }
}

/**
 * Asynchronous function to create a new address for a specific user.
 *
 * This function retrieves the user ID from the incoming request's body,
 * along with the address details, and uses this data to create a new address
 * in the database associated with the user. If successful, it sends a JSON
 * response containing the newly created address.
 *
 * If an unexpected error occurs during the operation, the error is passed to
 * the next middleware function in the chain for error handling.
 *
 * @param req - Express.js request object containing the client request information.
 * @param res - Express.js response object for sending responses to the client.
 * @param next - Callback function to invoke the next middleware function in the chain.
 *
 * @throws {Error} When an unexpected error occurs during the operation.
 *
 * @returns {void} This function does not have a return value.
 */
export async function createAddress(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {id} = req.body.user as TokenUserPayload;

    const newAddress = await prisma.user.update({
      where: {id},
      data: {
        savedAddresses: {
          create: {...(req.body as AddressPayload['scalars'])},
        },
      },
    });

    return res.status(201).json(newAddress);
  } catch (err) {
    return next(err);
  }
}

/**
 * Asynchronous function to retrieve a specific address for a user.
 *
 * This function uses the provided address ID to retrieve the corresponding
 * address from the database. If successful, it sends a JSON response
 * containing the requested address.
 *
 * If the specified address does not exist, a 404 error is returned. If an
 * unexpected error occurs during the operation, the error is passed to the
 * next middleware function in the chain for error handling.
 *
 * @param req - Express.js request object containing the client request information.
 * @param res - Express.js response object for sending responses to the client.
 * @param next - Callback function to invoke the next middleware function in the chain.
 *
 * @throws {Error} When an unexpected error occurs during the operation.
 *
 * @returns {void} This function does not have a return value.
 */
export async function getAddress(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {id} = req.params;

    const address = await prisma.address.findUnique({
      where: {
        id,
      },
    });

    if (!address) {
      return res.status(404).json({error: 'Address not found'});
    }

    return res.status(200).json(address);
  } catch (err) {
    return next(err);
  }
}

/**
 * Asynchronous function to update a specific address for a user.
 *
 * This function uses the provided address ID and the new address details to
 * update the corresponding address in the database. If successful, it sends a
 * JSON response containing the updated address.
 *
 * If an unexpected error occurs during the operation, the error is passed to
 * the next middleware function in the chain for error handling.
 *
 * @param req - Express.js request object containing the client request information.
 * @param res - Express.js response object for sending responses to the client.
 * @param next - Callback function to invoke the next middleware function in the chain.
 *
 * @throws {Error} When an unexpected error occurs during the operation.
 *
 * @returns {void} This function does not have a return value.
 */
export async function updateAddress(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {id} = req.params;

    const updatedAddress = await prisma.address.update({
      where: {
        id,
      },
      data: {...(req.body as AddressPayload['scalars'])},
    });

    return res.status(200).json(updatedAddress);
  } catch (err) {
    return next(err);
  }
}

/**
 * Asynchronous function to delete a specific address for a user.
 *
 * This function uses the provided address ID to delete the corresponding
 * address from the database. If successful, it ends the request-response
 * cycle with a 204 status code, indicating that the request has succeeded
 * but does not include an entity-body in the response.
 *
 * If an unexpected error occurs during the operation, the error is passed to
 * the next middleware function in the chain for error handling.
 *
 * @param req - Express.js request object containing the client request information.
 * @param res - Express.js response object for sending responses to the client.
 * @param next - Callback function to invoke the next middleware function in the chain.
 *
 * @throws {Error} When an unexpected error occurs during the operation.
 *
 * @returns {void} This function does not have a return value.
 */
export async function deleteAddress(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {id} = req.params;

    await prisma.address.delete({
      where: {
        id,
      },
    });

    return res.status(204).end();
  } catch (err) {
    return next(err);
  }
}
