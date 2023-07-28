"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const addressController_1 = require("../controllers/addressController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.get('/', authMiddleware_1.authenticateAccessToken, addressController_1.getAllAddresses); // Get all addresses of the authenticated user
router.post('/', authMiddleware_1.authenticateAccessToken, addressController_1.createAddress); // Create a new address for the authenticated user
router.get('/:id', authMiddleware_1.authenticateAccessToken, addressController_1.getAddress); // Get a specific address of the authenticated user
router.put('/:id', authMiddleware_1.authenticateAccessToken, addressController_1.updateAddress); // Update a specific address of the authenticated user
router.delete('/:id', authMiddleware_1.authenticateAccessToken, addressController_1.deleteAddress); // Delete a specific address of the authenticated user
exports.default = router;
//# sourceMappingURL=addressRoutes.js.map