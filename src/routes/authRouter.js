import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { auth as ctrl } from "../controllers/index.js";

export const authRouter = Router();

authRouter.post("/register", ctrl.registerUser);
authRouter.get("/current", authMiddleware, ctrl.currentUser);
