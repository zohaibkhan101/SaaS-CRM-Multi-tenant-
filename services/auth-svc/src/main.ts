import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Entry point for the authentication service
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS for cross-origin requests
  app.enableCors();
  // Start the application on port 3000
  await app.listen(3000);
}

// Call the bootstrap function to start the service
bootstrap();