"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.get('/', userController_1.getUsers); // GET all users
router.post('/', userController_1.createUser); // POST a new user
router.get('/:id', userController_1.getUserById); // GET a specific user
router.put('/:id', userController_1.updateUserById); // UPDATE a specific user
router.delete('/:id', userController_1.deleteUser); // DELETE a specific user
exports.default = router;
//# sourceMappingURL=userRoutes.js.map