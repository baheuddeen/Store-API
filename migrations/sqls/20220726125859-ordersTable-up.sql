CREATE TABLE orders (
    id BIGINT,
    user_id INT,
    status VARCHAR(50),
    PRIMARY KEY(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
);
