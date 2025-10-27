import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from 'src/database/database.module';
import { OtpModule } from 'src/otp/otp.module';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [DatabaseModule, OtpModule, EmailModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
