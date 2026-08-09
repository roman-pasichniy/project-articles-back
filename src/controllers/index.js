import { getArticleById } from "./articles/getArticleById.js";
import { getArticles } from "./articles/getArticles.js";
import { currentUser } from "./auth/currentUser.js";
import { registerUser } from "./auth/registerUser.js";
import { getUserById } from "./users/getUserById.js";
import { getAuthors } from "./users/getAuthors.js";
import { updateCurrentUser } from "./users/updateCurrentUser.js";
import { getArticles } from "./articles/getArticles.js";
import { getArticleCategories } from "./articles/getArticleCategories.js";

export const auth = {
  registerUser,
  currentUser,
};
export const articles = {
  getArticleById,
  getArticles,
  getArticleCategories,
};

export const users = {
  getUserById,
  updateCurrentUser,
  getAuthors,
};
