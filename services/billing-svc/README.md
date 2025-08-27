# /saas-crm/saas-crm/services/billing-svc/README.md

# Billing Service

This service is responsible for managing subscription plans for tenants in the multi-tenant SaaS CRM application. It uses MySQL as the database and Prisma as the ORM for database interactions.

## Features

- Create and retrieve subscription plans.
- Automatically create a default subscription for new users upon registration.
- Health check endpoint to verify service status.

## Environment Variables

The following environment variables are required for the billing service to function correctly. You can find an example in the `.env.example` file.

- `DATABASE_URL`: Connection string for the MySQL database.
- `RABBITMQ_URL`: Connection string for RabbitMQ.
- `JWT_SECRET`: Secret key for signing JWT tokens.
- `JWT_EXPIRATION`: Expiration time for JWT tokens (default is 1 day).

## API Endpoints

### Create Subscription

- **POST** `/subscriptions`
- **Request Body**: 
  - `tenantId`: string
  - `planId`: string
- **Response**: 
  - `id`: string
  - `tenantId`: string
  - `planId`: string
  - `createdAt`: string
  - `updatedAt`: string

### Get Subscription

- **GET** `/subscriptions/:tenantId`
- **Response**: 
  - `id`: string
  - `tenantId`: string
  - `planId`: string
  - `createdAt`: string
  - `updatedAt`: string

## Running the Service

To run the billing service locally, ensure you have Docker and Docker Compose installed. Then, follow these steps:

1. Build and start the service using Docker Compose:
   ```bash
   docker compose up --build
   ```

2. Access the service at `http://localhost:3000`.

## Testing

To run the tests for this service, use the following command:

```bash
npm run test
```

This will execute the unit and end-to-end tests defined in the `test` directory.

## Health Check

You can verify the health of the billing service by accessing the health check endpoint:

- **GET** `/health`

This will return a simple JSON response indicating the service is up and running.

## Additional Notes

- Ensure that the RabbitMQ service is running to handle subscription events.
- The service is designed to be stateless and can be scaled horizontally as needed.

For any issues or contributions, please refer to the main repository's guidelines.