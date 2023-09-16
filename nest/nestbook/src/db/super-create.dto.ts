import { IsInt, IsOptional } from 'class-validator';

export class SuperCreateDto {
  @IsInt()
  @IsOptional()
  id: number;
}
