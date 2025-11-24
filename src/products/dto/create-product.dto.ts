import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({message:'title should not be empty'})
  @IsString({message:'title should be in string format'})
  title: string;

  @IsOptional()
  @IsString({message:'description should be in string format'})
  description?: string;

  @IsNotEmpty({message:'price should not be empty'})
  @IsNumber({},{message:'price should be in number format'})
  price: number;

  @IsOptional()
  @IsString({message:'category should be in string format'})
  category?: string;

  @IsOptional()
  @IsString()
  image?: string;
}
