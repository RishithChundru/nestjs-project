import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class AddToCartDto {
  @IsString({message:'product id should be string'})
  @IsNotEmpty({message:'product id should not be empty'})
  productId: string;

  @IsNumber({},{message:'quantity should be in number format'})
  @Min(1,{message:'Minimum quantity is one'})
  quantity: number;
}
