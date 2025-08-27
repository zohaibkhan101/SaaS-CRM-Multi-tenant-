import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// The entry point for the contacts service, bootstrapping the NestJS application.
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS for cross-origin requests
  app.enableCors();
  // Start the application on port 3001
  await app.listen(3001);
}

// Call the bootstrap function to start the service
bootstrap();