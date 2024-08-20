import express from 'express';
import './db/index.js';
import cors from 'cors';
import productsRouter from './routers/productsRouter.js';
import usersRouter from './routers/usersRouter.js';
import cartRouter from './routers/cartRouter.js';
import ordersRouter from './routers/ordersRouter.js';
import authRouter from './routers/authRouter.js';
import categoriesRouter from './routers/categoriesRouter.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/users', usersRouter);
app.use('/cart', cartRouter);
app.use('/orders', ordersRouter);



app.listen(port, () => {
  console.log(`Main app listening at <http://localhost>:${port}`);
});
