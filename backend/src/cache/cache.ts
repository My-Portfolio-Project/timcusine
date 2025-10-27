import { Inject, Injectable } from '@nestjs/common';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}

  async setCache(key: string, value: string, ttl: number) {
    return await this.cache.set(key, value, ttl);
  }

  async getCache(key: string, value: string) {
    return await this.cache.set(key, value);
  }

  async deleteCache(key: string) {
    return await this.cache.del(key);
  }

  async clearCache() {
    return await this.cache.clear();
  }
}
