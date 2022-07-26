import client from '../../database.js';

export type OrderType = {
  id?: number;
  user_id: number;
  status: string;
};

export default class Order {
  // get user with certien id
  async show(user_id: number):Promise<OrderType[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders WHERE user_id=($1)';
      const products = await conn.query(sql, [user_id]);
      conn.release();      
      if (!products.rows[0]) throw Error(`no order for id = ${user_id}`);
      return products.rows;
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  async create(newOrder: OrderType): Promise<OrderType> {        
    try {
      const conn = await client.connect();
      const sql = 'INSERT INTO orders (id, user_id, status) VALUES ($1, $2, $3) RETURNING *';
      const products = await conn.query(sql, [newOrder.id, newOrder.user_id, newOrder.status]);
      conn.release();  
      return products.rows[0];
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  async complete(id: number): Promise<OrderType> {
        
    try {
      const conn = await client.connect();
      const sql = 'Update orders SET status = $1 WHERE id = $2 RETURNING *';
      const products = await conn.query(sql, ['completed', id]);
      conn.release();  
      if (!products.rows[0]) throw Error(`no order with id = ${id}`);
      return products.rows[0];
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }
}