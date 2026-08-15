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

    const POPULAR_LIMIT = 35;
    const isPopular = category === "popular";

    const sortDirection = sortOrder === "asc" ? 1 : -1;

    const filter = {};

    const sort = isPopular
      ? { rate: -1, _id: -1 }
      : { [sortBy]: sortDirection, _id: sortDirection };
        
    const skip = (currentPage - 1) * itemsPerPage;

    const availableItems = isPopular
      ? Math.max(POPULAR_LIMIT - skip, 0)
      : itemsPerPage;

    const limit = isPopular
      ? Math.min(itemsPerPage, availableItems)
      : itemsPerPage;

    const [articles, totalItems] = await Promise.all([
      ArticleModel.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),

      ArticleModel.countDocuments(filter).then((count) =>
        isPopular ? Math.min(count, POPULAR_LIMIT) : count
      ),
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
