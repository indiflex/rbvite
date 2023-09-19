import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { User } from 'src/users/entities/user.entity';

const { VERSION } = process.env;
const BASE_URL = `/api/${VERSION}/users`;

const mock = {
  name: '홍길동100',
  email: 'indiflex100@gmail.com',
  passwd: 'abc!2323#$%#',
  addr: '서울',
};
const mockWithProfile = { ...mock, profile: { photo: 'a.png', role: 0 } };

describe.only('Users (e2e)', () => {
  describe('UsersController - CRUD', () => {
    let user: User;

    it('/create-user (POST)', () => {
      return reqPost
        .send(mockWithProfile)
        .expect(HttpStatus.OK)
        .expect((res: request.Response) => {
          user = res.body;
          // console.log('🚀  user:', user);
          const { name, passwd, profile } = res.body;
          expect(name).toBe(mock.name);
          expect(passwd).toBe(''); // by UserSubscriber
          expect(profile.photo).toBe(mockWithProfile.profile.photo);
          delete user.passwd;
          user.addrs = [];
          user.auths = [];
        });
    });

    it('/get-user (GET)', () => {
      return req
        .get(`${BASE_URL}/${user.id}`)
        .expect(HttpStatus.OK)
        .expect((res: request.Response) => {
          // console.log('********>>', res.body);
          expect(res.body).toStrictEqual(user);
        });
    });

    it('/get-users (GET)', () => {
      return req
        .get(`${BASE_URL}`)
        .expect(HttpStatus.OK)
        .expect((res: request.Response) => {
          // console.log('********>>', res.body);
          const users = <User[]>res.body;
          expect(users.map((user) => user.id)).toContain(user.id);
        });
    });

    it('/update-user (PATCH)', () => {
      return req
        .patch(`${BASE_URL}/${user.id}`)
        .set('accepted', 'application/json')
        .send({ ...user, name: 'xxx', profile: { ...user.profile, role: 1 } })
        .expect(HttpStatus.OK)
        .expect((res: request.Response) => {
          const {
            name,
            profile: { role },
          } = res.body;
          expect(name).toBe('xxx');
          expect(role).toBe(1);
        });
    });

    it('/delete-user (DELETE)', () => {
      return req
        .delete(`${BASE_URL}/${user.id}`)
        .expect(HttpStatus.OK)
        .expect((res: request.Response) => {
          // console.log('🚀  res:', res.body);
          const { affected } = res.body;
          expect(affected).toBe(1);
        });
    });
  });

  describe.skip('UsersController - passwd (e2e)', () => {
    it('/create - passwd - 영문/특수문자 (POST)', () => {
      return reqPost
        .send({ ...mock, passwd: 'as121a한글' })
        .expect(HttpStatus.BAD_REQUEST)
        .expect((res: request.Response) => {
          const { message } = res.body;
          expect(message).toStrictEqual([
            '암호는 영문과 특수문자만 가능합니다!',
            'profile should not be empty',
          ]);
        });
    });

    it('/create - passwd - 8~30자 (POST)', () => {
      return reqPost
        .send({ ...mockWithProfile, passwd: '123!@' })
        .expect(HttpStatus.BAD_REQUEST)
        .expect((res: request.Response) => {
          const { message } = res.body;
          expect(message).toStrictEqual([
            '암호는 최소 8자리 이상 30자 미만입니다!',
          ]);
        });
    });

    it('/create - passwd - name include (POST)', () => {
      const { passwd, name } = mockWithProfile;
      return reqPost
        .send({ ...mockWithProfile, passwd: `${passwd}${name}` })
        .expect(HttpStatus.BAD_REQUEST)
        .expect((res: request.Response) => {
          const { message } = res.body;
          expect(message).toStrictEqual('암호에 이름이 포함되면 안됩니다!');
        });
    });
  });

  let app: INestApplication;
  let req: request.SuperTest<request.Test>;
  let reqPost: request.Test;

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
    req = request(app.getHttpServer());
    reqPost = req.post(BASE_URL).set('accepted', 'application/json');
  });

  afterEach(async () => {
    app.close();
  });
});
