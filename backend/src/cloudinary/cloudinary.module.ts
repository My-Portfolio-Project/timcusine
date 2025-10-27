import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [CloudinaryService],
  exports: [CloudinaryService]
})
export class CloudinaryModule {}
