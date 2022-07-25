import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default async function validateJWT(req:Request, res:Response, next:NextFunction) {
  const token = req.cookies._jwt;
  try {
    let clientSecret = process.env.JWT_CLIENT_SECRET || 'client-secret';
    let value = jwt.verify(token, clientSecret);   
    if (value) {
      return next();
    }
  } catch (err) {}
  return res.status(401).json({ msg: 'please signin first ..' });
}
