import Joi from 'joi';

const userSchemma = Joi.object({
  nome: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  senha: Joi.string().min(6).max(12).required(),
});

export default {
  userSchemma,
};
