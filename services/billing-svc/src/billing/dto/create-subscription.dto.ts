export class CreateSubscriptionDto {
    // The unique identifier for the tenant
    tenantId: string;

    // The ID of the user who is subscribing
    userId: string;

    // The subscription plan ID
    planId: string;

    // The start date of the subscription
    startDate: Date;

    // The end date of the subscription
    endDate: Date;

    // The status of the subscription (active, inactive, etc.)
    status: string;
}