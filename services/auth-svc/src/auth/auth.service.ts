import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserRegisteredPublisher } from '../rabbitmq/publisher'; // Publisher for RabbitMQ

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private userRegisteredPublisher: UserRegisteredPublisher, // Inject RabbitMQ publisher
  ) {}

  // Register a new user
  async register(registerDto: RegisterDto): Promise<User> {
    const { password, tenantId, roles } = registerDto;
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const user = new this.userModel({ ...registerDto, password: hashedPassword });
    await user.save(); // Save user to MongoDB
    this.userRegisteredPublisher.publish({ userId: user._id, tenantId }); // Publish UserRegistered event
    return user;
  }

  // Login a user
  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email }); // Find user by email
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials'); // Throw error if credentials are invalid
    }
    const payload = { userId: user._id, tenantId: user.tenantId, roles: user.roles }; // Create JWT payload
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1d' }); // Sign JWT token
    return { accessToken }; // Return access token
  }
}