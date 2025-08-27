import { Injectable } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service'; // Service to handle RabbitMQ connections
import { SubscriptionService } from '../billing/billing.service'; // Service to manage subscriptions
import { UserRegisteredEvent } from './events/user-registered.event'; // Event type for user registration

@Injectable()
export class RabbitMQSubscriber {
  constructor(
    private readonly rabbitMQService: RabbitMQService,
    private readonly subscriptionService: SubscriptionService,
  ) {
    this.initialize();
  }

  // Initialize the RabbitMQ subscriber
  private async initialize() {
    const channel = await this.rabbitMQService.getChannel();
    
    // Subscribe to the UserRegistered event
    channel.consume('UserRegistered', this.handleUserRegistered.bind(this), {
      noAck: true,
    });
  }

  // Handle the UserRegistered event
  private async handleUserRegistered(msg: any) {
    const event: UserRegisteredEvent = JSON.parse(msg.content.toString());
    
    // Create a default subscription for the new user
    await this.subscriptionService.createDefaultSubscription(event.tenantId, event.userId);
  }
}