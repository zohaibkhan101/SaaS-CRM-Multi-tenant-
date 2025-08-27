import { Controller, Get } from '@nestjs/common';

// HealthController provides a health check endpoint for the authentication service.
@Controller('health')
export class HealthController {
  @Get()
  healthCheck(): string {
    return 'Auth service is up and running!';
  }
}