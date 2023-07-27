"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.prisma = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// eslint-disable-next-line node/no-extraneous-import
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
// Import routers
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
// import cartRoutes from './routes/cartRoutes';
// import orderRoutes from './routes/orderRoutes';
// import paymentRoutes from './routes/paymentRoutes';
// import addressRoutes from './routes/addressRoutes';
//import error middleware
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
// ---------------- initialization ----------------- //
exports.prisma = new client_1.PrismaClient();
exports.app = (0, express_1.default)();
// ---------- Application-Level Middleware --------- //
exports.app.use(body_parser_1.default.json());
exports.app.use(body_parser_1.default.urlencoded({ extended: true }));
exports.app.use((0, cookie_parser_1.default)());
exports.app.use((0, cors_1.default)({ credentials: true, origin: 'http://localhost:3000' }));
// ---------------------- Routes -------------------- //
exports.app.use('/api/users', userRoutes_1.default);
exports.app.use('/api/auth', authRoutes_1.default);
exports.app.use('/api/products', productRoutes_1.default);
// app.use('/api/cart', cartRoutes);
// app.use('/api/orders', orderRoutes);
// app.use('/api/payments', paymentRoutes);
// app.use('/api/address', addressRoutes);
exports.app.use(errorMiddleware_1.errorHandler);
exports.app.get('/', (req, res) => {
    res.send('Welcome to the TasteTrove API!');
});
//# sourceMappingURL=app.js.map