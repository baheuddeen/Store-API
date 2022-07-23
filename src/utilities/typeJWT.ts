import jwt from 'jsonwebtoken';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

function internalAccount(token: string) {
  let clientSecret = process.env.JWT_CLIENT_SECRET || 'client-secret';
  return jwt.verify(token, clientSecret);
}

async function googleAccount(token: string): Promise<boolean> {
  // public certificate
  // https://www.googleapis.com/oauth2/v1/certs
  const certificate = await axios('https://www.googleapis.com/oauth2/v1/certs');
  const cers = certificate.data;

  for (let cer in cers) {
    const secret = cers[cer];
    try {
      jwt.verify(
        token,
        secret,
        { algorithms: ['RS256'] },
      );
      return true;
    } catch (err) {            
    }
  }
  return false;
}

export default async function typeJWT(token: string): Promise<string> {
  try {
    const value = await googleAccount(token);
    if (value) {
      return 'googleAccount';
    }
  } catch (err) { }
  try {
    const value = internalAccount(token);
    if (value) {
      return 'internalAccount';
    }
  } catch (err) { }
  return 'invalidJWT';
}

