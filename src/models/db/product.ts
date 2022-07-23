import client from '../../database.js';

type ProductType = {
  id: number;
  name: string;
  price: number;
  category: string;
};

export default class Product {
  // retrive all users
  async index():Promise<ProductType[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products';
      const products = await conn.query(sql);
      conn.release();      
      return products.rows;
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  // get user with certien id
  async show(id: number):Promise<ProductType> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const products = await conn.query(sql, [id]);
      conn.release();      
      if (!products.rows[0]) throw Error(`no user with id = ${id}`);
      return products.rows[0];
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  async create(newProduct: ProductType): Promise<ProductType> {
    try {
      const conn = await client.connect();
      const sql = 'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *';
      const products = await conn.query(sql, [newProduct.name, newProduct.price, newProduct.category]);
      conn.release();      
      return products.rows[0];
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }
}