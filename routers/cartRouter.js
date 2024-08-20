import { Router } from "express";
import { createCart, deleteCart, getCartById, getCarts, updateCart, getCartByUserId } from "../controllers/carts.js";

const cartRouter = Router();

cartRouter.route("/").get(getCarts).post(createCart);
cartRouter.route("/:id").get(getCartById).put(updateCart).delete(deleteCart);
cartRouter.route("/user/:userId").get(getCartByUserId);

export default cartRouter;
