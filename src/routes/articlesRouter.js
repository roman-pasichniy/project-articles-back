import { Router } from "express";
import { celebrate, Segments } from "celebrate";

import { articles as ctrl } from "../controllers/index.js";
import { createArticleController } from "../controllers/articles/index.js";
import { createArticleSchema } from "../validations/articles.js";
import { upload } from "../middleware/upload.js";
import { uploadErrorHandler } from "../middleware/uploadErrorHandler.js";

export const articlesRouter = Router();

articlesRouter.get("/:articleId", ctrl.getArticleById);
articlesRouter.get("/", ctrl.getArticles);

articlesRouter.post(
  "/",
  upload.single("photo"),
  celebrate({
    [Segments.BODY]: createArticleSchema,
  }),
  createArticleController,
  uploadErrorHandler,
);
