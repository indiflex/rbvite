import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Redirect,
  Req,
} from '@nestjs/common';
import { AppService } from './app.service';
import { BService } from './services';
import { Request } from 'express';
import { CreateUserDto } from './users/dto/create-user.dto';

@Controller()
export class AppController {
  greet: string;
  // tmpQuery: { nickname: string };
  tmpQuery: { nickname: string };
  constructor(
    private readonly appService: AppService,
    private readonly serviceB: BService,
  ) {}

  @Get('serviceB')
  getHelloC() {
    return this.serviceB.hello();
  }

  @Get('/sayHello')
  sayHello(@Query('nickname') nickname: string): string {
    return this.appService.sayHello(nickname);
  }

  @Get('/sayHelloR')
  sayHelloR(@Req() req: Request): string {
    return this.appService.sayHello(JSON.stringify(req.query));
  }

  @Redirect()
  @Get('redirect-hello')
  redirectHello(@Req() req: Request) {
    console.log('redirectHello.req>>', req.query);
    // const { nickname } = req.query;
    // this.tmpQuery = { nickname: nickname as string };
    return {
      // [ [nickname: 홍], [age: 23], []]
      url:
        '/sayHelloR?' +
        Object.entries(req.query)
          .map(([k, v]) => `${k}=${v}`)
          .join('&'),
    };
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @HttpCode(HttpStatus.OK)
  @Post()
  setHello(): string {
    this.greet = 'XXXX';
    return `Hello ${this.greet}`;
  }
}

// x = new AppController(new AppService());
// map.set('/api', x);
// exp.set('/api/hello', getHello);
// r = exp.get('/api/)call({})
// res.send(r)
