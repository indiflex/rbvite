import { IsString } from 'class-validator';
import { SuperCreateDto } from '../../db/super-create.dto';

export class CreateAddrDto extends SuperCreateDto {
  @IsString()
  street: string;

  @IsString()
  detail: string;
}
