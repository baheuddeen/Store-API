import bcrypt from 'bcrypt';
import client from '../../database.js';

export type UserType = {
  id: number;
  first_name: string;
  last_name: string;
  password: string;
  email: string;
};

export default class User {
  // retrive all users
  async index():Promise<UserType[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT id, first_name, last_name, email FROM users';
      const students = await conn.query(sql);
      conn.release();      
      return students.rows;
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  // get user with id
  async show(id: number):Promise<UserType> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT id, first_name, last_name, email FROM users WHERE id=($1)';
      const students = await conn.query(sql, [id]);
      conn.release();
      if (!students.rows[0]) throw Error(`no user with id = ${id}`);
      return students.rows[0];
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async create(newUser: UserType): Promise<UserType> {
    try {
      const salt = bcrypt.genSaltSync(10);
      const password = bcrypt.hashSync(newUser.password, salt);
      const conn = await client.connect();
      const sql = 'INSERT INTO users (first_name, last_name, password, email) VALUES ($1, $2, $3, $4) RETURNING *';
      const students = await conn.query(sql, [newUser.first_name, newUser.last_name, password, newUser.email]);
      conn.release();      
      return students.rows[0];
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  async getPassword(email: string): Promise<string> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT password FROM users WHERE email=($1)';
      const students = await conn.query(sql, [email]);
      conn.release(); 
      if (students.rowCount == 0) {
        throw new Error('this email is not exist');
      }
      return students.rows[0].password;
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }
}