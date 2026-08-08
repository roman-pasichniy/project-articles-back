import createHttpError from "http-errors";
import { ArticleModel } from "../../models/article.js";

const ALLOWED_CATEGORIES = ["popular", "general"];
const ALLOWED_SORT_FIELDS = ["date", "rate", "title"];
const ALLOWED_SORT_ORDERS = ["asc", "desc"];

export const getArticles = async (req, res, next) => {
  try {
    const page = Number.parseInt(req.query.page ?? "1", 10);
    const perPage = Number.parseInt(req.query.perPage ?? "10", 10);

    const category = req.query.category;
    const sortBy = req.query.sortBy ?? "date";
    const sortOrder = req.query.sortOrder ?? "desc";

    if (!Number.isInteger(page) || page < 1) {
      throw createHttpError(400, "Page must be a positive integer");
    }
    if (!Number.isInteger(perPage) || perPage < 1 || perPage > 100) {
      throw createHttpError(400, "Per page must be an integer from 1 to 100");
    }

    if (category && !ALLOWED_CATEGORIES.includes(category)) {
      throw createHttpError(400, "Category must be popular or general");
    }

    if (!ALLOWED_SORT_FIELDS.includes(sortBy)) {
      throw createHttpError(400, "Sort by must be date, rate or title");
    }

    if (!ALLOWED_SORT_ORDERS.includes(sortOrder)) {
      throw createHttpError(400, "Sort order must be asc or desc");
    }

    const filter = category ? { category } : {};
    const skip = (page - 1) * perPage;
    const sortDirection = sortOrder === "asc" ? 1 : -1;

    const [articles, totalItems] = await Promise.all([
      ArticleModel.find(filter)
        .sort({ [sortBy]: sortDirection })
        .skip(skip)
        .limit(perPage)
        .lean(),

      ArticleModel.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalItems / perPage);

    res.status(200).json({
      page,
      perPage,
      totalItems,
      totalPages,
      hasPreviousPage: page > 1,
      hasNextPage: page < totalPages,
      articles,
    });
  } catch (error) {
    next(error);
  }
};
