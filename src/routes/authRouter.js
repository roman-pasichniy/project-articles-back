import { Router } from "express";
import { celebrate } from "celebrate";

import { refreshUserSessionSchema } from "../validations/authValidation.js";
import { auth as ctrl } from "../controllers/index.js";

export const authRouter = Router();

authRouter.post("/register", ctrl.registerUser);
authRouter.post("/logout", ctrl.logoutUser);
authRouter.post(
  "/refresh",
  celebrate(refreshUserSessionSchema),
  ctrl.refreshUserSession,
);
