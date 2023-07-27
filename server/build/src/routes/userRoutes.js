"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
// ------------------- user model routes --------------- //
router.get('/', userController_1.getAllUsers); // GET all users
router.get('/:id', userController_1.getUserById); // GET a specific user
router.put('/:id', userController_1.updateUserById); // UPDATE a specific user
router.delete('/:id', userController_1.deleteUserById); // DELETE a specific user
// ----------------- user cart model routes --------------- //
router.get('/:userid/cart', userController_1.getCart); // GET a user's cart
router.post('/:userid/cart', userController_1.addItemToCart); // POST add item to a user's cart
router.put('/:userid/cart', userController_1.updateCartItem); // UPDATE a user's cart
router.delete('/:userid/cart/:productId', userController_1.removeItemFromCart); // DELETE a specific product from a user's cart.
router.delete('/:userid/cart/', userController_1.clearCart); // DELETE (clear) a user's cart
exports.default = router;
//# sourceMappingURL=userRoutes.js.map