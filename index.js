import express from 'express';
import './db/index.js';
import cors from 'cors';
import productsRouter from './routers/productsRouter.js';
import usersRouter from './routers/usersRouter.js';
import cartRouter from './routers/cartRouter.js';
import ordersRouter from './routers/ordersRouter.js';
import authRouter from './routers/authRouter.js';
import categoriesRouter from './routers/categoriesRouter.js';
import { cloudinaryUpload } from './middleware/cloudinary.js';
import multer from 'multer';
import { extname } from 'path';
import { upload } from './middleware/multer.js';

const app = express();
const port =  process.env.port || 3000;

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/users', usersRouter);
app.use('/cart', cartRouter);
app.use('/orders', ordersRouter);

app.post("/upload-file", upload.array("images", 8),cloudinaryUpload,  (req, res) => {
    console.log(req.file);
    
   const imageUrls = req.images;
    console.log(imageUrls);

    res.status(200).json({imageUrls});

  // req.file should have the information i think the key is called secure_url that has the link to the image that got uploaded to cloudinary
  });


app.listen(port, () => {
  console.log(`Main app listening at <http://localhost>:${port}`);
});
