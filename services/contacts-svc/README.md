# /saas-crm/saas-crm/services/contacts-svc/README.md

# Contacts Service

This service is responsible for managing contacts in a multi-tenant SaaS CRM application. It provides CRUD operations for contacts, ensuring that all operations are scoped by tenant ID.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete contacts.
- **Tenant Scoped**: All operations are scoped to the tenant ID to ensure data isolation.
- **JWT Authentication**: Protects endpoints using JWT tokens to ensure that only authorized users can access the service.

## Environment Variables

This service requires the following environment variables to be set:

- `MONGO_URI`: Connection string for the MongoDB database.
- `JWT_SECRET`: Secret key used for signing JWT tokens.
- `JWT_EXPIRATION`: Expiration time for JWT tokens (default is 1 day).
- `RABBITMQ_URL`: Connection string for RabbitMQ.

## API Endpoints

### Create Contact

- **POST** `/contacts`
- **Request Body**: 
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "123-456-7890"
  }
  ```
- **Response**: 
  ```json
  {
    "id": "contact_id",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "123-456-7890",
    "tenantId": "tenant_id"
  }
  ```

### Get Contacts

- **GET** `/contacts`
- **Response**: 
  ```json
  [
    {
      "id": "contact_id",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "123-456-7890",
      "tenantId": "tenant_id"
    }
  ]
  ```

### Update Contact

- **PUT** `/contacts/:id`
- **Request Body**: 
  ```json
  {
    "name": "John Doe Updated",
    "email": "john.doe.updated@example.com",
    "phone": "987-654-3210"
  }
  ```
- **Response**: 
  ```json
  {
    "id": "contact_id",
    "name": "John Doe Updated",
    "email": "john.doe.updated@example.com",
    "phone": "987-654-3210",
    "tenantId": "tenant_id"
  }
  ```

### Delete Contact

- **DELETE** `/contacts/:id`
- **Response**: 
  ```json
  {
    "message": "Contact deleted successfully"
  }
  ```

## Running the Service

To run the contacts service locally, ensure that you have Docker and Docker Compose installed. Then, follow these steps:

1. Build and start the service:
   ```bash
   docker compose up --build
   ```

2. Access the service at `http://localhost:3000`.

## Testing

This service includes end-to-end tests located in the `test` directory. To run the tests, use the following command:

```bash
npm run test:e2e
```

## Conclusion

This service is a crucial part of the SaaS CRM application, allowing users to manage their contacts efficiently while ensuring data security and tenant isolation.