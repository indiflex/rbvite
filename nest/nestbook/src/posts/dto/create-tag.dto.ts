import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { SuperCreateDto } from '../../db/super-create.dto';

export class CreateTagDto extends SuperCreateDto {
  @Matches(/^[0-9A-zㄱ-힣]{2,8}$/, {
    message: '해시태그는 특수문자를 제외한 2~8글자입니다!',
  })
  @IsString()
  @IsNotEmpty()
  tname: string;
}
