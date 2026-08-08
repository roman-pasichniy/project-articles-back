import { Router } from "express";
import { articles as ctrl } from "../controllers/index.js";

export const articlesRouter = Router();

articlesRouter.get("/", ctrl.getArticles);
articlesRouter.get("/:articleId", ctrl.getArticleById);