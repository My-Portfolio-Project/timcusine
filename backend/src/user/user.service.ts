import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';

import { DatabaseService } from 'src/database/database.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { OtpService } from 'src/otp/otp.service';
import { OtpType, UserRole } from '@prisma/client';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly otpService: OtpService,
    private readonly emailService: EmailService
  ) {}

  async createUser(userDto: UserDto) {
    try {
      const { fullName, email, password, role } = userDto;
      if (!fullName || !email || !password || !role) {
        return new BadRequestException('Please fill in all fields');
      }

      const exisitingUser = await this.prisma.user.findUnique({
        where: { email }
      });

      if (exisitingUser) {
        return new ConflictException('User exists already');
      }

      const user = await this.prisma.user.create({
        data: {
          fullName,
          email,
          password,
          role: UserRole.USER,
          isVerified: false
        }
      });

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
        message:
          'User created successful and OTP code has been sent for verification',
        user
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
      throw new InternalServerErrorException();
    }
  }

  async fetchProfile(userId: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          fullName: true,
          email: true,
          role: true,
          isVerified: true
        }
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
      throw new InternalServerErrorException();
    }
  }

  async fetchAll(userId: string, page = 1, limit = 5) {
    try {
      const skip = (page - 1) * limit;

      const users = await this.prisma.user.findMany({
        where: {
          NOT: { id: userId }
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          orders: true
        }
      });

      const totalCount = await this.prisma.user.count();
      const totalPage = Math.ceil(totalCount / limit);

      // ✅ Return even if empty
      return { totalPage, page, skip, users };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
      throw new InternalServerErrorException();
    }
  }

  async fetchSingle(id: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
      throw new InternalServerErrorException();
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (user.role !== 'ADMIN') {
        throw new UnauthorizedException('Unauthorized');
      }

      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: updateUserDto
      });

      return { message: 'User updated successfully', user: updatedUser };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
      throw new InternalServerErrorException();
    }
  }

  async deleteUser(id: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (user.role !== 'ADMIN') {
        throw new UnauthorizedException('Unauthorized');
      }

      await this.prisma.user.delete({ where: { id } });

      return { message: 'User deleted successfully' };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
      throw new InternalServerErrorException();
    }
  }
}
