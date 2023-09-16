import { IsIn, IsOptional, IsString } from 'class-validator';
import { SuperCreateDto } from 'src/db/super-create.dto';

export class CreateProfileDto extends SuperCreateDto {
  @IsString()
  @IsOptional()
  photo: string;

  /**
   * 0: ready
   * 1: registed
   * 2: vip
   * 3: vvip
   */
  @IsIn([0, 1, 2, 3])
  @IsOptional()
  role: number;
}
