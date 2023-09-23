import { IsNotEmpty, IsString } from 'class-validator';
import { SuperCreateDto } from '../../db/super-create.dto';

export class CreateAuthDto extends SuperCreateDto {
  @IsString()
  @IsNotEmpty()
  authname: string;
}
