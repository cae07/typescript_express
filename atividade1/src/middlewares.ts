import { Request, Response, NextFunction } from "express";
import User from "./User";
const Joi = require('./utils/validations');

export const validateFields = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response<string> | void> => {
  const { nome, email, senha } = req.body as User;
  const { error } = Joi.userSchemma({nome, email, senha});
  
  if (error) {
    const MESSAGE = error.details[0].message;
    return res.status(404).send(MESSAGE);
  }

  next()
}
