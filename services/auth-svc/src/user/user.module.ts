import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserSchema } from './user.schema';

// UserModule is responsible for managing user-related functionalities
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), // Register User schema with Mongoose
  ],
  providers: [UserService], // Provide UserService for dependency injection
  exports: [UserService], // Export UserService for use in other modules
})
export class UserModule {}