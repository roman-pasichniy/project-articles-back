import { Router } from "express";
import { users as ctrl } from "../controllers/index.js";
import { userIdParamSchema } from "../validations/userValidation.js";
import { celebrate } from "celebrate";

export const usersRouter = Router();
usersRouter.get(
  "/users/:userId",
  celebrate(userIdParamSchema),
  ctrl.getUserById,
);

usersRouter.get("/", ctrl.getAuthors);

usersRouter.patch("/me", ctrl.updateCurrentUser);
