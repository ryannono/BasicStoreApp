import {Request, Response, NextFunction} from 'express';
import {prisma} from '../app';
import {MutableCategoryPayload, MutableProductPayload} from '../types';

// ------------------- Product Controller ---------------------- //

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
export async function createProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const newProduct = await prisma.product.create({
      data: req.body as MutableProductPayload,
    });
    return res.status(200).json(newProduct);
  } catch (err) {
    return next(err);
  }
}

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
export async function getAllProducts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const allProducts = await prisma.product.findMany({
      include: {images: true, category: true},
    });
    return res.status(200).json(allProducts);
  } catch (err) {
    return next(err);
  }
}

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
export async function getProductById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {id} = req.params;

  try {
    const product = await prisma.product.findUnique({
      where: {id},
      include: {images: true, category: true},
    });

    if (!product) return res.status(404).json({error: 'Product not found'});
    return res.status(200).json(product);
  } catch (err) {
    return next(err);
  }
}

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
export async function updateProductById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {id} = req.params;

  try {
    const updatedProduct = await prisma.product.update({
      where: {id},
      data: req.body as MutableProductPayload,
      include: {images: true, category: true},
    });

    return res.status(200).json(updatedProduct);
  } catch (err) {
    return next(err);
  }
}

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
export async function deleteProductById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {id} = req.params;

  try {
    const deletedProduct = await prisma.product.delete({
      where: {id},
      include: {images: true, category: true},
    });

    return res.status(200).json(deletedProduct);
  } catch (err) {
    return next(err);
  }
}

// ---------------- Product Category Controller ------------------ //

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
export async function createCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const newCategory = await prisma.productCategory.create({
      data: req.body as MutableCategoryPayload,
    });
    return res.status(200).json(newCategory);
  } catch (err) {
    return next(err);
  }
}

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
export async function getAllCategories(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const allCategories = await prisma.productCategory.findMany();
    return res.status(200).json(allCategories);
  } catch (err) {
    return next(err);
  }
}

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
export async function getCategoryById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {id} = req.params;

  try {
    const category = await prisma.productCategory.findUnique({
      where: {id},
    });

    if (!category) return res.status(404).json({error: 'Category not found'});
    return res.status(200).json(category);
  } catch (err) {
    return next(err);
  }
}

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
export async function updateCategoryById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {id} = req.params;

  try {
    const updatedCategory = await prisma.productCategory.update({
      where: {id},
      data: req.body as MutableCategoryPayload,
    });

    return res.status(200).json(updatedCategory);
  } catch (err) {
    return next(err);
  }
}

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
export async function deleteCategoryById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {id} = req.params;

  try {
    const deletedCategory = await prisma.productCategory.delete({
      where: {id},
    });

    return res.status(200).json(deletedCategory);
  } catch (err) {
    return next(err);
  }
}
