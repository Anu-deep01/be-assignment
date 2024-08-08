# Account and Payment Manager Services

## Description

This project consists of two backend services:

1. **Account Manager Service**: Manages user accounts and their associated payment accounts.
2. **Payment Manager Service**: Manages transactions, including sending and withdrawing funds.

## Features

- User registration and login
- CRUD operations for user accounts
- Transaction processing with a simulated delay to mimic real-world scenarios
- APIs for sending and withdrawing funds
- Retrieve all accounts and transactions for a user
- Optional recurring payments functionality

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose (ORM)
- bcrypt (for password hashing)
- jsonwebtoken (for authentication)
- Docker & Docker Compose (for containerization)
- node-cron (for scheduling recurring payments)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Anu-deep01/ConcreteAI-task.git
    cd ConcreteAI-task
    ```

2. Create an `.env` file in the root of the project directory with the following contents:

    ```env
    MONGO_URI=mongodb://mongo:27017/your_database_name
    PORT=port
    JWT_SECRET=secret
    ```

    Replace `your_database_name` with the name of your MongoDB database and `your_jwt_secret_key` with a secret key for JWT authentication.

3. Start Docker:
    ```bash
    docker-compose build
    docker-compose up
    ```

## API Endpoints

### Account Manager Service

- **POST** `/auth/register`: Register a new user
    - Request body: `{ "username": "user123", "password": "yourpassword" }`
    - Response: `{ "message": "User registered successfully" }`
- **POST** `/auth/login`: User login
    - Request body: `{ "username": "user123", "password": "yourpassword" }`
    - Response: `{ "token": "jwt_token" }`
- **POST** `/accounts`: Create a new payment account for a user (requires authentication)
    - Request body: `{ "accountType": "credit", "balance": 1000 }`
    - Response: `{ "account": { "userId": "user_id", "accountType": "credit", "balance": 1000 } }`
- **GET** `/accounts`: Get all payment accounts for a user (requires authentication)
    - Response: `[ { "userId": "user_id", "accountType": "credit", "balance": 1000 } ]`
- **GET** `/accounts/:accountId/history`: Get all transactions for a payment account (requires authentication)
    - Response: `[ { "userId": "user_id", "accountId": "account_id", "amount": 100, "timestamp": "timestamp" } ]`

### Payment Manager Service

- **POST** `/transactions/send`: Send funds (requires authentication)
    - Request body: `{ "accountId": "account_id", "amount": 100, "toAddress":to_address, "type": type }`
    - Response: `{ "userId": "user_id", "accountId": "account_id", "amount": 100, "status": "completed" }`
- **POST** `/transactions/withdraw`: Withdraw funds (requires authentication)
    - Request body: `{ "accountId": "account_id", "amount": 100, "toAddress":to_address, "type": type }`
    - Response: `{ "userId": "user_id", "accountId": "account_id", "amount": 100, "status": "completed" }`

## Running the Project

1. **Build and start the services**:
    ```bash
    docker-compose build
    docker-compose up
    ```

2. **Access the services**:
    - Account Manager Service: `http://localhost:3000`
    - Payment Manager Service: `http://localhost:3001`

3. **Testing**:
    - Use Postman or a similar tool to interact with the APIs and test the functionality.

## Optional Features

- **Recurring Payments**: Set up recurring payments using `node-cron` for periodic transactions.

## Documentation

- Swagger documentation is available (if implemented).
- Comprehensive API documentation is provided in the endpoints section above.

## Notes

- Ensure that Docker is running and properly configured on your machine before starting the services.
- Update environment variables in the `.env` file and `docker-compose.yml` file if needed.
