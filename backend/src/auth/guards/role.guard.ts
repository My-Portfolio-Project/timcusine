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
export class RoleGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    try {
      const payload = await this.jwt.verifyAsync<JwtRefreshPayload>(token, {
        secret: process.env.JWT_SECRET
      });

      if (payload['role'] !== 'ADMIN') {
        throw new UnauthorizedException('Access denied');
      }

      request['user'] = payload;
      return true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
