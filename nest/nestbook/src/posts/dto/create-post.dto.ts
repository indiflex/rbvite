import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { SuperCreateDto } from 'src/db/super-create.dto';

export class CreatePostDto extends SuperCreateDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsInt()
  @IsNotEmpty()
  writer: number;
}
