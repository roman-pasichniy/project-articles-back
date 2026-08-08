import { Joi } from "celebrate";

export const createArticleSchema = Joi.object({
  title: Joi.string().trim().min(3).max(48).required(),

  description: Joi.string().trim().min(100).max(4000).required(),

  date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required(),

  author: Joi.string().trim().min(4).max(50).required(),
});
