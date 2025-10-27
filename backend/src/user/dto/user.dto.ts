import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsStrongPassword,
  MinLength
} from 'class-validator';
import { UserRole } from '@prisma/client';

export class UserDto {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  @IsStrongPassword()
  password: string;

  @IsBoolean()
  @IsOptional() // let Prisma default handle it
  isVerified?: boolean;

  @IsEnum(UserRole)
  role?: UserRole;
}
