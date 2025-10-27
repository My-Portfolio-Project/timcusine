import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CartDto {
  @IsNumber()
  @IsOptional()
  quantity?: number;

  @IsNotEmpty()
  dishId: string;
}
