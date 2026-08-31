# ShoppyGlobe Backend

A RESTful backend API for the **ShoppyGlobe e-commerce application**, built using **Node.js, Express.js, MongoDB, and Mongoose**.

The backend provides APIs for products, user authentication, cart management, and orders. JWT authentication is used to protect cart and order-related operations.

---

## Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (JSON Web Token)
* bcryptjs
* CORS
* dotenv
* Nodemon

---

## Project Structure

```text
shoppy-globe-backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── cartController.js
│   ├── orderController.js
│   └── productController.js
│
├── data/
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   ├── Cart.js
│   ├── Order.js
│   ├── Product.js
│   └── User.js
│
├── routes/
│   ├── authRoutes.js
│   ├── cartRoutes.js
│   ├── orderRoutes.js
│   └── productRoutes.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── seed.js
└── server.js
```

---

## Features

### Product Management

* Get all products
* Get a single product
* Create a product
* Update a product
* Delete a product
* Product validation
* Product not-found handling

### User Authentication

* User registration
* Password hashing using bcrypt
* User login
* JWT token generation
* JWT token verification
* Protected routes

### Cart Management

* Get user's cart
* Add products to cart
* Increase/decrease product quantity
* Update cart item quantity
* Remove cart items
* Protected cart routes using JWT

### Order Management

* Create orders
* Store customer information
* Store ordered products
* Calculate and store order total
* Associate orders with authenticated users

---

## Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Navigate into the project:

```bash
cd shoppy-globe-backend
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Do not upload the `.env` file to GitHub.

---

## Running the Server

### Start the server

```bash
npm start
```

### Start using Nodemon

```bash
npm run dev
```

The server runs on:

```text
http://localhost:5000
```

You can test the server using:

```text
http://localhost:5000/
```

Expected response:

```text
ShoppyGlobe API is running
```

---

# API Endpoints

## Authentication

### Register

```text
POST /api/auth/register
```

Example request:

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "Test@123"
}
```

### Login

```text
POST /api/auth/login
```

Example request:

```json
{
  "email": "test@example.com",
  "password": "Test@123"
}
```

The login response provides a JWT token.

For protected routes, send the token using:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

---

# Product APIs

### Get all products

```text
GET /api/products
```

### Get product by ID

```text
GET /api/products/:id
```

### Create product

```text
POST /api/products
```

Example:

```json
{
  "id": 999,
  "title": "Test Product",
  "description": "Product created for API testing",
  "price": 25.99,
  "stock": 50,
  "rating": 4.5,
  "category": "test",
  "thumbnail": "https://example.com/test.jpg"
}
```

### Update product

```text
PUT /api/products/:id
```

Example:

```json
{
  "price": 29.99,
  "stock": 45
}
```

### Delete product

```text
DELETE /api/products/:id
```

---

# Cart APIs

All cart routes require JWT authentication.

### Get cart

```text
GET /api/cart
```

### Add item to cart

```text
POST /api/cart
```

Example:

```json
{
  "productId": 1,
  "title": "Essence Mascara Lash Princess",
  "price": 9.99,
  "quantity": 1,
  "thumbnail": "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp"
}
```

### Update cart item

```text
PUT /api/cart/:id
```

Example:

```json
{
  "quantity": 3
}
```

The `:id` is the MongoDB `_id` of the cart item.

### Delete cart item

```text
DELETE /api/cart/:id
```

The `:id` is the MongoDB `_id` of the cart item.

---

# Order API

### Create order

```text
POST /api/orders
```

The order contains customer information, ordered products, quantities, prices, and the total amount.

---

# Authentication

JWT authentication is implemented using `jsonwebtoken`.

Protected routes verify the token using the authentication middleware.

Example:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

If the token is missing:

```json
{
  "message": "Authentication required"
}
```

If the token is invalid or expired:

```json
{
  "message": "Invalid or expired token"
}
```

---

# Error Handling

The backend handles common errors including:

* Missing required fields
* Invalid or expired JWT tokens
* Product not found
* Cart not found
* Cart item not found
* Duplicate users
* Duplicate product IDs
* Invalid quantities
* Server/database errors

Appropriate HTTP status codes are returned for successful and failed requests.

---

# Testing

The APIs were tested using **Thunder Client**.

The following API operations were tested:

* User registration
* User login
* Get all products
* Get product by ID
* Create product
* Update product
* Delete product
* Get cart
* Add item to cart
* Update cart item
* Delete cart item
* Protected route authentication

MongoDB collections were also verified using MongoDB Atlas.

---

# Database

The project uses MongoDB with Mongoose.

Main collections include:

```text
users
products
carts
orders
```

MongoDB Atlas is used for database storage.

---

# GitHub

The complete backend source code is available in the GitHub repository.

link:https://github.com/naikmohit379-lab/ShoppyGlobe_BackEnd

Make sure the `.env` file is excluded from the repository before pushing the project.

---

## Author

**Mohith Naik**

ShoppyGlobe Backend Project
