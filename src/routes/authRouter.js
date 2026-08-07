import { Router } from "express";

import { auth as ctrl } from "../controllers/index.js";

export const authRouter = Router();

authRouter.post("/register", auth, registerUser);

authRouter.post();
