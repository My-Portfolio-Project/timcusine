import {
  Body,
  Controller,
  Post,
  UseGuards,
  Query,
  Get,
  Param
} from '@nestjs/common';
import { OrderService } from './order.service';
import { UserDecorator } from 'src/decorators/user.decorator';
import type { AuthUser } from 'src/decorators/user.decorator';
import { CheckoutDto } from './dto/checkout.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('checkout')
  @UseGuards(AuthGuard)
  async createCheckout(
    @UserDecorator() user: AuthUser,
    @Body() checkoutDto: CheckoutDto
  ) {
    return this.orderService.createCheckout(user.id, checkoutDto);
  }

  @Get('checkout/success')
  async checkoutSuccess(
    @Query('payment') payment: 'STRIPE' | 'PAYSTACK',
    @Query('session_id') session_id?: string,
    @Query('reference') reference?: string
  ) {
    return this.orderService.checkoutSuccess({
      payment,
      session_id,
      reference
    });
  }
  @Get()
  fetchAll(@Query('page') page = '1', @Query('limit') limit = '5') {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    return this.orderService.fetchAll(pageNumber, limitNumber);
  }
  @Get('search')
  async search(@Query('searchTerm') searchTerm: string) {
    return await this.orderService.searchOrder(searchTerm);
  }

  @Get(':id')
  fetchSingle(@Param('id') id: string) {
    return this.orderService.fetchSingle(id);
  }
}
