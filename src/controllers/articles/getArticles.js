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

    const filter =
  category === "popular"
    ? { rate: { $gte: 43 } }
    : {};

    const currentPage = Number(page);
    const itemsPerPage = Number(perPage);

    const skip = (currentPage - 1) * itemsPerPage;

    const sortDirection = sortOrder === "asc" ? 1 : -1;

    const [articles, totalItems] = await Promise.all([
      ArticleModel.find(filter)
        .sort({ [sortBy]: sortDirection, _id: sortDirection })
        .skip(skip)
        .limit(itemsPerPage)
        .lean(),

      ArticleModel.countDocuments(filter),
    ]);

    const articlesData = articles.map((article) => ({
      _id: article._id.toString(),
      photo: article.photo ?? article.img,      
      title: article.title,
      description: article.description ?? article.desc,
      content: article.content ?? article.article,
      rate: article.rate,
      ownerId: article.ownerId,
      date: article.date,
      author: article.author,
      category: article.category,
    }));
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    res.status(200).json({
      data: articlesData,
      page: currentPage,
      perPage: itemsPerPage,
      totalItems,
      totalPages,
    });
  } catch (error) {
    next(error);
  }
};
