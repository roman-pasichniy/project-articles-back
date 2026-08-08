import { getArticleById } from "./articles/getArticleById.js";
import { getArticles } from "./articles/getArticles.js";
import { registerUser } from "./auth/registerUser.js";

export const auth = {
  registerUser,
};
export const articles = {
  getArticleById,
  getArticles,
};
