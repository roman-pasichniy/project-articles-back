import createHttpError from "http-errors";

import { createArticle } from "../../services/articles.js";

export const createArticleController = async (req, res) => {
  if (!req.file) {
    throw createHttpError(400, "Photo is required");
  }

  const article = await createArticle({
    ...req.body,
    photo: req.file.originalname,
  });

  res.status(201).json({
    status: 201,
    message: "Successfully created an article!",
    data: article,
  });
};
