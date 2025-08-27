import { Controller, Get } from '@nestjs/common';

// Health check controller for the contacts service
@Controller('health')
export class HealthController {
  // Endpoint to check the health of the service
  @Get()
  checkHealth(): { status: string } {
    return { status: 'healthy' }; // Returns a simple health status
  }
}