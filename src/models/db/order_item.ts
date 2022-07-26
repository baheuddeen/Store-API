import client from '../../database.js';

export type OrderItemType = {
  product_id: number;
  order_id: number;
  quantity: number;
  price?: number;
};

export default class OrderItem {
  // get user with certien id
  async show(order_id: number):Promise<OrderItemType[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM order_item WHERE order_id=($1)';
      const products = await conn.query(sql, [order_id]);
      conn.release();      
      if (!products.rows[0]) throw Error(`no items for order = ${order_id}`);
      return products.rows;
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  async create(newOrderItem: OrderItemType): Promise<OrderItemType> {        
    try {
      let conn = await client.connect();
      let sql = 'SELECT price FROM products WHERE id =($1)';
      const price = await conn.query(sql, [newOrderItem.product_id]);
      conn.release();  
      if (!price.rowCount) throw Error(`no product with this id ${newOrderItem.product_id}`);
      conn = await client.connect();            
      const totalPrice = newOrderItem.quantity * price.rows[0].price;
      sql = 'INSERT INTO order_item (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *';
      const products = await conn.query(sql, [newOrderItem.order_id, newOrderItem.product_id, newOrderItem.quantity, totalPrice]);
      conn.release();  
      return products.rows[0];
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

}