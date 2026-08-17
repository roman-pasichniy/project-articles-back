import createHttpError from "http-errors";
import { UserModel } from "../../models/user.js";

export const getAuthors = async (req, res, next) => {
  try {
    // 1. ПАГІНАЦІЯ: валідація та безпечне парсинг параметрів
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;

    if (Number.isNaN(page) || Number.isNaN(limit) || page < 1 || limit < 1) {
      throw createHttpError(400, "Invalid page or limit parameters");
    }

    const skip = (page - 1) * limit;

    // 2. ЗАПИТИ ДО БД: паралельний пошук та швидкий підрахунок
    const [rawAuthors, totalAuthors] = await Promise.all([
      UserModel.find()
        .select("_id name avatarUrl articlesAmount email")
        .sort({ name: 1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      // Швидший аналог countDocuments() для повної колекції
      UserModel.estimatedDocumentCount(), 
    ]);

    // МАПІНГ: додаємо id та створюємо чистий об'єкт для фронтенду
    const authors = rawAuthors.map((author) => ({
      ...author,
      id: author._id.toString(),
    }));

    const totalPages = Math.ceil(totalAuthors / limit);

    // 3. ВІДПОВІДЬ: структура без зайвого дублювання
    res.status(200).json({
      success: true,
      authors,
      pagination: {
        totalAuthors,
        totalPages,
        currentPage: page,
        perPage: limit,
        hasNextPage: page < totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
};
