import Product from "../models/Product.js";
import ErrorResponse from "../utils/errorResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import productsSchema from "../schema/productsSchema.js";

export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});

export const createProduct = asyncHandler(async (req, res) => {
    const { error } = productsSchema.validate(req.body);  // Validate the request body
    if (error) {
        throw new ErrorResponse(error.details[0].message, 400);  // Handle validation errors
    }

    const { name } = req.body;
    const found = await Product.findOne({ name });
    if (found) throw new ErrorResponse("Product already exists in DB", 400);

    const product = await Product.create(req.body);
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
    const product = await Product.findByIdAndUpdate (
        id, // id of the product to update
         req.body // data to update
    , { new: true }); // return the updated product
    if (!product) throw new ErrorResponse("Product not found", 404);
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
    const { sellerId } = req.params;
    const products = await Product.find({ sellerId });
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

