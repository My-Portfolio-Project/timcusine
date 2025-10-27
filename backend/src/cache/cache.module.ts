import { Module } from '@nestjs/common';
import { CacheService } from './cache';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register()],
  providers: [CacheService],
  exports: [CacheService]
})
export class AppCacheModule {}
