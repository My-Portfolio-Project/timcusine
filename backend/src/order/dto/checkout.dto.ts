import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';
import type {
  OrderStatus as PrismaOrderStatus,
  PaymentMethod as PrismaPaymentMethod
} from '@prisma/client';

export enum OrderStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum PaymentMethod {
  PAYSTACK = 'PAYSTACK',
  STRIPE = 'STRIPE'
}

export class ProductItemDto {
  @ApiProperty({ example: 'dish_abc123' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'Fried Rice' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'https://example.com/image.jpg' })
  @IsString()
  image: string;

  @ApiProperty({ example: 'this is a description of the product' })
  @IsString()
  desc: string;

  @ApiProperty({ example: 2500 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  quantity: number;
}

/**
 * Checkout DTO used for validating order creation requests
 */
export class CheckoutDto {
  @ApiProperty({
    type: [ProductItemDto],
    description: 'Array of dishes to be ordered'
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductItemDto)
  dish: ProductItemDto[];

  @ApiProperty({ example: '123 Lekki Street' })
  @IsString()
  street: string;

  @ApiProperty({ example: 'Lagos' })
  @IsString()
  city: string;

  @ApiProperty({ example: 'Nigeria' })
  @IsString()
  country: string;

  @ApiProperty({ example: 'Lagos State' })
  @IsString()
  state: string;

  @ApiProperty({
    enum: OrderStatus,
    default: OrderStatus.PENDING,
    required: false
  })
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: PrismaOrderStatus;

  @ApiProperty({
    enum: PaymentMethod,
    default: PaymentMethod.PAYSTACK,
    required: false
  })
  @IsOptional()
  @IsEnum(PaymentMethod)
  payment?: PrismaPaymentMethod;
}
