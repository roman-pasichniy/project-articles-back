import createHttpError from "http-errors";
import mongoose from "mongoose";
import { ArticleModel } from "../../models/article.js";
import { UserModel } from "../../models/user.js";

export const getArticleById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw createHttpError(400, "Invalid article Id");
    }

    const article = await ArticleModel.findById(id).lean();

    if (!article) {
      throw createHttpError(404, "Article not found");
    }

    const owner = await UserModel.findById(article.ownerId)
      .select("_id name avatarUrl")
      .lean();

    const response = {
      _id: article._id.toString(),
      photo: article.photo ?? article.img,      
      title: article.title,
      description: article.description ?? article.desc,
      content: article.content ?? article.article,
      rate: article.rate,
      date: article.date,
      owner: owner
        ? {
            _id: owner._id,
            name: owner.name,
            avatarUrl: owner.avatarUrl,
          }
        : null,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};