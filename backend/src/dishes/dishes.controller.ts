import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { DishesService } from './dishes.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishtDto } from './dto/update-dish.dto';

@Controller('dishes')
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  @Post('')
  createDishes(@Body() createDishesDto: CreateDishDto) {
    return this.dishesService.createDishes(createDishesDto);
  }

  @Get()
  fetchAll(@Query('page') page = '1', @Query('limit') limit = '5') {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    return this.dishesService.fetchAll(pageNumber, limitNumber);
  }
  @Get('search')
  async search(@Query('searchTerm') searchTerm: string) {
    return await this.dishesService.searchDish(searchTerm);
  }

  @Get(':id')
  fetchSingle(@Param('id') id: string) {
    return this.dishesService.fetchSingle(id);
  }
  @Patch(':id')
  updateDish(@Param('id') id: string, @Body() updateDishDto: UpdateDishtDto) {
    return this.dishesService.updateDish(id, updateDishDto);
  }
  @Delete(':id')
  deleteDish(@Param('id') id: string) {
    return this.dishesService.deleteDish(id);
  }
}
