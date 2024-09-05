import Cart from "../models/Cart.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import cartsSchema from "../schema/cartsSchema.js";

export const getCarts = asyncHandler(async (req, res) => {
  const carts = await Cart.find();
  res.status(200).json(carts);
});

export const createCart = asyncHandler(async (req, res) => {
    const { error } = cartsSchema.validate(req.body);  // Validate the request body
    if (error) {
        throw new ErrorResponse(error.details[0].message, 400);  // Handle validation errors
    }

    const { userId, products } = req.body;
    const found = await Cart.findOne({ userId, products });
    if (found) throw new ErrorResponse("Cart already exists in DB", 400);

    const cart = await Cart.create(req.body);
    res.status(201).json(cart);
}
);

export const getCartById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const cart = await Cart.findById(id);
    if (!cart) throw new ErrorResponse("Cart not found", 404);
    res.status(200).json(cart);
}
);

export const updateCart = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const cart = await Cart.findByIdAndUpdate (
        id, // id of the cart to update
         req.body // data to update
    , { new: true }); // return the updated cart
    if (!cart) throw new ErrorResponse("Cart not found", 404);
    res.status(200).json(cart);
}
);

export const deleteCart = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const cart = await Cart.findByIdAndDelete(id);
    if  (!cart) throw new ErrorResponse("Cart not found", 404);
    res.status(200).json({ message: "Cart deleted" });
}
);

export const getCartByUserId = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const carts = await Cart.find({ userId });
    res.status(200).json(carts);
}
);

