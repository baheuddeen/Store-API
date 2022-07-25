import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const {
  POSTGRES_HOSTNAME,
  POSTGRES_DATABASE_DEV,
  POSTGRES_DATABASE_TEST,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  ENV,
} = process.env;

console.log(ENV);
console.log(ENV == 'test', ENV);


const client = new Pool({
  host: POSTGRES_HOSTNAME,
  database: (ENV == 'test') ? POSTGRES_DATABASE_TEST : POSTGRES_DATABASE_DEV,
  user: POSTGRES_USERNAME,
  password: POSTGRES_PASSWORD,
});
  
export default client;