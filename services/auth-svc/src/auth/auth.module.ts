import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/user.schema';
import { JwtStrategy } from './jwt.strategy';
import { JwtGuard } from './jwt.guard';
import { RabbitMQPublisher } from '../rabbitmq/publisher';

// The AuthModule is responsible for handling authentication-related functionality.
@Module({
  imports: [
    UserModule, // Import the UserModule to access user-related services and schemas.
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), // Register the User schema with Mongoose.
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Use the secret from environment variables for signing JWTs.
      signOptions: { expiresIn: '1d' }, // Set JWT expiration to 1 day.
    }),
  ],
  controllers: [AuthController], // Register the AuthController to handle authentication routes.
  providers: [AuthService, JwtStrategy, JwtGuard, RabbitMQPublisher], // Register services and guards.
  exports: [AuthService], // Export AuthService for use in other modules.
})
export class AuthModule {} // Export the AuthModule for use in the main application module.