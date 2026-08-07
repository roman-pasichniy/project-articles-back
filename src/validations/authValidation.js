import { Joi, Segments } from "celebrate";

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    repeatPassword: Joi.any().valid(Joi.ref("password")).required(),
  }),
};
