import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { RegisterDto } from '../auth/dto/register.dto';
import * as bcrypt from 'bcrypt';
import { UserRegisteredEvent } from '../rabbitmq/publisher'; // Import the event for publishing

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private userRegisteredEvent: UserRegisteredEvent, // Inject the event publisher
  ) {}

  // Registers a new user and publishes an event
  async register(registerDto: RegisterDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const createdUser = new this.userModel({
      ...registerDto,
      password: hashedPassword,
    });
    await createdUser.save();

    // Publish UserRegistered event to RabbitMQ
    this.userRegisteredEvent.publish({ userId: createdUser._id, tenantId: createdUser.tenantId });

    return createdUser;
  }

  // Finds a user by email
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  // Additional user-related methods can be added here
}