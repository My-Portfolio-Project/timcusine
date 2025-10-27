import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CartDto } from './dto/cart.dto';

@Injectable()
export class CartService {
  constructor(private readonly prisma: DatabaseService) {}

  async addCart(userId: string, createCartDto: CartDto) {
    try {
      const { dishId } = createCartDto;

      const existingItem = await this.prisma.cart.findFirst({
        where: {
          userId,
          dishId
        }
      });

      if (existingItem) {
        await this.prisma.cart.update({
          where: { id: existingItem.id },
          data: { quantity: { increment: 1 } }
        });
      } else {
        await this.prisma.cart.create({
          data: {
            userId,
            dishId,
            quantity: 1
          }
        });
      }

      return { message: '✅ Item added to cart successfully' };
    } catch (error) {
      console.error(error);
      if (error instanceof BadRequestException) {
        console.log(error.message);
        throw new BadRequestException(error.message);
      }
      throw new ConflictException(
        '❌ Something went wrong while adding to cart'
      );
    }
  }

  // 📦 Fetch all items for current user
  async fetchCart(userId: string) {
    try {
      const cartItems = await this.prisma.cart.findMany({
        where: { userId },
        include: {
          dish: true
        }
      });

      return cartItems;
    } catch (error) {
      console.error(error);
      throw new ConflictException(
        '❌ Something went wrong while fetching cart'
      );
    }
  }

  // 🔄 Update quantity of a specific cart item
  async updateCart(userId: string, id: string, quantity: number) {
    try {
      const cartItem = await this.prisma.cart.findFirst({
        where: { id, userId }
      });

      if (!cartItem) {
        throw new NotFoundException('❌ Cart item not found');
      }

      if (quantity <= 0) {
        await this.prisma.cart.delete({ where: { id } });
        return { message: '🗑️ Item removed because quantity is 0' };
      }

      await this.prisma.cart.update({
        where: { id },
        data: { quantity }
      });

      return { message: '✅ Cart item updated successfully' };
    } catch (error) {
      console.error(error);
      throw new ConflictException(
        '❌ Something went wrong while updating cart'
      );
    }
  }

  async removeCart(id: string) {
    try {
      const cartItem = await this.prisma.cart.findUnique({
        where: { id }
      });

      if (!cartItem) {
        throw new NotFoundException('❌ Cart item not found');
      }

      await this.prisma.cart.delete({
        where: { id }
      });

      return { message: '🗑️ Cart item removed successfully' };
    } catch (error) {
      console.error(error);

      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      )
        throw error;

      throw new ConflictException(
        '❌ Something went wrong while removing cart item'
      );
    }
  }
}
