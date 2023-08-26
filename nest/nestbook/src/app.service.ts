import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!!';
  }

  sayHello(nickname: string): string {
    return `Hello, ${nickname}!`;
  }

  ttt() {
    return { msg: 'ttt' };
  }
}
