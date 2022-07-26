CREATE TABLE order_item (
  product_id INT,
  order_id BIGINT,
  quantity INT,
  price FLOAT,
  FOREIGN KEY(product_id) REFERENCES products(id),
  FOREIGN KEY(order_id) REFERENCES orders(id)
);