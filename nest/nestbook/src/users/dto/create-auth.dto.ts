import { IsNotEmpty, IsString } from 'class-validator';
import { SuperCreateDto } from 'src/db/super-create.dto';

export class CreateAuthDto extends SuperCreateDto {
  @IsString()
  @IsNotEmpty()
  authname: string;
}
