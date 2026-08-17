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

    const currentPage = Number(page);
    const itemsPerPage = Number(perPage);

    const isPopular = category === "popular";

    const filter = isPopular ? {} : category ? { category } : {};

    const skip = (currentPage - 1) * itemsPerPage;
    const sortDirection = sortOrder === "asc" ? 1 : -1;

    const [articles, totalItems] = await Promise.all([
      ArticleModel.find(filter)
        .populate("ownerId", "name")
        .sort(
          isPopular
            ? { rate: -1, _id: -1 }
            : { [sortBy]: sortDirection, _id: sortDirection },
        )
        .skip(skip)
        .limit(itemsPerPage)
        .lean(),

      ArticleModel.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const articlesData = articles.map((article) => ({
      _id: article._id.toString(),
      photo: article.photo ?? article.img,
      title: article.title,
      description: article.description ?? article.desc,
      content: article.content ?? article.article,
      rate: article.rate,
      date: article.date,
      ownerId:
        article.ownerId?._id?.toString() ??
        article.ownerId?.toString() ??
        null,
      author: article.ownerId?.name ?? null,
      category: article.category
    }));

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