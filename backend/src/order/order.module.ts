import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DatabaseModule, ConfigModule],
  providers: [OrderService],
  exports: [OrderService]
})
export class OrderModule {}
