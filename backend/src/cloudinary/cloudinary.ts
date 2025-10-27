import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    const CLOUD_NAME = this.configService.get<string>('CLOUDINARY_CLOUD_NAME');
    const CLOUD_KEY = this.configService.get<string>('CLOUDINARY_API_KEY');
    const CLOUD_SECRET = this.configService.get<string>('CLOUDINARY_SECRET');

    if (!CLOUD_NAME || !CLOUD_KEY || !CLOUD_SECRET) {
      throw new Error('Pleas provide the field');
    }

    cloudinary.config({
      cloud_name: CLOUD_NAME,
      api_secret: CLOUD_SECRET,
      api_key: CLOUD_KEY
    });
  }

  getCloudinary() {
    return cloudinary;
  }
}
