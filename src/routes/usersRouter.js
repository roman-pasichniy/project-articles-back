import { Router } from "express";
import { users as ctrl } from "../controllers/index.js";
import { userIdParamSchema } from "../validations/userValidation.js";
import { celebrate } from "celebrate";
import { authMiddleware } from "../middleware/auth.middleware.js";

export const usersRouter = Router();

usersRouter.get(
  "/me/saved-articles",
  authMiddleware,
  ctrl.getSavedArticles,
);

usersRouter.post(
  "/me/saved-articles/:articleId",
  authMiddleware,
  ctrl.addSavedArticle,
);

usersRouter.get(
  "/:userId",
  celebrate(userIdParamSchema),
  ctrl.getUserById,
);

usersRouter.get(
  "/:userId/articles",
  celebrate(userIdParamSchema),
  ctrl.getUserArticles,
);

usersRouter.get("/", ctrl.getAuthors);

usersRouter.patch("/me", ctrl.updateCurrentUser);
