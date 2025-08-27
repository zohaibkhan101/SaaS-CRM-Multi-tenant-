export interface Contact {
    id: string; // Unique identifier for the contact
    tenantId: string; // Identifier for the tenant to which the contact belongs
    firstName: string; // First name of the contact
    lastName: string; // Last name of the contact
    email: string; // Email address of the contact
    phone?: string; // Optional phone number of the contact
    createdAt: Date; // Timestamp when the contact was created
    updatedAt: Date; // Timestamp when the contact was last updated
}