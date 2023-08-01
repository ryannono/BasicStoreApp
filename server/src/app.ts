// eslint-disable-next-line node/no-extraneous-import
import {PrismaClient} from '@prisma/client';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
import cron from 'node-cron';
import {deleteExpiredRefreshTokens} from './utils';
// import {addCategories, addProducts, removeProducts} from './utils/productUtil';

// Import routers
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import paymentRoutes from './routes/paymentRoutes';
import addressRoutes from './routes/addressRoutes';

//import error middleware
import {errorHandler} from './middlewares/errorMiddleware';

// ---------------- initialization ----------------- //

export const prisma = new PrismaClient();
export const app = express();

// periodic database cleanup
cron.schedule('0 0 * * *', async () => {
  await deleteExpiredRefreshTokens();
});

// ---------- Application-Level Middleware --------- //

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(
  cors({
    origin(requestOrigin, callback) {
      if (
        requestOrigin?.includes('localhost') ||
        requestOrigin?.includes('taste')
      ) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);
// ---------------------- Routes -------------------- //

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/address', addressRoutes);
app.use(errorHandler);

app.get('/api', (req, res) => {
  res.send('Welcome to the TasteTrove API!');
});
