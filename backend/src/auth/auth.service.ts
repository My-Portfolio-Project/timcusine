import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { OtpService } from 'src/otp/otp.service';
import { OtpType, User } from '@prisma/client';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly jwt: JwtService,
    private readonly configService: ConfigService,
    private readonly otpService: OtpService,
    private readonly emailService: EmailService
  ) {}
  async register(registerDto: RegisterDto) {
    try {
      const { fullName, email, password } = registerDto;
      if (!fullName || !email || !password) {
        throw new BadRequestException('Please fill in all fields');
      }

      const existingUser = await this.prisma.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        throw new ConflictException('user exists already');
      }

      // hash passworrd
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await this.prisma.user.create({
        data: {
          fullName,
          password: hashedPassword,
          email,
          isVerified: false
        }
      });

      // token
      const token = this.jwt.sign(
        {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          isVerified: user.isVerified ?? false
        },
        {
          secret: this.configService.get<string>('JWT_SECRET'),
          expiresIn: '15m'
        }
      );

      const otp = (await this.otpService.generateOtp(
        user,

        OtpType.OTP
      )) as string;

      const emailOption = {
        to: user.email,
        subject: 'Email Verfication',
        html: `<p>Use this code to verify your email ${otp} expiring in five mintues</p>`
      };

      await this.emailService.sendEmail(emailOption);

      return {
        message: 'An Otp has been sent to your mail for verification',
        user,
        token,
        OTP: otp
      };
    } catch (error: unknown) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException ||
        error instanceof ConflictException
      ) {
        throw error;
      }

      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }

      throw new InternalServerErrorException();
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const { email, password } = loginDto;
      if (!email || !password) {
        throw new BadRequestException('Please fill in all fields');
      }

      const user = await this.prisma.user.findUnique({
        where: { email }
      });

      if (!user) {
        throw new NotFoundException('User doesnt exists');
      }
      // token
      const token = this.jwt.sign(
        {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          isVerified: user.isVerified ?? false
        },
        {
          secret: this.configService.get<string>('JWT_SECRET'),
          expiresIn: '15m'
        }
      );

      if (user.isVerified === false) {
        const otp = (await this.otpService.generateOtp(
          user,

          OtpType.OTP
        )) as string;

        const emailOption = {
          to: user.email,
          subject: 'Email Verfication',
          html: `<p>Use this code to verify your email ${otp} expiring in five mintues</p>`
        };

        await this.emailService.sendEmail(emailOption);
        return {
          message: 'An Otp has been sent to your mail for verification',
          OTP: otp
        };
      }

      return {
        message: 'Login successful',
        user,
        token
      };
    } catch (error: unknown) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }

      throw new InternalServerErrorException();
    }
  }

  async requestOtp(user: User, type: OtpType) {
    try {
      const token = (await this.otpService.generateOtp(user, type)) as string;

      if (type === 'OTP') {
        const emailOption = {
          to: user.email ?? '',
          subject: 'OTP Verification',
          html: `<p>use this code to verify youtr account expires
        <b>${token}</b> 
        in 3mintues</p>`
        };

        await this.emailService.sendEmail(emailOption);

        return {
          message: 'OTP code has been sent to your mail  for verification',
          OTP: token
        };
      }

      if (type === 'RESET_LINK') {
        const resetLink = `${this.configService.get<string>('CLIENT_URL')}`;

        const emailOption = {
          to: user.email ?? '',
          subject: 'OTP Verification',
          html: `<p>Reset your password here
        <b>${resetLink}?token=${token}</b></p>`
        };

        await this.emailService.sendEmail(emailOption);

        return { message: 'Email reset-password link has been sent' };
      }

      throw new BadRequestException('Invalid Otp');
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof ConflictException
      ) {
        // If error has an OTP property, you can log or use it safely
        if (typeof error === 'object' && error !== null && 'OTP' in error) {
          const otpValue = (error as { OTP: string }).OTP;
          // Use otpValue as needed, e.g., logging
          console.error('OTP value in error:', otpValue);
        }
        throw error;
      }
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
      throw new InternalServerErrorException();
    }
  }

  async verification(userId: string, token: string) {
    try {
      const isValid = await this.otpService.validateOtp(userId, token);

      if (!isValid) {
        throw new BadRequestException('Invalid or expired OTP');
      }

      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (user.isVerified === true) {
        return { message: 'User is already verified' };
      }

      await this.prisma.user.update({
        where: { id: userId },
        data: {
          isVerified: true
        }
      });

      return { message: 'Email Veirified successfully' };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }

      throw new ConflictException();
    }
  }

  async findEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email }
    });
  }
}
