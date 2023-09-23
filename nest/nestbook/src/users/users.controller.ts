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
  Logger,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Transform } from 'class-transformer';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Request, Response } from 'express';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../auth/auth.guard';

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
  private readonly logger = new Logger(UsersController.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    // console.log('🚀  createUserDto:', createUserDto);
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(
    @Req() req: Request,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    this.logger.debug('page=' + page);
    this.logger.debug(req.headers.authorization);
    // this.winlog.debug('WinDebug'.repeat(5));
    // this.winlog.error('WinLog'.repeat(5));
    const [, jwt] = req.headers.authorization?.split('Bearer ');
    this.logger.debug('jwt>>> ' + jwt);
    const { email } = this.authService.verifyToken(jwt);
    console.log('🚀  email:', email);

    return this.usersService.findAll(page);
  }

  // (warning):id와 같은 depth
  // TODO: depth 변경(email/verify)
  @Get('verify')
  async verify(
    @Query('email') email: string,
    @Query('token') token: string,
    @Res() res: Response,
  ) {
    const jwt = await this.usersService.verifyToken(email, token);
    // res.setHeader('Authentication', 'Bearer ' + jwt);
    res.setHeader('Authentication', `Bearer ${jwt}`);

    // res.send({ jwt });
    // res.redirect('/');
    res.send({ message: '인증되었습니다!' });
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
