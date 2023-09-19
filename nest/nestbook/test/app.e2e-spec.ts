import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { beforeEachApp } from './setup.test';

describe.skip('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    [app] = await beforeEachApp();
  });

  afterEach(async () => {
    app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!!');
  });

  it('/sayHello (GET)', () => {
    return request(app.getHttpServer())
      .get('/sayHello?nickname=Jade')
      .expect(200)
      .expect('Hello, Jade!');
  });
});
