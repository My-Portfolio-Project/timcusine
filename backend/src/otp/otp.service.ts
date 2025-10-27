/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BadRequestException,
  ConflictException,
  //   ConflictException,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { OtpType, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class OtpService {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly jwt: JwtService,
    private readonly configService: ConfigService
  ) {}

  async generateOtp(user: User, type: OtpType): Promise<any> {
    try {
      if (type === OtpType.OTP) {
        if (user.isVerified === true) {
          return new BadRequestException('User is already verified');
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
        const token = await bcrypt.hash(otp, 10);
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

        await this.prisma.otp.deleteMany({
          where: {
            userId: user.id,
            type: OtpType.OTP
          }
        });

        await this.prisma.otp.create({
          data: {
            userId: user.id,
            type: OtpType.OTP,
            token,
            expiresAt
          }
        });

        return otp;
      }

      if (type === OtpType.RESET_LINK) {
        const token = this.jwt.sign(
          {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            role: user.role
          },
          {
            secret: this.configService.get<string>('JWT_SECRET'),
            expiresIn: '5m'
          }
        );

        return token;
      }

      throw new BadRequestException('Invalid Otp type');
    } catch (error) {
      // ...existing code...
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
    // ...existing code...
  }

  async validateOtp(
    userId: string,
    otpCode: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      const now = new Date();

      const otpRecord = await this.prisma.otp.findFirst({
        where: {
          userId,
          type: OtpType.OTP,
          expiresAt: { gt: now }
        }
      });

      if (!otpRecord) {
        return {
          success: false,
          message: 'OTP expired or not found. Please request a new one.'
        };
      }

      const isMatch = await bcrypt.compare(otpCode, otpRecord.token);
      if (!isMatch) {
        return {
          success: false,
          message: 'Invalid OTP code'
        };
      }

      // OTP valid → delete after use
      await this.prisma.otp.delete({ where: { id: otpRecord.id } });

      return {
        success: true,
        message: 'OTP validated successfully'
      };
    } catch (error: unknown) {
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'Something went wrong while validating OTP'
      };
    }
  }
}
