# Storefront Backend Project

## Getting Started
1-create .env file and make sure it has the same variables in .env-Example file.\
2- use the docker-compose.yml and configure it with your environment to create Postgres database\
3- create two database "store_dev" and "store_test"

### 1- Install 
- to install node_modules
run
```
npm install
```

-  to create the database tables.
run 
```
db-migrate up
```


### 2- End points APIs
## 1- Users
- End point: "/api/users/create"  to create a new user 

- request:\
method : post
url: "http://localhost:3000/api/users/create"
body:
{
    "firstName": "your_first_name",
    "lastName": "your_last_name",
    "email": "your_email",
    "password": "your_password"
}
- response:\
status 200 "signed up successfully"
Set Cookie with your _jwt used for authorization. 

- End point: "/api/users/userInfo"  to get the signed in user details
using the _jwt stored in cookies

- request:\ 
method : get
url: "http://localhost:3000/api/users/userInfo"

- response:\ 
status 200 
{
    "id": 1,
    "first_name": "your_name",
    "last_name": "your_last_name",
    "email": "your_email"
}

- End point: "/api/users/"  to show all users

- request:\ 
method : get
url: "http://localhost:3000/api/users/"

- response:\ 
status 200 array of users
[
    {
        "id": 1,
        "first_name": "your_name",
        "last_name": "your_last_name",
        "email": "your_email"
    }
]


- End point: "/api/users/:id"  to show all users

- request:\ 
method : get
url: "http://localhost:3000/api/users/1"

- response:\ 
status 200 array of users
{
    "id": 1,
    "first_name": "your_name",
    "last_name": "your_last_name",
    "email": "your_email"
}








## 2- Product
- End point: "/api/products/create"  to create a new product 

- request:\ 
method : post
url: "http://localhost:3000/api/products/create"
body:
{
    "name": "product_name",
    "price": price,
    "category": "category"
}
- response:\ 
status 200 
{
    "id": 1,
    "name": "product_name",
    "price": price,
    "category": "category"
}


- End point: "/api/products/"  to show all products

- request:\ 
method : get
url: "http://localhost:3000/api/products/"

- response:\ 
status 200 [products]
[
    {
        "id": 1,
        "name": "product_name",
        "price": price,
        "category": "category"
    }
]

- End point: "/api/products/:id"  to show a product with id

- request:\ 
method : get
url: "http://localhost:3000/api/products/1"

- response:\ 
status 200 [products]
{
    "id": 1,
    "name": "product_name",
    "price": price,
    "category": "category"
}

-


## 3- Orders.
i'm using the _JWT cookies to get the user information and create an order with a unique order_id
the user can use this order_id to add products to his order

- End point "/api/orders/create" to create a new Order
- request:\ 
method : post
url: "http://localhost:3000/api/orders/create"

- response:\ 
status 200 
{
    "id": order_id,
    "user_id": "user_id",
    "status": "status",
}

- End point "/api/orders/" to get all orders made by the current logged in user
- request:\ 
method : get
url: "http://localhost:3000/api/orders/"

- response:\ 
status 200 
{
    "id": order_id,
    "user_id": "user_id",
    "status": "status",
}


- End point "/api/orders/complete" to complete an order.
- request:\ 
method : post
url: "http://localhost:3000/api/orders/complete"
body
{
    "id": order_id
}
- response:\ 
status 200 
{
    "id": "order_id",
    "user_id": user_id,
    "status": "completed"
}


## 4- order-items

- End point "/api/order_item/create" to add a product to an order.
- request:\ 
method : post
url: "http://localhost:3000/api/order_item/create"
body
{
    "order_id": 1657989855234,
    "product_id": "1",
    "quantity": 4
}

- response:\ 
status 200 
{
    "product_id": 1,
    "order_id": "1658574666538",
    "quantity": 4,
    "price": 70
}

- End point "/api/order_item/:id" 
the id here is the Order_id
this end point is to get all order-items added to this order
- request:\ 
method : get
url: "http://localhost:3000/api/order_item/{order-id}"

- response:\ 
status 200 [order-items]
[
    {
        "product_id": "product_id",
        "order_id": "order_id",
        "quantity": quantity,
        "price": price
    },
]
