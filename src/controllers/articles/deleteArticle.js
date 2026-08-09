import createHttpError from "http-errors";
import { ArticleModel } from "../../models/article.js";

export const deleteArticle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const article = await ArticleModel.findById(id);
    if (!article) {
      throw createHttpError(404, `Article with id ${id} not found`);
    }
    await ArticleModel.deleteOne({ _id: id });
    res.status(200).json({
      status: 200,
      message: `Article with id ${id} deleted successfully`,
      data: article,
    });
  } catch (error) {
    next(error);
  }
};
