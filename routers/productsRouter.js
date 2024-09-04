import { Router } from "express";
import { getProducts, createProduct, getProductById,
     updateProduct, deleteProduct, addProductImage, deleteProductImage,
    getProductByCategory, getProductByMaterial, getProductBySeller  }
      from "../controllers/products.js";
import { authenticate } from "../middleware/authenticate.js";

const productsRouter = Router();

productsRouter.route("/").get(getProducts).post( createProduct).get(getProductBySeller);
productsRouter.route("/:id").get(getProductById).put(updateProduct).delete(deleteProduct);
productsRouter.route("/:id/image").post(addProductImage).delete(deleteProductImage);
productsRouter.route("/category/:category").get(getProductByCategory);
productsRouter.route("/material/:material").get(getProductByMaterial);



export default productsRouter;
