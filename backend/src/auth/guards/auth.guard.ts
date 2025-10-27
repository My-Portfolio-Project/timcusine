import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

interface JwtRefreshPayload {
  sub: {
    userId: string;
    firstName?: string;
    lastName?: string;
  };
  fullName?: string;
  email: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException({
        message: 'Login to proceed',
        statusCode: 401
      });
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtRefreshPayload>(
        token,
        {
          secret: process.env.JWT_SECRET
        }
      );

      // Safely assign payload to request.user
      request['user'] = payload;
    } catch (error: unknown) {
      const err = error as Error;
      throw new UnauthorizedException({
        message: err.message || 'Invalid token',
        statusCode: 401
      });
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    if (!authHeader) return undefined;

    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
