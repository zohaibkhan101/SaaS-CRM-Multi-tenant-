export class GetSubscriptionDto {
    // The unique identifier for the subscription
    id: string;

    // The tenant ID associated with the subscription
    tenantId: string;

    // The status of the subscription (e.g., active, canceled)
    status: string;

    // The plan type of the subscription (e.g., basic, premium)
    planType: string;

    // The start date of the subscription
    startDate: Date;

    // The end date of the subscription
    endDate: Date;

    // The amount charged for the subscription
    amount: number;

    // Additional metadata related to the subscription
    metadata?: Record<string, any>;
}