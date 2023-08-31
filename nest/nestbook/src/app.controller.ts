import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { BService } from './services';

@Controller()
export class AppController {
  greet: string;
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
