import { Module } from '@nestjs/common'; // Importing Module from NestJS
import { BillingController } from './billing.controller'; // Importing the BillingController
import { BillingService } from './billing.service'; // Importing the BillingService

@Module({
  imports: [], // No imports for this module
  controllers: [BillingController], // Registering the BillingController
  providers: [BillingService], // Registering the BillingService
  exports: [BillingService], // Exporting the BillingService for use in other modules
})
export class BillingModule {} // Exporting the BillingModule for use in the application