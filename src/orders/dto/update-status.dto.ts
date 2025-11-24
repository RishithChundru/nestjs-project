import { IsString, IsIn } from 'class-validator';

export class UpdateStatusDto {
  @IsString()
  @IsIn(['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'])
  status: string;
}
