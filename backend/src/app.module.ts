import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { DishesService } from './dishes/dishes.service';
import { DishesModule } from './dishes/dishes.module';
import { OtpModule } from './otp/otp.module';
import { EmailModule } from './email/email.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AppCacheModule } from './cache/cache.module';
import { CacheModule } from '@nestjs/cache-manager';
import { CartModule } from './cart/cart.module';
import { OrderController } from './order/order.controller';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    CacheModule.register(),
    AuthModule,
    DishesModule,
    OtpModule,
    EmailModule,
    CloudinaryModule,
    DatabaseModule,
    UserModule,
    AppCacheModule,
    CartModule,
    OrderModule
  ],
  controllers: [AppController, AuthController, OrderController],
  providers: [AppService, UserService, DishesService]
})
export class AppModule {}
