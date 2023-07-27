import express from 'express';
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
router.post('/', createProduct);
router.get('/:id', getProductById);
router.put('/:id', updateProductById);
router.delete('/:id', deleteProductById);

// product category model routes
router.get('/category', getAllCategories);
router.post('/category', createCategory);
router.get('/category/:id', getCategoryById);
router.put('/category/:id', updateCategoryById);
router.delete('/category/:id', deleteCategoryById);

export default router;
