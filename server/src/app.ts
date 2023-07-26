import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// eslint-disable-next-line node/no-extraneous-import
import {PrismaClient} from '@prisma/client';
import express from 'express';

// Import routers
// import userRoutes from './routes/userRoutes';
// import authRoutes from './routes/authRoutes';
// import productRoutes from './routes/productRoutes';
// import cartRoutes from './routes/cartRoutes';
// import orderRoutes from './routes/orderRoutes';
// import paymentRoutes from './routes/paymentRoutes';
// import addressRoutes from './routes/addressRoutes';

export const prisma = new PrismaClient();
export const app = express();

// ---------- Application-Level Middleware --------- //
// handle json type data
// handle urlencoded type data
// handle cookie type data
// enable cors (origin acccess control - request/pings from this address)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

// ---------------------- Routes -------------------- //
// app.use('/api/users', userRoutes);
// app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/cart', cartRoutes);
// app.use('/api/orders', orderRoutes);
// app.use('/api/payments', paymentRoutes);
// app.use('/api/address', addressRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the TasteTrove API!');
});
