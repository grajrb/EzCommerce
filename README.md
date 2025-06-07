# EZCommerce - MERN Stack E-commerce Platform

A full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React.js, and Node.js).

## Table of Contents

1. [Features](#features)
2. [Technology Stack](#technology-stack)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Running the Application](#running-the-application)
6. [Project Structure](#project-structure)
7. [API Endpoints](#api-endpoints)
8. [Contributing](#contributing)
9. [License](#license)
10. [Repository](#repository)

## Features

- User authentication and authorization (login, register, role-based access)
- Product catalog with search, filter, and sorting functionality
- Shopping cart management
- Order processing and history
- Payment gateway integration
- User profile management
- Admin panel for product, order, and user management

## Technology Stack

### Frontend
- React.js
- Redux for state management
- React Router for navigation
- CSS/SCSS for styling

### Backend
- Node.js
- Express.js
- MongoDB for database
- Mongoose for object modeling
- JWT for authentication

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14.x or later)
- [npm](https://www.npmjs.com/) (v6.x or later)
- [MongoDB](https://www.mongodb.com/) (v4.x or later)

## Installation

### Clone the repository

```bash
git clone <your-repository-url>
cd ecommerce-mern
```

### Install server dependencies

```bash
npm install
```

### Install client dependencies

```bash
cd client
npm install
cd ..
```

### Environment Variables

Create a `.env` file in the root directory and add the following:

```
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret_key
PAYPAL_CLIENT_ID=your_paypal_client_id_if_using_paypal
```

## Running the Application

### Development mode

To run both the frontend and backend in development mode:

```bash
npm run dev
```

This will run the server on port 5000 and the client on port 3000.

To run only the server:

```bash
npm run server
```

To run only the client:

```bash
npm run client
```

### Production mode

To build the client for production:

```bash
cd client
npm run build
cd ..
```

To start the application in production mode:

```bash
npm start
```

## Project Structure

```
ecommerce-mern/
  ├── package.json
  ├── client/                 # Frontend React application
  │   ├── package.json
  │   ├── public/
  │   └── src/
  │       ├── App.js
  │       ├── app/            # Redux store
  │       ├── components/     # UI components
  │       ├── features/       # Redux slices for features
  │       └── services/       # API services
  └── server/                 # Backend Node.js application
      ├── config/             # Configuration files
      ├── controllers/        # Route controllers
      ├── middleware/         # Custom middleware
      ├── models/             # MongoDB models
      ├── routes/             # API routes
      ├── utils/              # Utility functions
      └── server.js           # Server entry point
```

## API Endpoints

### Auth
- POST /api/users/register - Register a new user
- POST /api/users/login - Login user

### Products
- GET /api/products - Get all products
- GET /api/products/:id - Get single product by ID
- POST /api/products - Create a new product (admin only)
- PUT /api/products/:id - Update a product (admin only)
- DELETE /api/products/:id - Delete a product (admin only)

### Cart
- GET /api/cart - Get user cart
- POST /api/cart - Add item to cart
- PUT /api/cart/:itemId - Update cart item
- DELETE /api/cart/:itemId - Remove item from cart

### Orders
- GET /api/orders - Get user orders
- GET /api/orders/:id - Get single order
- POST /api/orders - Create a new order
- PUT /api/orders/:id/pay - Update order to paid
- PUT /api/orders/:id/deliver - Update order to delivered (admin only)

### Users (Admin only)
- GET /api/users - Get all users
- GET /api/users/:id - Get user by ID
- PUT /api/users/:id - Update user
- DELETE /api/users/:id - Delete user

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Repository

The source code for this project is available on GitHub: [EZCommerce Repository](https://github.com/grajrb/EzCommerce)