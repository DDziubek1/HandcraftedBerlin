import { Router } from "express";
import { getCategories, createCategory, getCategoryByName, deleteCategory } from "../controllers/categories.js";

const categoriesRouter = Router();

categoriesRouter.route("/").get(getCategories).post(createCategory);
categoriesRouter.route("/:name").get(getCategoryByName).delete(deleteCategory);

export default categoriesRouter;
