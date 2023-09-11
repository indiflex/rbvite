import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

const { VERSION } = process.env;
const BASE_URL = `/api/${VERSION}/users`;

describe.only('UsersController - passwd (e2e)', () => {
  let app: INestApplication;
  let req: request.Test;

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
    req = request(app.getHttpServer())
      .post(BASE_URL)
      .set('accepted', 'application/json');
  });

  afterEach(async () => {
    app.close();
  });

  it('/create - passwd - 영문/특수문자 (POST)', () => {
    return req
      .send({
        name: '홍길동',
        email: 'indiflex1@gmail.com',
        passwd: 'as121a한글',
        addr: '서울',
      })
      .expect(HttpStatus.BAD_REQUEST)
      .expect((res: request.Response) => {
        // console.log('>>>>>>>', res.body);
        const { message } = res.body;
        expect(message).toStrictEqual(['암호는 영문과 특수문자만 가능합니다!']);
      });
  });

  it('/create - OK (POST)', () => {
    return req
      .send({
        name: '홍길동',
        email: 'indiflex1@gmail.com',
        passwd: 'as121a!@#asdfas',
        addr: '서울',
      })
      .expect(HttpStatus.OK);
  });

  it('/create - passwd - 8~30자 (POST)', () => {
    return req
      .send({
        name: '홍길동',
        email: 'indiflex1@gmail.com',
        passwd: 'as12',
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

  it('/create - passwd - name include (POST)', () => {
    return req
      .send({
        name: '홍길동',
        email: 'indiflex1@gmail.com',
        passwd: '홍길동123',
        addr: '서울',
      })
      .expect(HttpStatus.BAD_REQUEST)
      .expect((res: request.Response) => {
        // console.log('>>>>>>>', res.body);
        const { message } = res.body;
        expect(message).toStrictEqual('암호에 이름이 포함되면 안됩니다!');
      });
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get(BASE_URL)
      .expect(HttpStatus.OK)
      .expect(`This action returns all users`);
  });

  it('DefaultValuePipe (GET)', () => {
    return request(app.getHttpServer())
      .get(BASE_URL + '/1/defpipe')
      .expect(200)
      .expect(`This action returns a #1 user`);
  });
});
