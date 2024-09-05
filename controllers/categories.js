
import ErrorResponse from "../utils/ErrorResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import categoriesSchema from "../schema/categoriesSchema.js";
import Category from "../models/Category.js";

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json(categories);
});

export const createCategory = asyncHandler(async (req, res) => {
    const { error } = categoriesSchema.validate(req.body);  // Validate the request body
    if (error) {
        throw new ErrorResponse(error.details[0].message, 400);  // Handle validation errors
    }

    const { name } = req.body;
    const found = await Category.findOne({ name });
    if (found) throw new ErrorResponse("Category already exists in DB", 400);

    const category = await Category.create(req.body);
    res.status(201).json(category);
}
);

export const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) throw new ErrorResponse("Category not found", 404);
    res.status(200).json({ message: "Category deleted" });
}
);

export const getCategoryByName = asyncHandler(async (req, res) => {
    const { name } = req.params;
    const category = await Category.find({ name });
    res.status(200).json(category);
}
);

export const getCategoryById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) throw new ErrorResponse("Category not found", 404);
    res.status(200).json(category);
}
);