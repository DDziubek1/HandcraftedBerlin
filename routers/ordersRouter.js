import { Router } from "express";
import { getOrders, createOrder, getOrderById, updateOrder, updateOrderStatus,
    deleteOrder, getOrderByStatus, getOrderByBuyerId
  } from "../controllers/orders.js";

const ordersRouter = Router();

ordersRouter.route("/").get(getOrders).post(createOrder);
ordersRouter.route("/:id").get(getOrderById).put(updateOrder).delete(deleteOrder);
ordersRouter.route("/status/:status").get(getOrderByStatus);
ordersRouter.route("/buyer/:buyerId").get(getOrderByBuyerId);
ordersRouter.route("/:id/status").put(updateOrderStatus);

export default ordersRouter;