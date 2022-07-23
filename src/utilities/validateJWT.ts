import { NextFunction, Request, Response } from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function internalAccount(token: string) {
  let clientSecret = process.env.JWT_CLIENT_SECRET || 'client-secret';
  return jwt.verify(token, clientSecret);   
}

async function googleAccount(token: string): Promise<boolean> {
  // public certificate
  // https://www.googleapis.com/oauth2/v1/certs


  var res = await axios.get('https://www.googleapis.com/oauth2/v1/certs');
  for (let key in res.data) {
    let secret = res.data[key];
    try {
      jwt.verify(
        token,
        secret,
        { algorithms: ['RS256'] },
      );
      return true;
    } catch (_err) {
      continue;
    }
  }
  return false;
}

export default async function validateJWT(req:Request, res:Response, next:NextFunction) {
  const token = req.cookies._jwt;
  try {
    const value = await googleAccount(token);
    if (value) {
      return next();
    }
  } catch (err) {}
  try {
    const value = internalAccount(token);
    if (value) {
      return next();
    }
  } catch (err) {}
  return res.status(401).json({ msg: 'please signin first ..' });
}
