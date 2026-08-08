import { ArticleModel } from "../../models/article.js";

export const getArticles = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.perPage) || 10;

    const skip = (page - 1) * perPage;

    const articles = await ArticleModel.find()
      .skip(skip)
      .limit(perPage)
      .lean();

    const totalItems = await ArticleModel.countDocuments();

    const articlesData = articles.map((article) => ({
      _id: article._id,
      title: article.title,
      description: article.description,
      photo: article.photo,
      date: article.date,
      author: article.author,
    }));

    res.status(200).json({
      data: articlesData,
      page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
    });
  } catch (error) {
    next(error);
  }
};