CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(200)
); 


CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    price FLOAT,
    category VARCHAR(50)
);

CREATE TABLE orders (
    id BIGINT,
    user_id INT,
    status VARCHAR(50),
    PRIMARY KEY(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE order_item (
  product_id INT,
  order_id BIGINT,
  quantity INT,
  price FLOAT,
  FOREIGN KEY(product_id) REFERENCES products(id),
  FOREIGN KEY(order_id) REFERENCES orders(id)
);

