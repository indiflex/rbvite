import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { SuperCreateDto } from 'src/db/super-create.dto';
import { CreateTagDto } from './create-tag.dto';
import { Type } from 'class-transformer';

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

  @ValidateNested()
  @Type(() => CreateTagDto)
  @IsOptional()
  tags: CreateTagDto[];

  get tagNames() {
    return this.tags?.map((tag) => tag.tname);
  }
}
