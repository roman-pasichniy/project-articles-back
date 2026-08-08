import { Router } from "express";
import { articles as ctrl } from "../controllers/index.js";

export const categoriesRouter = Router();

categoriesRouter.get("/", ctrl.getArticleCategories);
