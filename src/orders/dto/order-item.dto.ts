import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class OrderItemDto {
  @IsString({ message: 'productId should be a string' })
  @IsNotEmpty({ message: 'productId cannot be empty' })
  productId: string;

  @IsNumber({}, { message: 'quantity must be a number' })
  @Min(1, { message: 'Minimum quantity is 1' })
  quantity: number;

  @IsNumber({}, { message: 'price must be a number' })
  @IsNotEmpty({ message: 'price cannot be empty' })
  price: number;
}
