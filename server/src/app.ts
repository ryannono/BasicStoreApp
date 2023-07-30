// eslint-disable-next-line node/no-extraneous-import
import {PrismaClient} from '@prisma/client';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';

// Import routers
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import paymentRoutes from './routes/paymentRoutes';
import addressRoutes from './routes/addressRoutes';

//import error middleware
import {errorHandler} from './middlewares/errorMiddleware';
// import {addCategories, addProducts, removeProducts} from './utils/productUtil';

// ---------------- initialization ----------------- //

export const prisma = new PrismaClient();
export const app = express();

// ---------- Application-Level Middleware --------- //

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://tastetrove.up.railway.app/'],
  })
);

// ---------------------- Routes -------------------- //

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/address', addressRoutes);
app.use(errorHandler);

app.get('/api', (req, res) => {
  res.send('Welcome to the TasteTrove API!');
});
