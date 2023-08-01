"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.prisma = void 0;
// eslint-disable-next-line node/no-extraneous-import
const client_1 = require("@prisma/client");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const node_cron_1 = __importDefault(require("node-cron"));
const utils_1 = require("./utils");
// import {addCategories, addProducts, removeProducts} from './utils/productUtil';
// Import routers
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const paymentRoutes_1 = __importDefault(require("./routes/paymentRoutes"));
const addressRoutes_1 = __importDefault(require("./routes/addressRoutes"));
//import error middleware
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
// ---------------- initialization ----------------- //
exports.prisma = new client_1.PrismaClient();
exports.app = (0, express_1.default)();
// periodic database cleanup
node_cron_1.default.schedule('0 0 * * *', async () => {
    await (0, utils_1.deleteExpiredRefreshTokens)();
});
// ---------- Application-Level Middleware --------- //
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(body_parser_1.default.json());
exports.app.use(body_parser_1.default.urlencoded({ extended: true }));
exports.app.use((0, cors_1.default)({
    origin(requestOrigin, callback) {
        if ((requestOrigin === null || requestOrigin === void 0 ? void 0 : requestOrigin.includes('localhost')) ||
            (requestOrigin === null || requestOrigin === void 0 ? void 0 : requestOrigin.includes('taste'))) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));
// ---------------------- Routes -------------------- //
exports.app.use('/api/auth', authRoutes_1.default);
exports.app.use('/api/users', userRoutes_1.default);
exports.app.use('/api/products', productRoutes_1.default);
exports.app.use('/api/orders', orderRoutes_1.default);
exports.app.use('/api/payments', paymentRoutes_1.default);
exports.app.use('/api/address', addressRoutes_1.default);
exports.app.use(errorMiddleware_1.errorHandler);
exports.app.get('/api', (req, res) => {
    res.send('Welcome to the TasteTrove API!');
});
//# sourceMappingURL=app.js.map