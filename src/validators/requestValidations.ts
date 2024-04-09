import Joi from '@hapi/joi';

export const validateUpdateCart = (data) => {
  const schema = Joi.object({
    productId: Joi.string().required(),
    count: Joi.number().required()
  });

  return schema.validate(data);
};