import { Module } from '@nestjs/common';
import { BillingController } from './billing/billing.controller';
import { BillingService } from './billing/billing.service';
import { BillingModule } from './billing/billing.module';
import { RabbitMQModule } from './rabbitmq/subscriber';
import { HealthController } from './health.controller';

@Module({
  imports: [
    BillingModule, // Importing the billing module for subscription management
    RabbitMQModule, // Importing RabbitMQ module for message handling
  ],
  controllers: [BillingController, HealthController], // Controllers for handling requests
  providers: [BillingService], // Service for business logic
})
export class AppModule {} // Main application module for the billing service