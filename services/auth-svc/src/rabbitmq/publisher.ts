import { Injectable } from '@nestjs/common';
import { RabbitMQService } from 'some-rabbitmq-library'; // Replace with actual RabbitMQ library
import { UserRegisteredEvent } from '../events/user-registered.event'; // Import the event class

@Injectable()
export class RabbitMQPublisher {
  private readonly rabbitMQService: RabbitMQService;

  constructor() {
    this.rabbitMQService = new RabbitMQService(); // Initialize RabbitMQ service
  }

  // Publish a UserRegistered event to RabbitMQ
  async publishUserRegisteredEvent(tenantId: string, userId: string): Promise<void> {
    const event: UserRegisteredEvent = {
      tenantId,
      userId,
      timestamp: new Date().toISOString(),
    };

    await this.rabbitMQService.publish('user.registered', event); // Publish the event to the exchange
  }
}