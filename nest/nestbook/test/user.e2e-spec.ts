import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

const { VERSION } = process.env;
const BASE_URL = `/api/${VERSION}/users`;

describe.only('UsersController - passwd (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/create (POST)', () => {
    return request(app.getHttpServer())
      .post(BASE_URL)
      .set('accepted', 'application/json')
      .send({
        name: '홍길동',
        email: 'indiflex1@gmail.com',
        passwd: 'as121a',
        addr: '서울',
      })
      .expect(HttpStatus.BAD_REQUEST)
      .expect((res: request.Response) => {
        // console.log('>>>>>>>', res.body);
        const { message } = res.body;
        expect(message).toStrictEqual([
          '암호는 최소 8자리 이상 30자 미만입니다!',
        ]);
      });
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get(BASE_URL)
      .expect(HttpStatus.OK)
      .expect(`This action returns all users`);
  });

  it.skip('/sayHello (GET)', () => {
    return request(app.getHttpServer())
      .get('/sayHello?nickname=Jade')
      .expect(200)
      .expect('Hello, Jade!');
  });
});
