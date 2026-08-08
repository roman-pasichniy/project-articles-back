import { Router } from "express";
import { users as ctrl } from "../controllers/index.js";
import { getUserArticlesSchema } from "../validations/userValidation.js";

export const usersRouter = Router();
usersRouter.get(
  "/users/:userId",
  celebrate(getUserArticlesSchema),
  ctrl.getUserById
);
