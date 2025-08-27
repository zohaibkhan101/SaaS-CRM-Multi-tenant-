export interface JwtUser {
  id: string; // Unique identifier for the user
  tenantId: string; // Identifier for the tenant the user belongs to
  roles: string[]; // Array of roles assigned to the user (e.g., owner, admin, member)
  email: string; // Email address of the user
  exp: number; // Expiration time of the JWT token
}