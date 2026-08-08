import { Joi, Segments } from "celebrate";

export const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value)
    ? helpers.message("Невірний формат ідентифікатора")
    : value;
};

export const userIdParamSchema = {
  [Segments.PARAMS]: Joi.object({
    userId: Joi.string().custom(objectIdValidator).required(),
  }),
};
