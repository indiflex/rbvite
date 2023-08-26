import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const mock = {
  nickname: '홍길동',
};

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!!"', () => {
      expect(appController.getHello()).toBe('Hello World!!');
    });

    it('sayHello', () => {
      expect(appController.sayHello(mock.nickname)).toBe(
        `Hello, ${mock.nickname}!`,
      );
    });
  });
});
