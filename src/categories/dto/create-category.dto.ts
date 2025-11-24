import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({message:'name should not be empty'})
  @IsString({message:'name should be in string format'})
  name: string;

  @IsOptional()
  @IsString({message:'description should be in string format'})
  description?: string;
}
