# saas-crm/packages/shared/README.md

# Shared Package

This package contains TypeScript types and interfaces that are shared across different services in the SaaS CRM application. It helps maintain consistency and reduces code duplication by providing a centralized location for common data structures.

## Types and Interfaces

### JwtUser
- Represents the structure of the JWT user payload, which includes user information and roles.

### Contact
- Defines the structure of a contact object, including fields such as name, email, phone number, and tenantId.

### Subscription
- Represents the structure of a subscription object, including details like plan type, start date, and tenantId.

## Usage

To use the shared types in your services, you can import them as follows:

```typescript
import { JwtUser, Contact, Subscription } from '@saas-crm/shared';
```

Ensure that the shared package is included in your workspace and properly linked to the services that require these types.

## Contribution

If you need to add new types or modify existing ones, please follow the guidelines for maintaining type consistency and clarity. Ensure that all changes are well-documented and tested.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.