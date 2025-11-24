import { IsInt, Min, Max, IsString, IsOptional } from 'class-validator';

export class CreateReviewDto {
  @IsInt({message:'rating should be in number format'})
  @Min(1)
  @Max(5)
  rating: number;

  @IsString({message:'comment should be in string format'})
  @IsOptional()
  comment?: string;
}
