import { Pool } from 'pg';
import dotenv from 'dotenv';

require('pg').defaults.parseInt8 = true;

dotenv.config();

const {
  POSTGRES_HOSTNAME,
  POSTGRES_DATABASE_DEV,
  POSTGRES_DATABASE_TEST,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  ENV,
} = process.env;

const client = new Pool({
  host: POSTGRES_HOSTNAME,
  database: (ENV == 'test') ? POSTGRES_DATABASE_TEST : POSTGRES_DATABASE_DEV,
  user: POSTGRES_USERNAME,
  password: POSTGRES_PASSWORD,
});
  
export default client;