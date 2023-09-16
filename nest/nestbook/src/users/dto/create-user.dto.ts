import { BadRequestException } from '@nestjs/common';
import { Transform, Type } from 'class-transformer';
import {
  IsString,
  IsEmail,
  Matches,
  IsNotEmpty,
  IsInt,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { CreateProfileDto } from './create-profile.dto';
import { CreateAddrDto } from './create-addr.dto';
import { CreateAuthDto } from './create-auth.dto';

export class CreateUserDto {
  @IsInt()
  @IsOptional()
  id: number;

  @IsString()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: '이메일을 정확히 입력하세요!' })
  @Transform((params) => {
    // console.log('🚀  params:', params);
    return params.value.trim();
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value, obj: { passwd, name } }) => {
    if (passwd.includes(name.trim()))
      throw new BadRequestException('암호에 이름이 포함되면 안됩니다!');

    return value;
  })
  @Matches(/^[A-z\d!@#$%^&*()]*$/, {
    message: '암호는 영문과 특수문자만 가능합니다!',
  })
  @Matches(/^[A-z\d!@#$%^&*()]{8,30}$/, {
    message: '암호는 최소 8자리 이상 30자 미만입니다!',
  })
  passwd: string;

  @ValidateNested()
  @Type(() => CreateProfileDto)
  @IsNotEmpty()
  profile: CreateProfileDto;

  @ValidateNested()
  @Type(() => CreateAddrDto)
  addrs: CreateAddrDto[];

  @ValidateNested()
  @Type(() => CreateAuthDto)
  auths: CreateAuthDto[];
}
