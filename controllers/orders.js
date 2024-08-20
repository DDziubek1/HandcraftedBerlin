import Order from "../models/Order.js";
import ErrorResponse from "../utils/errorResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import ordersSchema from "../schema/ordersSchema.js";
import Joi from "joi";

export const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find();
    res.status(200).json(orders);
    }
);

export const createOrder = asyncHandler(async (req, res) => {
    const { error } = ordersSchema.validate(req.body);  // Validate the request body
    if (error) {
        throw new ErrorResponse(error.details[0].message, 400);  // Handle validation errors
    }

    const { buyerId, products, status } = req.body;
    const found = await Order.findOne({ buyerId, products, status });
    if (found) throw new ErrorResponse("Order already exists in DB", 400);

    const order = await Order.create(req.body);
    res.status(201).json(order);
}
);

export const getOrderById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) throw new ErrorResponse("Order not found", 404);
    res.status(200).json(order);
}
);

export const updateOrder = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const order = await Order.findByIdAndUpdate (
        id, // id of the order to update
         req.body // data to update
    , { new: true }); // return the updated order
    if (!order) throw new ErrorResponse("Order not found", 404);
    res.status(200).json(order);
}
);

export const deleteOrder = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);
    if (!order) throw new ErrorResponse("Order not found", 404);
    res.status(200).json({ message: "Order deleted" });
}
);

export const getOrderByStatus = asyncHandler(async (req, res) => {
    const { status } = req.params;
    const orders = await Order.find({ status });
    res.status(200).json(orders);
}
);

export const getOrderByBuyerId = asyncHandler(async (req, res) => {
    const { buyerId } = req.params;
    const orders = await Order.find({ buyerId });
    res.status(200).json(orders);
}
);

// Define the Joi schema for status validation
const statusSchema = Joi.object({
    status: Joi.string().valid('pending', 'completed', 'cancelled').required()
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    // Validate the status using Joi
    const { error } = statusSchema.validate({ status });
    if (error) {
        throw new ErrorResponse(error.details[0].message, 400);
    }

    const order = await Order.findByIdAndUpdate(
        id, // id of the order to update
        { status }, // data to update
        { new: true } // return the updated order
    );

    if (!order) throw new ErrorResponse("Order not found", 404);
    res.status(200).json(order);
});