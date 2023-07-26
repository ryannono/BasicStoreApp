# TasteTrove: An Online Spice Store

Welcome to the GitHub repository for TasteTrove, an elegant eCommerce solution designed to enthrall spice enthusiasts with a seamless online shopping experience.

## Table of Contents

- [Introduction](#introduction)
- [Key Features](#key-features)
- [Feature Implementation](#feature-implementation)
- [Technologies](#technologies)
- [Deployment](#deployment)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

## Introduction

TasteTrove lets users navigate through an array of spices, create personal accounts for a personalized experience, add desired products to a cart, and finally proceed to a secure checkout. Moreover, the application's guest checkout feature enables spontaneous shopping without necessitating account creation.

## Key Features

### Website Essentials

- **User Registration and Login:** Personal account creation made easy.
- **Guest Checkout:** Quick purchases without an account.
- **Mobile-responsive Design:** Optimized for smartphones and tablets for on-the-go access.

### Product Information

- **High-quality Product Images:** Vivid visualization with 4 high-quality images for each product.
- **Comprehensive Product Descriptions:** Know your spice with details including its origin, flavor profile, and usage suggestions.
- **Real-time Stock Status:** Keeps users informed about product availability.

### Shopping Experience

- **Intuitive Search Functionality:** Efficiently search for specific spices or related keywords.
- **Advanced Filter and Sorting:** Refine searches based on price, popularity, and more.
- **User-friendly Shopping Cart:** Review before you buy.

### Pricing and Checkout

- **Multiple Payment Methods:** Versatile payment options including credit/debit cards and PayPal.
- **Secure Checkout:** User information safety ensured throughout the transaction.

## Feature Implementation

Detailed breakdown of how each feature has been implemented.

### Website Essentials

- **User Registration and Login:** Implemented with JWT access token along with a refresh token in cookies, with data stored in a PostgreSQL database.
- **Guest Checkout:** Leverages React Router for the default route.
- **Mobile-responsive Design:** Tailwind CSS utilized for responsive layouts, with potential use of media queries for enhanced optimization.

### Product Information

- **High-quality Product Images:** Royalty-free images procured from Unsplash or Pexels.
- **Comprehensive Product Descriptions:** Manually curated based on references from multiple sites.
- **Real-time Stock Status:** Updates the PostgreSQL database after each order to reflect current stock status.

### Shopping Experience

- **Intuitive Search Functionality:** JS ES6 methods to filter arrays on user input swiftly.
- **Advanced Filter and Sorting:** JS ES6 methods to filter and sort product arrays based on selected properties.
- **User-friendly Shopping Cart:** Cart state propagated through the app using React's State API and Context API.

### Pricing and Checkout

- **Multiple Payment Methods:** Stripe, an industry-standard payment processing tool, has been integrated for diversified payment options.
- **Secure Checkout:** Stripe ensures secure transactions.

## Technologies

TasteTrove has been built using a diverse array of modern technologies:

- **Frontend:** TypeScript, React, Tailwind CSS, Preline Component Library, and React Router
- **Payment Processing:** Stripe
- **Backend:** Express, Node.js
- **Database:** PostgreSQL

## Deployment

The application is deployed using Railway, a modern platform for deploying applications quickly and efficiently.

## Getting Started

To set up a local copy of the project, clone the repo and navigate into the project directory:

```sh
git clone https://github.com/username/tastetrove.git
cd tastetrove
```

## License

This project is licensed under the MIT License. More details can be found in the [LICENSE.md](LICENSE.md) file.
