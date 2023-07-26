# TasteTrove Database Schema

This schema is designed to support the backend for the TasteTrove e-commerce application. It comprises several models that represent the key entities in the system: users, carts, products, orders, and addresses.

## User

Represents a registered user of the e-commerce application.

* `id`: Unique identifier for the user.
* `username`: Unique username for the user.
* `firstName`: User's first name.
* `lastName`: User's last name.
* `email`: User's email address. Must be unique across all users.
* `password`: Hashed password for the user.
* `phoneNumber`: User's phone number.
* `cart`: Link to the user's cart.
* `stripeCustomerId`: Unique ID from Stripe for handling payments.
* `orders`: List of all orders placed by the user.
* `createdAt`: Timestamp of when the user was created.
* `updatedAt`: Timestamp of the last update to the user record.
* `refreshTokens`: List of all refresh tokens issued to the user.

## Cart

Represents a user's shopping cart.

* `id`: Unique identifier for the cart.
* `items`: List of items (products) currently in the cart.
* `user`: Link to the user who owns the cart.
* `userId`: ID of the user who owns the cart.

## CartItem

Represents an item (product) in a cart.

* `id`: Unique identifier for the cart item.
* `cart`: Link to the cart containing this item.
* `cartId`: ID of the cart containing this item.
* `product`: Link to the product details for this item.
* `productId`: ID of the product this item refers to.
* `productQuantity`: The quantity of the product in the cart.

## RefreshToken

Represents a refresh token for a user session.

* `id`: Unique identifier for the refresh token.
* `tokenUser`: Link to the user to whom this token was issued.
* `tokenUserId`: ID of the user to whom this token was issued.
* `token`: The token string.
* `createdAt`: Timestamp of when the token was created.
* `expiresAt`: Timestamp of when the token expires.

## Product

Represents a product available for purchase.

* `id`: Unique identifier for the product.
* `name`: Name of the product. Must be unique across all products.
* `images`: List of all images associated with the product.
* `description`: Description of the product.
* `price`: Price of the product.
* `stock`: Quantity of the product in stock.
* `category`: Link to the category of the product.
* `categoryId`: ID of the category of the product.
* `cartItems`: List of all cart items that refer to this product.
* `orderItems`: List of all order items that refer to this product.

## ProductImage

Represents an image of a product.

* `id`: Unique identifier for the image.
* `url`: URL where the image is stored.
* `isPrimary`: Boolean indicating if this is the primary image for the product.
* `product`: Link to the product this image is associated with.
* `productId`: ID of the product this image is associated with.

## ProductCategory

Represents a category of products.

* `id`: Unique identifier for the category.
* `name`: Name of the category. Must be unique across all categories.
* `Products`: List of all products in this category.

## Order

Represents a user's order.

* `id`: Unique identifier for the order.
* `user`: Link to the user who placed the order.
* `userId`: ID of the user who placed the order.
* `items`: List of items (products) in the order.
* `totalPrice`: Total price of the order.
* `shippingAddress`: Link to the shipping address for the order.
* `shippingAddressId`: ID of the shipping address for the order.
* `stripePaymentIntentId`: Unique ID from Stripe for handling payment of the order.
* `OrderStatus`: Status of the order.
* `createdAt`: Timestamp of when the order was placed.
* `updatedAt`: Timestamp of the last update to the order.

## OrderItem

Represents an item (product) in an order.

* `id`: Unique identifier for the order item.
* `order`: Link to the order containing this item.
* `orderId`: ID of the order containing this item.
* `product`: Link to the product details for this item.
* `productId`: ID of the product this item refers to.
* `productQuantity`: The quantity of the product ordered.

## Address

Represents a shipping address.

* `id`: Unique identifier for the address.
* `addressLine1`: First line of the address.
* `addressLine2`: Second line of the address (optional).
* `city`: City of the address.
* `province`: Province or state of the address.
* `postalCode`: Postal or ZIP code of the address.
* `country`: Country of the address.
* `Order`: Link to the order that is to be shipped to this address.
