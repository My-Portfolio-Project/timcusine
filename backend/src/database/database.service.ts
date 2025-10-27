import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit(): Promise<void> {
    try {
      await (this.$connect as () => Promise<void>)();
      console.log('✅ Database connected');
    } catch (err: unknown) {
      console.error('❌ Database connection failed', err);
    }
  }

  async onModuleDestroy() {
    try {
      await (this.$disconnect as () => Promise<void>)();
      console.log('✅ Database disconnected');
    } catch (err: unknown) {
      console.error('❌ Database disconnection failed', err);
    }
  }
}
