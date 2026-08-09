import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { celebrate } from "celebrate";
import { auth as ctrl } from "../controllers/index.js";
import { loginUser } from "../controllers/auth/authController.js";
import { loginUserSchema } from "../validations/userValidation.js";
export const authRouter = Router();

router.post("/login", celebrate(loginUserSchema), loginUser);

authRouter.post("/register", ctrl.registerUser);
authRouter.get("/current", authMiddleware, ctrl.currentUser);
