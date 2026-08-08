import { Router } from "express";
import { users as ctrl } from "../controllers/index.js";

export const usersRouter = Router();
usersRouter.get("/users/:userId", ctrl.getUserById);
