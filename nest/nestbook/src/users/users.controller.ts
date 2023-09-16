import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  ParseIntPipeOptions,
  HttpStatus,
  DefaultValuePipe,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Transform } from 'class-transformer';
import { CreateAuthDto } from './dto/create-auth.dto';

const NotAcceptableId: ParseIntPipeOptions = {
  // errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
  exceptionFactory() {
    return {
      statusCode: HttpStatus.NOT_ACCEPTABLE,
      message: 'ID는 숫자만 가능합니다!',
    };
  },
};
@Controller('/:namespace/:version/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    // console.log('🚀  createUserDto:', createUserDto);
    return this.usersService.create(createUserDto);
  }

  // (warning):id와 같은 depth
  // TODO: depth 변경(email/verify)
  @Get('verify')
  verify(@Query('email') email: string, @Query('token') token: string) {
    return this.usersService.verifyToken(email, token);
  }

  // /api/0.1/users/auths
  @Post('/auths')
  createAuth(@Body() createAuthDto: CreateAuthDto) {
    return this.usersService.createAuth(createAuthDto);
  }

  @Get('/auths')
  findAllAuth() {
    return this.usersService.findAllAuth();
  }

  @Get(':id')
  // findOne(@Param('id') id: string) {
  // findOne(@Param('id', ParseIntPipe) id: number) {
  findOne(@Param('id', new ParseIntPipe(NotAcceptableId)) id: number) {
    return this.usersService.findOne(id);
  }

  @Get('/:id/defpipe')
  @Transform((params) => {
    console.log('p>>>>', params);
    return params.value;
  })
  defPipe(@Param('id', new DefaultValuePipe(100)) id: number) {
    return this.usersService.findOne(id);
  }

  @Get()
  findAll(@Query('page', ParseIntPipe) page: number) {
    return this.usersService.findAll(page);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
