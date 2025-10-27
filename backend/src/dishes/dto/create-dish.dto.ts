import { IsString } from 'class-validator';

export class CreateDishDto {
  @IsString()
  image: string;

  @IsString()
  price: string;

  @IsString()
  name: string;

  @IsString()
  desc: string;

  @IsString()
  rating: string;
}
