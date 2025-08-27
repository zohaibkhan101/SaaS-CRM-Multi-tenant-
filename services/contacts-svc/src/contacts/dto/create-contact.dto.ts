export class CreateContactDto {
    // The name of the contact
    name: string;

    // The email address of the contact
    email: string;

    // The phone number of the contact
    phone: string;

    // The tenant ID to scope the contact
    tenantId: string;

    // Additional notes about the contact
    notes?: string;
}