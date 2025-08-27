export interface Subscription {
    id: string; // Unique identifier for the subscription
    tenantId: string; // Identifier for the tenant associated with the subscription
    planId: string; // Identifier for the subscription plan
    startDate: Date; // Date when the subscription starts
    endDate: Date; // Date when the subscription ends
    status: 'active' | 'inactive' | 'cancelled'; // Current status of the subscription
    createdAt: Date; // Timestamp when the subscription was created
    updatedAt: Date; // Timestamp when the subscription was last updated
}