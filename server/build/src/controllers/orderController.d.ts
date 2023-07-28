import { Request, Response, NextFunction } from 'express';
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
export declare function getAllOrders(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
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
export declare function getOrderById(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
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
export declare function deleteOrderById(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
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
export declare function getOrderItemsById(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
