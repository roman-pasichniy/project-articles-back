import { getArticleById } from "./articles/getArticleById.js";
import { registerUser } from "./auth/registerUser.js";

export const auth = {
  registerUser,
};
export const articles = {
  getArticleById,
};
