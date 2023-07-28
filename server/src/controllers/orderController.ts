import {Request, Response, NextFunction} from 'express';
import {prisma} from '../app';

/**
 * Retrieves all orders.
 *
 * This function handles the GET request to retrieve all orders from the database.
 * It fetches all orders and their associated items, shipping address, and user data.
 *
 * @async
 * @param {Request} req - The incoming HTTP request.
 * @param {Response} res - The outgoing HTTP response. The response body will
 *                         contain all orders if the operation is successful.
 * @param {NextFunction} next - Express.js next function.
 * @throws Will throw an error if the operation fails.
 * @returns {Promise<Response>} A Promise that resolves to the Express.js
 *                              response object.
 */
export async function getAllOrders(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const allOrders = await prisma.order.findMany({
      include: {items: true, shippingAddress: true, user: true},
    });
    return res.status(200).json(allOrders);
  } catch (err) {
    return next(err);
  }
}

/**
 * Retrieves an order by its ID.
 *
 * This function handles the GET request to retrieve a specific order by its ID.
 * It fetches the order and its associated items, shipping address, and user data.
 *
 * @async
 * @param {Request} req - The incoming HTTP request. The request parameters should
 *                        contain the ID of the order to be retrieved.
 * @param {Response} res - The outgoing HTTP response. The response body will
 *                         contain the retrieved order if the operation is successful.
 * @param {NextFunction} next - Express.js next function.
 * @throws Will throw an error if the operation fails.
 * @returns {Promise<Response>} A Promise that resolves to the Express.js
 *                              response object.
 */
export async function getOrderById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {id} = req.params;

  try {
    const order = await prisma.order.findUnique({
      where: {id},
      include: {items: true, shippingAddress: true, user: true},
    });

    if (!order) return res.status(404).json({error: 'Order not found'});
    return res.status(200).json(order);
  } catch (err) {
    return next(err);
  }
}

/**
 * Deletes an order by its ID.
 *
 * This function handles the DELETE request to remove a specific order by its ID.
 *
 * @async
 * @param {Request} req - The incoming HTTP request. The request parameters should
 *                        contain the ID of the order to be deleted.
 * @param {Response} res - The outgoing HTTP response. The response body will
 *                         contain the deleted order if the operation is successful.
 * @param {NextFunction} next - Express.js next function.
 * @throws Will throw an error if the operation fails.
 * @returns {Promise<Response>} A Promise that resolves to the Express.js
 *                              response object.
 */
export async function deleteOrderById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {id} = req.params;

  try {
    const deletedOrder = await prisma.order.delete({
      where: {id},
    });

    return res.status(200).json(deletedOrder);
  } catch (err) {
    return next(err);
  }
}

/**
 * Retrieves all items of a specific order by the order's ID.
 *
 * This function handles the GET request to fetch all items associated with an order.
 * The ID of the order is taken from the request parameters.
 *
 * @async
 * @param {Request} req - The incoming HTTP request. The request parameters should
 *                        contain the ID of the order.
 * @param {Response} res - The outgoing HTTP response. The response body will
 *                         contain the order's items if the operation is successful.
 * @param {NextFunction} next - Express.js next function.
 * @throws Will throw an error if the operation fails.
 * @returns {Promise<Response>} A Promise that resolves to the Express.js
 *                              response object.
 */
export async function getOrderItemsById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {id} = req.params;

    const orderItems = await prisma.orderItem.findMany({
      where: {orderId: id},
    });
    return res.status(200).json(orderItems);
  } catch (err) {
    return next(err);
  }
}
