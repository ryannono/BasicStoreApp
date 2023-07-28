import express from 'express';
import {
  authenticateAccessToken,
  verifyAdmin,
} from '../middlewares/authMiddleware';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  createCategory,
  deleteCategoryById,
  getAllCategories,
  updateCategoryById,
  getCategoryById,
} from '../controllers/productController';

const router = express.Router();

// product model routes
router.get('/', getAllProducts);
router.post('/', authenticateAccessToken, verifyAdmin, createProduct);
router.get('/:id', getProductById);
router.put('/:id', verifyAdmin, updateProductById);
router.delete('/:id', verifyAdmin, deleteProductById);

// product category model routes
router.get('/category', getAllCategories);
router.post('/category', authenticateAccessToken, verifyAdmin, createCategory);
router.get('/category/:id', getCategoryById);
router.put(
  '/category/:id',
  authenticateAccessToken,
  verifyAdmin,
  updateCategoryById
);
router.delete(
  '/category/:id',
  authenticateAccessToken,
  verifyAdmin,
  deleteCategoryById
);

export default router;
