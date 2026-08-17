import createHttpError from "http-errors";
import { UserModel } from "../../models/user.js";

export const getAuthors = async (req, res, next) => {
  try {
    // 1. ПАГІНАЦІЯ: за замовчуванням сторінка 1
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    if (page < 1 || limit < 1) {
      throw createHttpError(400, "Invalid page or limit parameters");
    }

    // 2. ЗАПИТИ ДО БД: пошук авторів та рахунок їх загальної кількості
    const [authors, totalAuthors] = await Promise.all([
      UserModel.find()
        .select("_id name avatarUrl articlesAmount email")
        .sort({ name: 1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      UserModel.countDocuments(),
    ]);

    const totalPages = Math.ceil(totalAuthors / limit);

    // 3. ВІДПОВІДЬ: повернення даних для майбутнього фронтенду
    res.status(200).json({
      success: true,
      page,
      hasNextPage: page < totalPages,
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
