import { ArticleModel } from "../../models/article.js";

export const getArticles = async (req, res, next) => {
  try {
    const {
      page = 1,
      perPage = 12,
      category,
      sortBy = "date",
      sortOrder = "desc",
    } = req.query;

    const filter = category ? { category } : {};

    const skip = (page - 1) * perPage;
    const sortDirection = sortOrder === "asc" ? 1 : -1;

    const [articles, totalItems] = await Promise.all([
      ArticleModel.find(filter)
        .sort({ [sortBy]: sortDirection, _id: sortDirection })
        .skip(skip)
        .limit(perPage)
        .lean(),

      ArticleModel.countDocuments(filter),
    ]);

    const articlesData = articles.map((article) => ({
      _id: article._id,
      photo: article.img,
      title: article.title,
      description: article.desc,
      date: article.date,
      author: article.name,
      category: article.category,
    }));

    const totalPages = Math.ceil(totalItems / perPage);

    res.status(200).json({
      data: articlesData,
      page,
      perPage,
      totalItems,
      totalPages,
    });
  } catch (error) {
    next(error);
  }
};