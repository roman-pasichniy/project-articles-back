import { getArticleById } from "./articles/getArticleById.js";
import { getArticles } from "./articles/getArticles.js";
import { registerUser } from "./auth/registerUser.js";
import { getUserById } from "./users/getUserById.js";
import { getArticleCategories } from "./articles/getArticleCategories.js";

export const auth = {
  registerUser,
};
export const articles = {
  getArticleById,
  getArticles,
  getArticleCategories,
};

export const users = {
  getUserById,
};