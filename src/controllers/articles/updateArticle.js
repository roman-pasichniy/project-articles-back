import createHttpError from "http-errors";
import { ArticleModel } from "../../models/article.js";

export const updateArticle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedArticle = await ArticleModel.findOneAndUpdate(
      { _id: id },
      updateData,
      {
        new: true,
        runValidators: true,
      },
    ).lean();

    if (!updatedArticle) {
      throw createHttpError(404, `Article with id ${id} not found`);
    }

    res.status(200).json({
      status: 200,
      message: `Article with id ${id} updated successfully`,
      data: updatedArticle,
    });
  } catch (error) {
    next(error);
  }
};
