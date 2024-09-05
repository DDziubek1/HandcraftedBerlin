import Product from "../models/Product.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import productsSchema from "../schema/productsSchema.js";
import authenticate from "../middleware/authenticate.js";
import Category from "../models/Category.js";
import jwt from "jsonwebtoken";
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});

export const createProduct = asyncHandler(async (req, res) => {
    
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) throw new Error("Token Not Found");

    const { _id, email } = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { _id, email };

    

    const { name, description, price, category, materials, stock, images } = req.body;

    const found = await Product.findOne({ name});
    if (found) throw new ErrorResponse("Product already exists in DB", 400);

    const categoryId= await Category.findOne({ name: category });
    if (!categoryId) throw new ErrorResponse("Category not found", 404);

    const product = await Product.create({
        sellerId: _id,
        name,
        description,
        price,
        category: categoryId._id,
        materials: materials, // Convert materials to array
        stock: stock || 0,
        images: images,
    });

    res.status(201).json(product);
}
);

export const getProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    const product = await Product.findById(id);
    if (!product) throw new ErrorResponse("Product not found", 404);
    res.status(200).json(product);  
} 
);

export const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const productId = await Product.findById(id);
    if (!productId) throw new ErrorResponse("Product not found", 404);

    

    const { name, description, price, category, materials, stock } = req.body;

    const categoryId = await Category.findOne({ name: category });
    if (!categoryId) throw new ErrorResponse("Category not found", 404);
    
   const  product   = await Product.findByIdAndUpdate(   
        id,
        {
            name,
            description,
            price,
            category: categoryId._id,
            materials: materials, // Convert materials to array
            stock: stock || 0,
        },
        { new: true });
        
    res.status(200).json(product);
}
);

export const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) throw new ErrorResponse("Product not found", 404);
    res.status(200).json({ message: "Product deleted" });
}
);

export const getProductByCategory = asyncHandler(async (req, res) => {
    const { category } = req.params;
    const products = await Product.find({ category });
    res.status(200).json(products);
}
);

export const getProductByMaterial = asyncHandler(async (req, res) => {
    const { material } = req.params;
    const products = await Product.find({ materials: material });
    res.status(200).json(products);
}
);


export const getProductBySeller = asyncHandler(async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) throw new Error("Token Not Found");

    const { _id, email } = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { _id, email };

    const products = await Product.find({ sellerId: _id });
    res.status(200).json(products);
}
);

export const addProductImage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) throw new ErrorResponse("Product not found", 404);
    product.images.push(req.file.path);
    await product.save();
    res.status(200).json(product);
}
);

export const deleteProductImage = asyncHandler(async (req, res) => {
    const { id, imageId } = req.params;
    const product = await Product.findById(id);
    if (!product) throw new ErrorResponse("Product not found", 404);
    product.images = product.images.filter((image) => image !== imageId);
    await product.save();
    res.status(200).json(product);
}
);

