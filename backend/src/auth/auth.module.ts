import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';
import { OtpModule } from 'src/otp/otp.module';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [
    JwtModule.register({
      global: true
    }),
    DatabaseModule,
    OtpModule,
    EmailModule
  ],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
