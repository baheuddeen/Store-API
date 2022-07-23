import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserType } from '../models/db/user';

dotenv.config();

export default function generateJWT(user: UserType) {
  let clientSecret = process.env.JWT_CLIENT_SECRET || 'client-secret';
  const jwt = Jwt.sign({
    'sub': '1234567890',
    'email': user.email,
    'user_id': user.id,
    'user': true,
  },
  clientSecret );
  return jwt;
}