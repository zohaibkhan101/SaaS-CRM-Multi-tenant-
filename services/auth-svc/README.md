# /saas-crm/saas-crm/services/auth-svc/README.md

# Authentication Service (auth-svc)

This service is responsible for user authentication, including registration and login functionalities. It is built using NestJS and utilizes MongoDB for user data storage.

## Features

- User registration with hashed passwords using bcrypt.
- User login with JWT access tokens.
- Role-based access control (owner/admin/member).
- Multi-tenancy support through tenantId.
- Publishes `UserRegistered` events to RabbitMQ upon successful registration.

## Environment Variables

The following environment variables are required for the authentication service. You can find an example in the `.env.example` file.

- `MONGO_URI`: MongoDB connection string.
- `JWT_SECRET`: Secret key for signing JWT tokens.
- `JWT_EXPIRATION`: Expiration time for JWT tokens (e.g., "1d").
- `RABBITMQ_URI`: RabbitMQ connection string.

## API Endpoints

### Register User

- **Endpoint**: `POST /auth/register`
- **Request Body**:
  ```json
  {
    "username": "string",
    "password": "string",
    "tenantId": "string",
    "role": "owner | admin | member"
  }
  ```
- **Response**:
  ```json
  {
    "accessToken": "string"
  }
  ```

### Login User

- **Endpoint**: `POST /auth/login`
- **Request Body**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "accessToken": "string"
  }
  ```

## Health Check

- **Endpoint**: `GET /health`
- **Response**:
  ```json
  {
    "status": "ok"
  }
  ```

## Running the Service

To run the authentication service locally, ensure you have Docker and Docker Compose installed. Then, follow these steps:

1. Build and start the services:
   ```bash
   docker compose up --build
   ```

2. Access the service at `http://localhost:3000`.

## Testing

End-to-end tests are located in the `test` directory. You can run the tests using the following command:

```bash
npm run test:e2e
```

## Additional Notes

- Ensure that RabbitMQ is running and accessible for publishing events.
- The service is designed to be part of a larger multi-tenant SaaS application, so it is essential to handle tenantId correctly in all operations.

For any issues or contributions, please refer to the main repository's README for guidelines.