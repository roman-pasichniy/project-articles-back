import { Router } from "express";
import { celebrate, Segments } from "celebrate";

import { createArticleController } from "../controllers/articles/index.js";
import { createArticleSchema } from "../validations/articles.js";
import { upload } from "../middleware/upload.js";
import { uploadErrorHandler } from "../middleware/uploadErrorHandler.js";

export const articlesRouter = Router();

articlesRouter.post(
  "/",
  upload.single("photo"),
  celebrate({
    [Segments.BODY]: createArticleSchema,
  }),
  createArticleController,
  uploadErrorHandler,
);
