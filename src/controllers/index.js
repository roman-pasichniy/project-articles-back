import { getArticleById } from "./articles/getArticleById.js";
import { registerUser } from "./auth/registerUser.js";
import { getUserById } from "./users/getUserById.js";
import { getArticles } from "./articles/getArticles.js";
import { getArticleCategories } from "./articles/getArticleCategories.js";

export const auth = {
  registerUser,
};
export const articles = {
  getArticles,
  getArticleById,
  getArticleCategories,
};

export const users = {
  getUserById,
};
