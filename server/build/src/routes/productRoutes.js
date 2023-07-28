"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const productController_1 = require("../controllers/productController");
const router = express_1.default.Router();
// product model routes
router.get('/', productController_1.getAllProducts);
router.post('/', authMiddleware_1.authenticateAccessToken, authMiddleware_1.verifyAdmin, productController_1.createProduct);
router.get('/:id', productController_1.getProductById);
router.put('/:id', authMiddleware_1.verifyAdmin, productController_1.updateProductById);
router.delete('/:id', authMiddleware_1.verifyAdmin, productController_1.deleteProductById);
// product category model routes
router.get('/category', productController_1.getAllCategories);
router.post('/category', authMiddleware_1.authenticateAccessToken, authMiddleware_1.verifyAdmin, productController_1.createCategory);
router.get('/category/:id', productController_1.getCategoryById);
router.put('/category/:id', authMiddleware_1.authenticateAccessToken, authMiddleware_1.verifyAdmin, productController_1.updateCategoryById);
router.delete('/category/:id', authMiddleware_1.authenticateAccessToken, authMiddleware_1.verifyAdmin, productController_1.deleteCategoryById);
exports.default = router;
//# sourceMappingURL=productRoutes.js.map