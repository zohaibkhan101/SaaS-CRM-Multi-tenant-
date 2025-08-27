import { NestFactory } from '@nestjs/core'; // Import NestFactory to create the application
import { AppModule } from './app.module'; // Import the main application module
import { ValidationPipe } from '@nestjs/common'; // Import ValidationPipe for request validation

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Create the NestJS application
  app.useGlobalPipes(new ValidationPipe()); // Use global validation pipes for DTO validation
  await app.listen(process.env.PORT || 3000); // Start the application on the specified port
}

bootstrap(); // Call the bootstrap function to start the application