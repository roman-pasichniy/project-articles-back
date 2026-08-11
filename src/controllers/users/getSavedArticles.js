import createHttpError from "http-errors";
import { ArticleModel } from "../../models/article.js";

export const getSavedArticles = async (req, res) => {
  const user = req.user;

 const page = parseInt(req.query.page) || 1;
const perPage = parseInt(req.query.perPage) || 10;
  const skip = (page - 1) * perPage;

  const totalItems = user.savedArticles.length;

  const articleIds = user.savedArticles.slice(skip, skip + perPage);

  const articles = await ArticleModel.find({
    _id: { $in: articleIds },
  }).select("photo title description date author ownerId");

  const totalPages = Math.ceil(totalItems / perPage);

  res.status(200).json({
    articles,
    pagination: {
      page,
      perPage,
      totalItems,
      totalPages,
    },
  });
};