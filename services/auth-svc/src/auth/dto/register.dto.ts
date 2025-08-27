export class RegisterDto {
  // The email of the user, must be unique
  email: string;

  // The password for the user, should be hashed before storage
  password: string;

  // The tenant ID to which the user belongs
  tenantId: string;

  // The role of the user, can be owner, admin, or member
  role: 'owner' | 'admin' | 'member';
}