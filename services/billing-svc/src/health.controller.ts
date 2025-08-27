import { Controller, Get } from '@nestjs/common';

// HealthController provides a health check endpoint for the billing service.
@Controller('health')
export class HealthController {
  @Get()
  // healthCheck returns a simple message indicating the service is up.
  healthCheck() {
    return { status: 'Billing service is up and running' };
  }
}