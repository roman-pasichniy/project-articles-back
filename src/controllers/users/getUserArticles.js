// import createHttpError from "http-errors";

// import { ArticleModel } from "../../models/article.js";
// import { UserModel } from "../../models/user.js";

// export const getUserArticles = async (req, res) => {
//   const { userId } = req.params;

//   const page = parseInt(req.query.page);
//   const perPage = parseInt(req.query.perPage);
//   const skip = (page - 1) * perPage;

//   const user = await UserModel.findById(userId);

//   if (!user) {
//     throw createHttpError(404, "Такий користувач відсутній");
//   }

//   const totalItems = await ArticleModel.countDocuments({
//     ownerId: userId,
//   });

//   const articles = await ArticleModel.find({
//   ownerId: userId,
// })
//   .select("img title desc ownerId date")
//   .skip(skip)
//   .limit(perPage);

//   console.log("ARTICLES FROM DB:", articles);

//   const totalPages = Math.ceil(totalItems / perPage);

//   res.status(200).json({
//     articles,
//     pagination: {
//       page,
//       perPage,
//       totalItems,
//       totalPages,
//     },
//   });
// };

import createHttpError from "http-errors";

import { ArticleModel } from "../../models/article.js";
import { UserModel } from "../../models/user.js";

export const getUserArticles = async (req, res) => {
  const { userId } = req.params;

  const page = parseInt(req.query.page);
  const perPage = parseInt(req.query.perPage);
  const skip = (page - 1) * perPage;

  const user = await UserModel.findById(userId);

  if (!user) {
    throw createHttpError(404, "Такий користувач відсутній");
  }

  const totalItems = await ArticleModel.countDocuments({
    ownerId: userId,
  });

  const articles = await ArticleModel.find({
    ownerId: userId,
  })
    .select("img photo title desc description author ownerId date")
    .skip(skip)
    .limit(perPage)
    .lean();

  const formattedArticles = articles.map((article) => ({
    _id: article._id,
    title: article.title,
    description: article.description ?? article.desc ?? "",
    photo: article.photo ?? article.img ?? "",
    author: article.author ?? user.name,
    ownerId: article.ownerId,
    date: article.date,
  }));

  console.log("ARTICLES:", formattedArticles);

  const totalPages = Math.ceil(totalItems / perPage);

  res.status(200).json({
    articles: formattedArticles,
    pagination: {
      page,
      perPage,
      totalItems,
      totalPages,
    },
  });
};