import { Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  greet: string;
  constructor(private readonly appService: AppService) {}

  @Get('/sayHello')
  sayHello(@Query('nickname') nickname: string): string {
    return this.appService.sayHello(nickname);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

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
