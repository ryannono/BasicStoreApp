# TasteTrove Server

The TasteTrove Server is a RESTful API built using Express.js with TypeScript. It provides the necessary endpoints for the TasteTrove E-commerce application, including operations for users, products, carts, orders, and addresses. The server also integrates with the Stripe payment processing system.

## Prerequisites

Ensure you have the following installed on your system:

- Node.js (v14 or above)
- npm (v7 or above)

## Installation and Setup

To set up the TasteTrove server locally, follow these steps:

1. Clone the repository

```bash
git clone https://github.com/username/tastetrove-server.git
```

2. Navigate to the project root directory

```bash
cd tastetrove-server
```

3. Install the dependencies

```bash
npm install
```

## Directory Structure

Here's a brief overview of the directory structure:

- `controllers/`: Contains all controller files, which handle HTTP requests and sending HTTP responses.
- `models/`: Contains data models that interact with the database.
- `routes/`: Contains all routing files, which decide which controller gets to handle incoming requests.
- `middlewares/`: Contains middleware functions for handling things like authentication and error handling.
- `services/`: Contains files related to third-party services the application might interact with.
- `utils/`: Contains utility functions and constants used across the application.
- `prisma/`: Contains the Prisma schema and environment variables files.

For more detailed information about each directory, refer to the `README.md` file within each directory.

## API Endpoints

### Auth Endpoints

- `POST /register`: Register a new user.
- `POST /login`: Login a user.
- `POST /refresh`: Refresh a user's session.
- `POST /logout`: Logout a user.
- `POST /reset-password`: Reset a user's password.

### User Endpoints

- `GET /`: Get all users.
- `GET /:id`: Get a user by ID.
- `PUT /:id`: Update a user by ID.
- `DELETE /:id`: Delete a user by ID.

### Product Endpoints

- `POST /products`: Create a new product.
- `GET /products`: Get all products.
- `GET /products/:id`: Get a product by ID.
- `PUT /products/:id`: Update a product by ID.
- `DELETE /products/:id`: Delete a product by ID.

### Cart Endpoints

- `POST /carts`: Create a new cart for a user.
- `GET /carts/:userId`: Get a user's cart by their user ID.
- `PUT /carts/:userId`: Update a user's cart by their user ID.
- `DELETE /carts/:userId`: Delete a user's cart by their user ID.

### Order Endpoints

- `POST /orders`: Create a new order.
- `GET /orders/:userId`: Get all orders for a user by their user ID.
- `GET /orders/:orderId`: Get an order by its ID.
- `PUT /orders/:orderId`: Update an order by its ID.
- `DELETE /orders/:orderId`: Delete an order by its ID.

### Address Endpoints

- `POST /addresses`: Create a new address.
- `GET /addresses/:id`: Get an address by
- `PUT /addresses/:id`: Update an address by ID.
- `DELETE /addresses/:id`: Delete an address by ID.

### Stripe Endpoints

- `POST /stripe/checkout`: Create a new Stripe checkout session.
- `GET /stripe/checkout/:sessionId`: Retrieve a checkout session.

## Testing

To run tests, execute the following command:

```bash
npm run test
```

Please note that you should have a testing environment setup for the database. Ensure the testing database URL is provided in the `.env` file.

## Contributing

For contributing guidelines, please refer to the `CONTRIBUTING.md` file.

## License

For license information, please refer to the `LICENSE` file.

## Contact

For any queries or issues, please raise an issue in the GitHub repository or contact the maintainers.

Happy Coding!
