import { Router } from "express";

import { celebrate } from "celebrate";
import { refreshUserSessionSchema } from "../validations/authValidation.js";
import {
  logoutUser,
  refreshUserSession,
} from "../controllers/authController.js";

export const authRouter = Router();

authRouter.post("/register", ctrl.registerUser);

authRouter.post("/auth/logout", logoutUser);

authRouter.post(
  "/auth/refresh",
  celebrate(refreshUserSessionSchema),
  refreshUserSession,
);
