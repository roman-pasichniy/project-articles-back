import { Joi, Segments } from "celebrate";

export const createArticleSchema = Joi.object({
  title: Joi.string().trim().min(3).max(48).required(),

  description: Joi.string().trim().min(100).max(4000).required(),

  date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required(),

  author: Joi.string().trim().min(4).max(50).required(),

  category: Joi.string()
    .valid("popular", "general")
    .required(),
});

export const getIdSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
};
export const updateArticleSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().trim().min(3).max(48),

    description: Joi.string().trim().min(100).max(4000),

    date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/),

    author: Joi.string().trim().min(4).max(50),

    category: Joi.string().valid("popular", "general"),
  }).min(1),

  ...getIdSchema,
};