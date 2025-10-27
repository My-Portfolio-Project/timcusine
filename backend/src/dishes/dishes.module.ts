import { Module } from '@nestjs/common';
import { DishesController } from './dishes.controller';
import { DishesService } from './dishes.service';
import { DatabaseService } from 'src/database/database.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module'; // ✅ add this

@Module({
  imports: [CloudinaryModule], // ✅ import the module providing CloudinaryService
  controllers: [DishesController],
  providers: [DishesService, DatabaseService],
  exports: [DishesService]
})
export class DishesModule {}
