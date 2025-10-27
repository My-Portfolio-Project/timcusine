/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { CheckoutDto } from './dto/checkout.dto';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { DatabaseService } from 'src/database/database.service';
import { OrderStatus } from '@prisma/client';

interface PaystackInitResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

// ✅ Define Paystack response interface
interface PaystackVerifyResponse {
  status: boolean;
  message: string;
  data: {
    status: string;
    reference: string;
    amount: number;
    metadata: {
      userId: string;
      amount: number;
      address: {
        street: string;
        city: string;
        state: string;
        country: string;
      };
      payment: string;
      dish: Array<{
        id: string;
        name: string;
        price: number; // Use number, not string
        desc: string;
        quantity: number;
      }>;
    };
  };
}

interface CheckoutItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

@Injectable()
export class OrderService {
  private stripe: Stripe;

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: DatabaseService
  ) {
    const stripeKey = this.configService.get<string>('STRIPE_SECRET_KEY');
    if (!stripeKey) throw new Error('STRIPE_SECRET_KEY is not defined');

    this.stripe = new Stripe(stripeKey, {
      apiVersion: '2025-08-27.basil'
    });
  }

  async createCheckout(userId: string, checkoutDto: CheckoutDto) {
    const { dish, street, city, state, country } = checkoutDto;

    if (!userId) throw new BadRequestException('User ID is required');
    if (!dish?.length)
      throw new BadRequestException('At least one product is required');

    const totalAmount = dish.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    if (checkoutDto.payment === 'STRIPE') {
      try {
        const lineItems = dish.map((d) => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: d.name,
              images: [d.image]
            },
            unit_amount: Math.round(d.price * 100)
          },
          quantity: d.quantity
        }));

        const session = await this.stripe.checkout.sessions.create({
          mode: 'payment',
          payment_method_types: ['card'],
          line_items: lineItems,
          success_url: `${this.configService.get<string>(
            'SUCCESS_URL'
          )}/carts/checkout-success?payment=STRIPE&session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${this.configService.get<string>('CANCEL_URL')}/carts`,
          metadata: {
            userId,
            street,
            city,
            state,
            country,
            totalAmount,
            payment: 'STRIPE',
            items: JSON.stringify(
              dish.map((d) => ({
                id: d.id,
                name: d.name,
                price: d.price,
                quantity: d.quantity
              }))
            )
          }
        });

        return {
          message: '✅ Stripe checkout session created successfully',
          sessionId: session.id,
          url: session.url
        };
      } catch (error) {
        console.error('Stripe error:', error);
        throw new InternalServerErrorException(
          '❌ Failed to create Stripe checkout session'
        );
      }
    }

    if (checkoutDto.payment === 'PAYSTACK') {
      try {
        const metaDish = dish.map((d) => ({
          id: d.id,
          name: d.name,
          price: d.price,
          desc: d.desc,
          quantity: d.quantity
        }));

        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const reference: string = uuidv4();

        const paystackSecret = this.configService.get<string>(
          'PAYSTACK_SECRET_KEY'
        );

        const response = await axios.post<PaystackInitResponse>(
          'https://api.paystack.co/transaction/initialize',
          {
            email: `${userId}@example.com`,
            amount: totalAmount * 100,
            reference,
            callback_url: `${this.configService.get<string>(
              'FRONTEND_URL'
            )}/user/cart/checkout-success?reference=${reference}&payment=PAYSTACK`,
            metadata: {
              userId,
              address: { street, city, state, country },
              payment: 'PAYSTACK',
              dish: metaDish
            }
          },
          {
            headers: {
              Authorization: `Bearer ${paystackSecret}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (!response.data) {
          throw new BadRequestException(
            'Failed to initialize Paystack payment'
          );
        }

        return {
          message: '✅ Paystack checkout session created successfully',
          authorizationUrl: response.data.data.authorization_url,
          reference: response?.data?.data?.reference
        };
      } catch (error) {
        console.error('Paystack error:', error);
        throw new InternalServerErrorException(
          '❌ Failed to create Paystack checkout session'
        );
      }
    }

    throw new BadRequestException('Invalid payment method provided');
  }

  async checkoutSuccess(query: {
    payment: 'STRIPE' | 'PAYSTACK';
    session_id?: string;
    reference?: string;
  }) {
    try {
      const { payment, session_id, reference } = query;

      if (payment === 'STRIPE') {
        if (!session_id)
          throw new BadRequestException('Stripe session_id is required');

        const session =
          await this.stripe.checkout.sessions.retrieve(session_id);

        if (session.payment_status !== 'paid') {
          throw new BadRequestException('Payment not completed yet');
        }

        // ✅ Save order in DB
        const meta = session.metadata;
        if (!meta) throw new BadRequestException('No metadata found');

        const items = meta.items
          ? (JSON.parse(meta.items) as CheckoutItem[])
          : [];
        console.log('Items details:', items);

        // Verify dishes exist
        for (const item of items) {
          const exists = await this.prisma.dishes.findUnique({
            where: { id: item.id }
          });

          if (!exists) {
            throw new BadRequestException(`Dish with id ${item.id} not found`);
          }
        }

        const order = await this.prisma.order.create({
          data: {
            userId: meta.userId,
            totalAmount: Number(meta.totalAmount),
            city: meta.city,
            country: meta.country,
            street: meta.street,
            state: meta.state,
            status: OrderStatus.PENDING,
            payment: 'STRIPE',
            items: {
              create: items.map((item) => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                dish: {
                  connect: { id: item.id } // ✅ safer reference
                }
              }))
            }
          },
          include: {
            items: true
          }
        });
        console.log('Orders', order);

        return {
          message: '✅ Stripe payment verified successfully',
          order
        };
      }

      if (payment === 'PAYSTACK') {
        if (!reference)
          throw new BadRequestException('Paystack reference is required');

        const paystackSecret = this.configService.get<string>(
          'PAYSTACK_SECRET_KEY'
        );

        const response = await axios.get<PaystackVerifyResponse>(
          `https://api.paystack.co/transaction/verify/${reference}`,
          {
            headers: {
              Authorization: `Bearer ${paystackSecret}`
            }
          }
        );

        const data = response.data.data;

        if (data.status !== 'success') {
          throw new BadRequestException('Payment not successful');
        }

        // ✅ Update order to PAID
        const order = await this.prisma.order.create({
          data: {
            userId: data.metadata.userId,
            totalAmount: Number(data.metadata.amount),
            city: data.metadata.address.city,
            country: data.metadata.address.country,
            street: data.metadata.address.street,
            state: data.metadata.address.state,
            status: OrderStatus.PENDING,
            payment: 'PAYSTACK',
            items: {
              create: data.metadata.dish.map((dish) => ({
                dishId: dish.id,
                name: dish.name,
                price: dish.price,
                quantity: dish.quantity
              }))
            }
          }
        });

        return {
          message: '✅ Paystack payment verified successfully',
          order,
          reference: data.reference
        };
      }

      throw new BadRequestException('Invalid payment method');
    } catch (error) {
      console.error('Checkout success error:', error);
      if (error instanceof BadRequestException)
        throw new BadRequestException(error.message);
      throw new InternalServerErrorException(
        '❌ Something went wrong while verifying payment'
      );
    }
  }

  async fetchAll(page = 1, limit = 5) {
    try {
      const skip = (page - 1) * limit;

      const orders = await this.prisma.order.findMany({
        skip,
        take: limit,
        include: {
          items: {
            include: {
              dish: true
            }
          },
          user: true
        },
        orderBy: { createdAt: 'desc' }
      });

      const totalCount = await this.prisma.order.count();
      const totalPage = Math.ceil(totalCount / limit);

      if (orders.length === 0) {
        throw new NotFoundException('Orders list is empty');
      }

      return {
        orders,
        totalPage,
        skip,
        page
      };
    } catch (error) {
      console.error(error);
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException(
        '❌ Something went wrong while fetching orders'
      );
    }
  }

  async fetchSingle(id: string) {
    try {
      const dishes = await this.prisma.dishes.findUnique({
        where: { id }
      });

      if (!dishes) {
        throw new NotFoundException('Dishes not found');
      }

      return { dishes };
    } catch (error) {
      console.error(error);
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException(
        '❌ Something went wrong while fetching dishes'
      );
    }
  }
  async searchOrder(searchTerm: string) {
    try {
      if (!searchTerm || searchTerm.trim() === '') {
        throw new BadRequestException('Search term is required');
      }

      const order = await this.prisma.order.findMany({
        where: {
          OR: [
            {
              id: {
                contains: searchTerm,
                mode: 'insensitive'
              }
            },
            {
              street: {
                contains: searchTerm,
                mode: 'insensitive'
              }
            }
          ]
        }
      });

      return {
        message:
          order.length > 0
            ? `Found ${order.length} order${order.length > 1 ? 'es' : ''}`
            : 'No dishes found',
        data: order
      };
    } catch (error) {
      console.error('Error searching dishes:', error);
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException(
        '❌ Something went wrong while fetching dishes'
      );
    }
  }
}
