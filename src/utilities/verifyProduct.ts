import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const schema = Joi.object({
  name: Joi.string().min(1).required(),
  price : Joi.number().required(),
  category: Joi.string(),
});

export default function verifyProduct(req: Request, res: Response, next: NextFunction) {
  const error = schema.validate(req.body).error;
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  next();
}