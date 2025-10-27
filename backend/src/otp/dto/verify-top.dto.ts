import { IsEmail, IsString } from 'class-validator';

export class VerifyOtpDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  token: string;
}
