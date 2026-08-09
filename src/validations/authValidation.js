import { Joi, Segments } from "celebrate";

const refreshUserSessionSchema = {
  [Segments.BODY]: Joi.object()
    .keys({
      refreshToken: Joi.string().trim().required(),
    })
    .required(),
};

export { refreshUserSessionSchema };
