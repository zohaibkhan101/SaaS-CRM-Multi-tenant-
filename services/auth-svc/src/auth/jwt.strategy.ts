import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtUser } from '@shared/types/JwtUser'; // Importing shared type for JWT user
import { UserService } from '../user/user.service'; // Importing user service to validate user
import { ConfigService } from '@nestjs/config'; // Importing config service for environment variables
import { JwtPayload } from './jwt.payload'; // Importing JWT payload interface

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService, private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extracting JWT from Authorization header
      secretOrKey: configService.get<string>('JWT_SECRET'), // Using secret from environment variables
    });
  }

  async validate(payload: JwtPayload): Promise<JwtUser> {
    const user = await this.userService.findById(payload.sub); // Finding user by ID from payload
    if (!user) {
      throw new UnauthorizedException(); // Throwing exception if user not found
    }
    return { userId: user._id, tenantId: user.tenantId, roles: user.roles }; // Returning user data
  }
}