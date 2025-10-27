import {
  Body,
  Controller,
  NotFoundException,
  Post
  // UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RequestOtpDto } from 'src/otp/dto/request-otp.dto';
import { DatabaseService } from 'src/database/database.service';
import { OtpType } from '@prisma/client';
import { VerifyOtpDto } from 'src/otp/dto/verify-top.dto';
// import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: DatabaseService
  ) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  @Post('verify-otp')
  // @UseGuards(AuthGuard)
  async verification(@Body() verifyOtpDto: VerifyOtpDto) {
    const { email, token } = verifyOtpDto;

    if (!email) {
      throw new NotFoundException('Email not provided');
    }

    const user = await this.authService.findEmail(email);

    if (!user) {
      throw new NotFoundException('Email not provided');
    }
    return this.authService.verification(user.id, token);
  }

  @Post('request-otp')
  // @UseGuards(AuthGuard)
  async requestOtp(@Body() requestOtpDto: RequestOtpDto) {
    const { email } = requestOtpDto;

    if (!email) {
      throw new NotFoundException('Email not provided');
    }

    const user = await this.authService.findEmail(email);

    if (!user) {
      throw new NotFoundException('Email not provided');
    }

    return this.authService.requestOtp(user, OtpType.OTP);
  }
}
