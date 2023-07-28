# TasteTrove API

## Introduction

The TasteTrove API is an e-commerce RESTful API written in TypeScript and powered by Express.js, PostgreSQL, and Prisma. The API supports operations related to users, products, orders, payments, and addresses.

## Getting Started

Before you begin, ensure that you have Node.js installed on your system. You also need a PostgreSQL database set up either locally or hosted.

1. Clone this repository to your local machine using `git clone https://github.com/your-repo-url/taste-trove-api.git`
2. Run `npm install` in the root directory to install all the required dependencies.
3. Copy the contents of `.env.example` into a new file named `.env` in the root directory and replace the placeholders with your actual information.
4. Run `npm run devStart` to start the development server.

## Directory Structure

```
/server
├── /src
│   ├── /controllers
│   ├── /routes
│   ├── /middlewares
│   ├── /services
│   ├── /types
│   ├── /utils
│   ├── app.ts
│   └── server.ts
├── package.json
└── tsconfig.json
```

## API Documentation

### Auth Routes

| Route                        | HTTP Method | Description                                |
| ---------------------------- | ----------- | ------------------------------------------ |
| `/api/auth/register`       | POST        | Registers a new user.                      |
| `/api/auth/login`          | POST        | Logs in a user.                            |
| `/api/auth/refresh`        | POST        | Refreshes the user's authentication token. |
| `/api/auth/logout`         | POST        | Logs out a user.                           |
| `/api/auth/reset-password` | POST        | Allows a user to reset their password.     |

### User Routes

| Route                                  | HTTP Method | Description                                                   |
| -------------------------------------- | ----------- | ------------------------------------------------------------- |
| `/api/users`                         | GET         | Fetches all users. Available to admin users only.             |
| `/api/users/:id`                     | GET         | Fetches a specific user by id.                                |
| `/api/users/:id`                     | PUT         | Updates a specific user by id. Available to admin users only. |
| `/api/users/:id`                     | DELETE      | Deletes a specific user by id. Available to admin users only. |
| `/api/users/:userId/cart`            | GET         | Fetches a user's cart.                                        |
| `/api/users/:userId/cart`            | POST        | Adds an item to a user's cart.                                |
| `/api/users/:userId/cart`            | PUT         | Updates a user's cart.                                        |
| `/api/users/:userId/cart/:productId` | DELETE      | Removes a specific product from a user's cart.                |
| `/api/users/:userId/cart/`           | DELETE      | Clears a user's cart.                                         |

### Product Routes

| Route                          | HTTP Method | Description                                                               |
| ------------------------------ | ----------- | ------------------------------------------------------------------------- |
| `/api/products`              | GET         | Fetches all products.                                                     |
| `/api/products`              | POST        | Creates a new product. Available to admin users only.                     |
| `/api/products/:id`          | GET         | Fetches a specific product by id.                                         |
| `/api/products/:id`          | PUT         | Updates a specific product by id. Available to admin users only.          |
| `/api/products/:id`          | DELETE      | Deletes a specific product by id. Available to admin users only.          |
| `/api/products/category`     | GET         | Fetches all product categories.                                           |
| `/api/products/category`     | POST        | Creates a new product category. Available to admin users only.            |
| `/api/products/category/:id` | GET         | Fetches a specific product category by id.                                |
| `/api/products/category/:id` | PUT         | Updates a specific product category by id. Available to admin users only. |
| `/api/products/category/:id` | DELETE      | Deletes a specific product category by id. Available to admin users only. |

### Order Routes

| Route                          | HTTP Method | Description                                                    |
| ------------------------------ | ----------- | -------------------------------------------------------------- |
| `/api/orders`                | GET         | Fetches all orders. Available to admin users only.             |
| `/api/orders/:id`            | GET         | Fetches a specific order by id.                                |
| `/api/orders/:id`            | DELETE      | Deletes a specific order by id. Available to admin users only. |
| `/api/orders/:orderId/items` | GET         | Fetches items of a specific order.                             |

### Payment Routes

| Route                     | HTTP Method | Description                                                  |
| ------------------------- | ----------- | ------------------------------------------------------------ |
| `/api/payments/intent`  | POST        | Creates a Stripe PaymentIntent.                              |
| `/api/payments/webhook` | POST        | Confirms a PaymentIntent and creates an order if successful. |

### Address Routes

| Route                | HTTP Method | Description                       |
| -------------------- | ----------- | --------------------------------- |
| `/api/address`     | GET         | Fetches all addresses for a user. |
| `/api/address`     | POST        | Adds a new address for a user.    |
| `/api/address/:id` | GET         | Fetches a specific address by id. |
| `/api/address/:id` | PUT         | Updates a specific address by id. |
| `/api/address/:id` | DELETE      | Deletes a specific address by id. |

Each route expects specific parameters and JSON payloads, and returns certain responses. For more detail about each route, please refer to the route documentation in the `/src/routes` directory.

## Error Handling

The application uses centralized error handling, which simplifies error processing and allows for a cleaner codebase. All errors are forwarded to the `errorHandler` middleware function in `app.ts` for processing.

## License

This project is licensed under the MIT license. For more information, refer to the `LICENSE` file in the repository.
