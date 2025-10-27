import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export interface AuthUser {
  id: string;
  fullName?: string;
  email?: string;
  isVerified?: boolean;
  role?: 'USER' | 'ADMIN';
}

export const UserDecorator = createParamDecorator(
  (data: keyof AuthUser | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();

    const payload = request['user'] as AuthUser;

    const user: AuthUser = {
      id: payload.id ?? '',
      fullName: payload.fullName ?? '',
      email: payload.email ?? '',
      isVerified: payload.isVerified ?? false,
      role: payload.role ?? ('' as 'USER' | 'ADMIN')
    };

    if (data) {
      return user[data];
    }

    return user;
  }
);
