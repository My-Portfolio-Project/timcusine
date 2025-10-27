import { IsEmail, IsString } from 'class-validator';

export class RequestOtpDto {
  @IsEmail()
  @IsString()
  email: string;
}
