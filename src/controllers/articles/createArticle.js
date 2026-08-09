import createHttpError from "http-errors";

import { createArticle } from "../../services/articles.js";
import { saveFileToCloudinary } from "../../utils/saveFileToCloudinary.js";

export const createArticleController = async (req, res) => {
  if (!req.file) {
    throw createHttpError(400, "Photo is required");
  }

  const uploadResult = await saveFileToCloudinary(req.file.buffer, {
    folder: "articles",
  });

  const article = await createArticle({
    ...req.body,
    photo: uploadResult.secure_url,
    ownerId: req.user._id,
  });

  res.status(201).json({
    status: 201,
    message: "Successfully created an article!",
    data: article,
  });
};
