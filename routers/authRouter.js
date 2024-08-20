import express from "express";
import { login, signup, getProfile } from "../controllers/users.js";
import authenticate from "../middleware/authenticate.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/me", authenticate, getProfile);

export default authRouter;
