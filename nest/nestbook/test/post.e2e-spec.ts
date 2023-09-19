import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { beforeEachApp } from './setup.test';
import { Post } from 'src/posts/entities/post.entity';

const { VERSION } = process.env;
const BASE_URL = `/api/${VERSION}/posts`;

const mock = {
  title: '홍길동 title...',
  content: 'content...',
  writer: 14,
};
describe.only('Post (e2e)', () => {
  describe('PostController - CRUD', () => {
    let post: Post;

    it('/create-post validate (POST)', () => {
      return reqPost
        .send({ ...mock, title: '' })
        .expect(HttpStatus.BAD_REQUEST)
        .expect((res: request.Response) => {
          const { message } = res.body;
          expect(message).toStrictEqual(['title should not be empty']);
          // console.log('🚀  post:', res.body);
        });
    });

    it('/create-post (POST)', () => {
      return reqPost
        .send(mock)
        .expect(HttpStatus.CREATED)
        .expect((res: request.Response) => {
          post = res.body;
          delete post.writer.passwd;
          delete post.writer.email;
          delete post.writer.createdAt;
          delete post.writer.updatedAt;
          console.log('🚀  post:', post);
          const {
            title,
            content,
            writer: { id: writer },
          } = res.body;
          expect(title).toBe(mock.title);
          expect(content).toBe(mock.content);
          expect(writer).toBe(mock.writer);
        });
    });

    it('/get-post (GET)', () => {
      return req
        .get(`${BASE_URL}/${post.id}`)
        .expect(HttpStatus.OK)
        .expect((res: request.Response) => {
          expect(res.body).toStrictEqual(post);
        });
    });

    it('/get-post (GET)', () => {
      return req
        .get(`${BASE_URL}`)
        .expect(HttpStatus.OK)
        .expect((res: request.Response) => {
          // console.log('********>>', res.body);
          const posts = <Post[]>res.body;
          expect(posts.map((post) => post.id)).toContain(post.id);
        });
    });

    it('/update-post (PATCH)', () => {
      return req
        .patch(`${BASE_URL}/${post.id}`)
        .set('accepted', 'application/json')
        .send({ ...post, writer: post.writer.id, title: 'xxx' })
        .expect(HttpStatus.OK)
        .expect((res: request.Response) => {
          const { title } = res.body;
          expect(title).toBe('xxx');
        });
    });

    it('/delete-post (DELETE)', () => {
      return req
        .delete(`${BASE_URL}/${post.id}`)
        .expect(HttpStatus.OK)
        .expect((res: request.Response) => {
          // console.log('🚀  res:', res.body);
          const { affected } = res.body;
          expect(affected).toBe(1);
        });
    });
  });

  let app: INestApplication;
  let req: request.SuperTest<request.Test>;
  let reqPost: request.Test;

  beforeEach(async () => {
    [app, req] = await beforeEachApp();
    reqPost = req.post(BASE_URL).set('accepted', 'application/json');
  });

  afterEach(async () => {
    app.close();
  });
});
