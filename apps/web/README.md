# /saas-crm/saas-crm/apps/web/README.md

# SaaS CRM Web Application

This is the web application for the SaaS CRM project, built using Next.js. It serves as the frontend interface for users to interact with the CRM services.

## Architecture Overview

```
+-------------------+
|      Web App      |
|   (Next.js)       |
+-------------------+
          |
          | API Calls
          |
+-------------------+
|   Auth Service    |
|   (NestJS)        |
+-------------------+
          |
          | RabbitMQ
          |
+-------------------+
|  Contacts Service  |
|   (NestJS)        |
+-------------------+
          |
          | Database
          |
+-------------------+
|   Billing Service  |
|   (NestJS + Prisma)|
+-------------------+
```

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd saas-crm
   ```

2. **Install Dependencies**
   Navigate to the `apps/web` directory and install the dependencies:
   ```bash
   cd apps/web
   npm install
   ```

3. **Environment Variables**
   Copy the `.env.example` to `.env` and fill in the required values:
   ```bash
   cp .env.example .env
   ```

4. **Run the Application**
   Start the development server:
   ```bash
   npm run dev
   ```

5. **Access the Application**
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## Example API Calls

### Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
-H "Content-Type: application/json" \
-d '{"username": "testuser", "password": "password123", "tenantId": "tenant1"}'
```
**Expected Response:**
```json
{
  "message": "User registered successfully."
}
```

### Login User
```bash
curl -X POST http://localhost:3000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"username": "testuser", "password": "password123"}'
```
**Expected Response:**
```json
{
  "accessToken": "your_jwt_token"
}
```

### Create Contact
```bash
curl -X POST http://localhost:3000/api/contacts \
-H "Authorization: Bearer your_jwt_token" \
-H "Content-Type: application/json" \
-d '{"name": "John Doe", "email": "john@example.com"}'
```
**Expected Response:**
```json
{
  "message": "Contact created successfully."
}
```

## Verification Steps

1. Register a new user via the registration page.
2. Log in with the registered user credentials.
3. Navigate to the contacts page and create a new contact.
4. Verify that the contact appears in the contacts list.

## What to Look At

For a recruiter, focus on the following aspects:
- Code structure and organization.
- Implementation of authentication and authorization.
- API integration and data handling.
- Use of TypeScript and adherence to best practices.

This README provides a comprehensive guide to setting up and using the web application. For further details, refer to the documentation of each service and the overall architecture.