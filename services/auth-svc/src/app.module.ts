import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { HealthController } from './health.controller';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq'; // Import RabbitMQ module

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI), // Connect to MongoDB
    AuthModule, // Import Auth module for authentication
    UserModule, // Import User module for user management
    RabbitMQModule.forRoot(RabbitMQModule, { // Configure RabbitMQ
      exchanges: [
        {
          name: 'user_events',
          type: 'topic',
        },
      ],
      uri: process.env.RABBITMQ_URI,
    }),
  ],
  controllers: [HealthController], // Register health check controller
})
export class AppModule {} // Main application module for the auth service