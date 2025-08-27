import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtUser } from '@shared/types/JwtUser'; // Importing shared type for JWT user

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  // This method checks if the request is authorized
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const user = this.jwtService.verify<JwtUser>(token); // Verifying the token
      request.user = user; // Attaching user info to the request
      return true; // Allow access
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  // This method extracts the token from the request header
  private extractTokenFromHeader(request: Request): string | null {
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.split(' ')[1]; // Return the token part
    }
    return null; // No token found
  }
}