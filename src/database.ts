import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const {
  POSTGRES_HOSTNAME,
  POSTGRES_DATABASE,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
} = process.env;

const client = new Pool({
  host: POSTGRES_HOSTNAME,
  database: POSTGRES_DATABASE,
  user: POSTGRES_USERNAME,
  password: POSTGRES_PASSWORD,
});
  
export default client;