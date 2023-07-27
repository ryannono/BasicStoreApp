import { Request, Response, NextFunction } from 'express';
/**
 * Create a new product in the database. The product details
 * are received through the request body.
 *
 * @async
 * @function createProduct
 * @param {Request} req - The request object, the body should
 * be of type MutableProductPayload.
 * @param {Response} res - The response object, sends the
 * created product details as response.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<Response>} - The response object, sends
 * the created product details as response.
 */
export declare function createProduct(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
/**
 * Fetch all products from the database.
 *
 * @async
 * @function getAllProducts
 * @param {Request} req - The request object.
 * @param {Response} res - The response object, sends all
 * the product details as response.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<Response>} - The response object, sends
 * all the products as response.
 */
export declare function getAllProducts(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
/**
 * Fetch a product from the database by its ID. The ID is
 * received through the request parameters.
 *
 * @async
 * @function getProductById
 * @param {Request} req - The request object, the parameters
 * should contain the ID of the product to fetch.
 * @param {Response} res - The response object, sends the
 * product details as response.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<Response>} - The response object, sends
 * the product details as response.
 */
export declare function getProductById(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
/**
 * Update a product in the database by its ID. The ID is
 * received through the request parameters, and the new
 * product details are received through the request body.
 *
 * @async
 * @function updateProductById
 * @param {Request} req - The request object, the parameters
 * should contain the ID of the product to update, and the
 * body should be of type MutableProductPayload with the
 * updated product details.
 * @param {Response} res - The response object, sends the
 * updated product details as response.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<Response>} - The response object, sends
 * the updated product details as response.
 */
export declare function updateProductById(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
/**
 * Delete a product from the database by its ID. The ID is
 * received through the request parameters.
 *
 * @async
 * @function deleteProductById
 * @param {Request} req - The request object, the parameters
 * should contain the ID of the product to delete.
 * @param {Response} res - The response object, sends the
 * deleted product details as response.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<Response>} - The response object, sends
 * the deleted product details as response.
 */
export declare function deleteProductById(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
/**
 * Create a new product category in the database. The category details
 * are received through the request body.
 *
 * @async
 * @function createCategory
 * @param {Request} req - The request object, the body should
 * be of type MutableCategoryPayload.
 * @param {Response} res - The response object, sends the
 * created category details as response.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<Response>} - The response object, sends
 * the created category details as response.
 */
export declare function createCategory(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
/**
 * Fetch all categories from the database.
 *
 * @async
 * @function getAllCategories
 * @param {Request} req - The request object.
 * @param {Response} res - The response object, sends all
 * the category details as response.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<Response>} - The response object, sends
 * all the category details as response.
 */
export declare function getAllCategories(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
/**
 * Fetch a category from the database by its ID. The ID is
 * received through the request parameters.
 *
 * @async
 * @function getCategoryById
 * @param {Request} req - The request object, the parameters
 * should contain the ID of the category to fetch.
 * @param {Response} res - The response object, sends the
 * category details as response.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<Response>} - The response object, sends
 * the category details as response.
 */
export declare function getCategoryById(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
/**
 * Update a category in the database by its ID. The ID is
 * received through the request parameters, and the new
 * category details are received through the request body.
 *
 * @async
 * @function updateCategoryById
 * @param {Request} req - The request object, the parameters
 * should contain the ID of the category to update, and the
 * body should be of type MutableCategoryPayload with the
 * updated category details.
 * @param {Response} res - The response object, sends the
 * updated category details as response.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<Response>} - The response object, sends
 * the updated category details as response.
 */
export declare function updateCategoryById(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
/**
 * Delete a category from the database by its ID. The ID is
 * received through the request parameters.
 *
 * @async
 * @function deleteCategoryById
 * @param {Request} req - The request object, the parameters
 * should contain the ID of the category to delete.
 * @param {Response} res - The response object, sends the
 * deleted category details as response.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<Response>} - The response object, sends
 * the deleted category details as response.
 */
export declare function deleteCategoryById(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
