import { Router } from "express";
import { getUsers, createUser, updateUser, deleteUser, getUserInfoById } from "../controllers/users.js";
import { authenticate } from "../middleware/authenticate.js";
const usersRouter = Router();

usersRouter.route("/").get(getUsers).post(createUser);
usersRouter.route("/").put( updateUser).delete(deleteUser);
usersRouter.route("/profile").get( getUserInfoById);
export default usersRouter;
