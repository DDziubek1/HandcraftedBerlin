import { Router } from "express";
import { getUsers, createUser, updateUser, deleteUser } from "../controllers/users.js";

const usersRouter = Router();

usersRouter.route("/").get(getUsers).post(createUser);
usersRouter.route("/:id").put(updateUser).delete(deleteUser);

export default usersRouter;
