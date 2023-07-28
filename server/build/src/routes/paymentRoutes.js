"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const paymentController_1 = require("../controllers/paymentController");
const router = express_1.default.Router();
router.post('/intent', paymentController_1.createPaymentIntent); // create Order with status 'payment initiated' along with a stripe payment intent
router.post('/webhook', paymentController_1.handleStripeWebhook); // update the Order status to 'payment complete' in database
exports.default = router;
//# sourceMappingURL=paymentRoutes.js.map