import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// eslint-disable-next-line node/no-extraneous-import
import {PrismaClient} from '@prisma/client';
import express from 'express';

// Import routers
// import userRouter from './routes/user';
// import productRouter from './routes/product';
// import orderRouter from './routes/order';
// import cartRouter from './routes/cart';
// import authRouter from './routes/auth';

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
// app.use('/api/users', userRouter);
// app.use('/api/products', productRouter);
// app.use('/api/orders', orderRouter);
// app.use('/api/cart', cartRouter);
// app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the TasteTrove API!');
});
