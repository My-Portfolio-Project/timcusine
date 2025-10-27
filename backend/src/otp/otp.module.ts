import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true
    }),
    DatabaseModule
  ],
  providers: [OtpService],
  exports: [OtpService]
})
export class OtpModule {}
