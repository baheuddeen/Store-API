# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show
- Create [token required]

#### Users
- Index [token required]
- Show [token required]
- Create 
- userInfo [token required]

#### Orders
- Current Order by user (args: user id)[token required]
- Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
| column        | data_type |
| ------------- |:-------------:|
| id            | Serial Primary key     |
| name          | VARCHAR(50)     |
| price         | FLOAT     |
| category      | VARCHAR(50)     |


#### User
| column             | data_type |
| ------------------ | ----------:|
| id                 | SERIAL PRIMARY KEY |
| first_name         | VARCHAR(50) |
| last_name          | VARCHAR(50) |
| email              | VARCHAR(100) UNIQUE|
| password           | VARCHAR(200) |

#### Orders
| column             | data_type |
| ------------------ | ----------:|
| id                 | BIGINT Primary Key|
| user_id            | INT FOREIGN Key REFERENCES user(id) |
| status             | VARCHAR(50) |

### order-items
| column             | data_type |
| ------------------ | ----------:|
| product_id         | INT FOREIGN KEY REFERENCES product(id)|
| order_id           | BIGINT FOREIGN KEY REFERENCES Orders(id)|
| quantity           | INT |
| price              | FLOAT |