# SRC Directory README

Welcome to the `src` directory! This directory is the heart of the application and contains all the source code that makes up our application. Let's take a look at what each subdirectory is responsible for:

## Controllers

This directory holds the logic responsible for handling HTTP requests and responses. Each controller corresponds to a particular entity of the application (e.g., user, product, order), and implements the logic for CRUD operations. For more information, refer to the `Controllers` directory README.

## Routes

This directory defines the API endpoints for the application. Each route file corresponds to a specific controller and maps HTTP methods and paths to their respective controller functions. For more information, refer to the `Routes` directory README.

## Middlewares

The middlewares directory contains the middleware functions that are used across the application. These functions have access to the request and response objects, and the next function in the request-response cycle. These functions are used for things like error handling, validating request bodies, and verifying authentication tokens. For more information, refer to the `Middlewares` directory README.

## Services

In this directory, you'll find all the `stripeService.ts` file it hold the functions that interact to the Stripe API 

This directory contains any third-party services your application might need to interact with.

`stripeService.ts` contains functions and methods related to Stripe integration and operation

## Types

The Types directory holds all the TypeScript type definitions used throughout the application. These definitions ensure that the objects and variables within our codebase conform to specific shapes and data structures. For more information, refer to the `Types` directory README.

## Utils

This directory contains various utility functions and files used across the application. These utilities can be anything from token generation, password hashing, to helper functions that format data or handle common operations. For more information, refer to the `Utils` directory README.

In addition to these subdirectories, `src` also contains the `index.ts` file which is the entry point of the application. It sets up the express application, middleware, routes, and starts the server.

We hope this overview helps you navigate the `src` directory effectively. Happy coding!
