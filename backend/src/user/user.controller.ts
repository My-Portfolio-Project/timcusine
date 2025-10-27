import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';

import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserDecorator } from 'src/decorators/user.decorator';
import type { AuthUser } from 'src/decorators/user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() userDto: UserDto) {
    return this.userService.createUser(userDto);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  fetchProfile(@UserDecorator() user: AuthUser) {
    return this.userService.fetchProfile(user.id ?? '');
  }
  @Get('all')
  @UseGuards(AuthGuard, RoleGuard)
  fetchAll(
    @UserDecorator() user: AuthUser,
    @Query('page') page = '1',
    @Query('limit') limit = '1'
  ) {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    return this.userService.fetchAll(user.id, pageNumber, limitNumber);
  }
  @Get(':id')
  @UseGuards(AuthGuard, RoleGuard)
  fetchSingle(@Param('id') id: string) {
    return this.userService.fetchSingle(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RoleGuard)
  updateUser(@Param('id') id: string, updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }
  @Delete(':id')
  @UseGuards(AuthGuard, RoleGuard)
  deletUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
