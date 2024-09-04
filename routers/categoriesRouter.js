import { Router } from "express";
import { getCategories, createCategory, getCategoryByName, deleteCategory, getCategoryById } from "../controllers/categories.js";

const categoriesRouter = Router();

categoriesRouter.route("/").get(getCategories).post(createCategory);
categoriesRouter.route("/:name").get(getCategoryByName).delete(deleteCategory);
categoriesRouter.route("/id/:id").get(getCategoryById);

export default categoriesRouter;
