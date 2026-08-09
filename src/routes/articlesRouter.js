import { Router } from "express";
import { articles as ctrl } from "../controllers/index.js";

export const articlesRouter = Router();

articlesRouter.get("/:articleId", ctrl.getArticleById);
articlesRouter.get("/", ctrl.getArticles);

