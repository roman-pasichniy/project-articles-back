import { Joi, Segments } from "celebrate";

export const userIdParamSchema = {
  [Segments.PARAMS]: Joi.object({
    userId: Joi.string().custom(objectIdValidator).required(),
  }),
};
