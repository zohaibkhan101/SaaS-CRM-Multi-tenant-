export class UpdateContactDto {
    // The unique identifier for the contact to be updated
    id: string;

    // The name of the contact
    name?: string;

    // The email address of the contact
    email?: string;

    // The phone number of the contact
    phone?: string;

    // The address of the contact
    address?: string;

    // The tenant ID to ensure the contact belongs to the correct tenant
    tenantId: string;
}