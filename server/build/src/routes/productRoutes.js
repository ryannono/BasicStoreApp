"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const router = express_1.default.Router();
router.get('/', productController_1.getAllProducts);
router.post('/', productController_1.createProduct);
router.get('/:id', productController_1.getProductById);
router.put('/:id', productController_1.updateProductById);
router.delete('/:id', productController_1.deleteProductById);
exports.default = router;
//# sourceMappingURL=productRoutes.js.map