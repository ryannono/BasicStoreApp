import { NextFunction, Request, Response } from 'express';
/**
 * Asynchronous Express middleware to fetch all users from the database.
 * If successful, responds with a JSON array of all user objects.
 * If an error occurs, it is passed on to the next middleware for error handling.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the Express pipeline.
 *
 * @returns {Promise<void>} Nothing.
 *
 * @throws {Error} If any error occurs during the process.
 */
export declare function getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
export declare function getUser(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
/**
 * Asynchronous Express middleware to fetch a specific user from the database by their ID.
 * If successful, responds with a JSON object of the user.
 * If an error occurs or the user is not found, it is passed on to the next middleware for error handling.
 *
 * @param {Request} req - The Express request object, expecting the user's ID in the parameters.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the Express pipeline.
 *
 * @returns {Promise<void>} Nothing.
 *
 * @throws {Error} If any error occurs during the process.
 */
export declare function getUserById(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
/**
 * Asynchronous Express middleware to update a specific user in the database by their ID.
 * If successful, responds with a JSON object of the updated user.
 * If an error occurs, it is passed on to the next middleware for error handling.
 *
 * @param {Request} req - The Express request object, expecting the user's ID in the parameters and the updated data in the body.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the Express pipeline.
 *
 * @returns {Promise<void>} Nothing.
 *
 * @throws {Error} If any error occurs during the user updating process.
 */
export declare function updateUserById(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
/**
 * Asynchronous Express middleware to delete a specific user from the database by their ID.
 * If successful, responds with a JSON object of the deleted user.
 * If an error occurs, it is passed on to the next middleware for error handling.
 *
 * @param {Request} req - The Express request object, expecting the user's ID in the parameters.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the Express pipeline.
 *
 * @returns {Promise<void>} Nothing.
 *
 * @throws {Error} If any error occurs during the user deletion process.
 */
export declare function deleteUserById(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
/**
 * Retrieves a user's shopping cart.
 *
 * This function handles the GET request to fetch a user's cart by their ID.
 * It fetches the cart associated with the given user ID from the database.
 *
 * @async
 * @param {Request} req - The incoming HTTP request. The request parameters
 *                        should contain the user ID.
 * @param {Response} res - The outgoing HTTP response. The response body will
 *                         contain the fetched cart if the operation is successful.
 * @param {NextFunction} next - Express.js next function.
 * @throws Will throw an error if the operation fails.
 * @returns {Promise<Response>} A Promise that resolves to the Express.js
 *                              response object.
 */
export declare function getCart(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
/**
 * Adds an item to a user's shopping cart.
 *
 * This function handles the POST request to add an item to a user's cart.
 * It updates the cart associated with the given user ID in the database.
 *
 * @async
 * @param {Request} req - The incoming HTTP request. The request parameters
 *                        should contain the user ID and the request body
 *                        should contain the product ID and quantity.
 * @param {Response} res - The outgoing HTTP response. The response body will
 *                         contain the updated cart if the operation is successful.
 * @param {NextFunction} next - Express.js next function.
 * @throws Will throw an error if the operation fails.
 * @returns {Promise<Response>} A Promise that resolves to the Express.js
 *                              response object.
 */
export declare function addItemToCart(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
/**
 * Updates the cart items of a specific user.
 *
 * This asynchronous function first gets the items in the user's cart and
 * creates a map (userCartMap) for fast access. Then, it categorizes the incoming items into arrays
 * based on if they need to be created, updated, or deleted.
 * Finally, it performs these create, update, and delete operations concurrently and sends a success message.
 *
 * @async
 * @function
 * @param {Request} req - Express.js request object containing the incoming cart items in the request body.
 * @param {Response} res - Express.js response object used to send the response.
 * @param {NextFunction} next - Express.js next function for error handling.
 * @throws {Error} Will throw an error if there is an issue in reading the user's current cart,
 * categorizing the incoming items, or in creating/updating/deleting the items.
 */
export declare function updateCartItem(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
/**
 * Removes an item from a user's shopping cart.
 *
 * This function handles the DELETE request to remove an item from a user's
 * cart. It updates the cart associated with the given user ID in the database.
 *
 * @async
 * @param {Request} req - The incoming HTTP request. The request parameters
 *                        should contain the user ID and the product ID.
 * @param {Response} res - The outgoing HTTP response. The response body will
 *                         contain the updated cart if the operation is successful.
 * @param {NextFunction} next - Express.js next function.
 * @throws Will throw an error if the operation fails.
 * @returns {Promise<Response>} A Promise that resolves to the Express.js
 *                              response object.
 */
export declare function removeItemFromCart(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
/**
 * Clears a user's shopping cart.
 *
 * This function handles the DELETE request to clear a user's cart. It deletes
 * the cart associated with the given user ID from the database.
 *
 * @async
 * @param {Request} req - The incoming HTTP request. The request parameters
 *                        should contain the user ID.
 * @param {Response} res - The outgoing HTTP response. The response body will
 *                         contain the response of the delete operation if successful.
 * @param {NextFunction} next - Express.js next function.
 * @throws Will throw an error if the operation fails.
 * @returns {Promise<Response>} A Promise that resolves to the Express.js
 *                              response object.
 */
export declare function clearCart(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
