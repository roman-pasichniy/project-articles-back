import { getArticleById } from "./articles/getArticleById.js";
import { registerUser } from "./auth/registerUser.js";
import { getUserById } from "./users/getUserById.js";
import { updateCurrentUser } from "./users/updateCurrentUser.js";

export const auth = {
  registerUser,
};
export const articles = {
  getArticleById,
};

export const users = {
  getUserById,
  updateCurrentUser,
};
