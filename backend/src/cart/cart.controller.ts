import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CartDto } from './dto/cart.dto';
import { UserDecorator } from 'src/decorators/user.decorator';
import type { AuthUser } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // 🛒 Add item to cart
  @Post()
  @UseGuards(AuthGuard)
  addCart(@UserDecorator() user: AuthUser, @Body() createCartDto: CartDto) {
    return this.cartService.addCart(user.id, createCartDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  fetchCart(@UserDecorator() user: AuthUser) {
    return this.cartService.fetchCart(user.id);
  }

  // 🔄 Update quantity of an item
  @Patch(':id')
  updateCart(
    @UserDecorator() user: AuthUser,
    @Param('id') id: string,
    @Body('quantity') quantity: number
  ) {
    return this.cartService.updateCart(user.id, id, quantity);
  }

  // 🗑️ Remove a single cart item
  @Delete(':id')
  removeCart(@Param('id') id: string) {
    return this.cartService.removeCart(id);
  }
}
