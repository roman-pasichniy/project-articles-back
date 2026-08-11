import { Router } from "express";
import { celebrate } from "celebrate";
import { users as ctrl } from "../controllers/index.js";
import { userIdParamSchema } from "../validations/userValidation.js";
import authMiddleware from "../middleware/authMiddleware.js";

export const usersRouter = Router();

usersRouter.get("/me/saved-articles", authMiddleware, ctrl.getSavedArticles);

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

usersRouter.patch("/me", authMiddleware, ctrl.updateCurrentUser);