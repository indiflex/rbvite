import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { beforeEachApp } from './setup.test';
import { Tag } from '../src/posts/entities/tag.entity';
import { Post } from '../src/posts/entities/post.entity';

const { VERSION } = process.env;
const BASE_URL = `/api/${VERSION}/posts`;

const mock = {
  title: '홍길동 title...',
  content: 'content...',
  writer: 14,
  tags: [{ tname: 'tag111' }, { tname: 'tag112' }],
};

const mockTag = {
  tname: 'tag123하호',
};

describe('Post (e2e)', () => {
  describe.skip('PostController - Tag', () => {
    let tag: Tag;

    it('/tags - validate (POST)', () => {
      return req
        .post(`${BASE_URL}/tags`)
        .send({ tname: '1' })
        .expect(HttpStatus.BAD_REQUEST)
        .expect((res: request.Response) => {
          const { message } = res.body;
          expect(message).toStrictEqual([
            '해시태그는 특수문자를 제외한 2~8글자입니다!',
          ]);
        });
    });

    it('/tags - validate - special-characters (POST)', () => {
      return req
        .post(`${BASE_URL}/tags`)
        .send({ tname: 'aAb^!' })
        .expect(HttpStatus.BAD_REQUEST)
        .expect((res: request.Response) => {
          const { message } = res.body;
          expect(message).toStrictEqual([
            '해시태그는 특수문자를 제외한 2~8글자입니다!',
          ]);
        });
    });

    it('/create-post (POST)', () => {
      return req
        .post(`${BASE_URL}/tags`)
        .send(mockTag)
        .expect(HttpStatus.CREATED)
        .expect((res: request.Response) => {
          tag = res.body;
          // console.log('🚀  tag:', tag);
          const { id, tname } = res.body;
          expect(tname).toBe(mockTag.tname);
          expect(id).toBeGreaterThan(0);
        });
    });

    it('/get-tag (GET)', () => {
      return req
        .get(`${BASE_URL}/tags/${tag.id}`)
        .expect(HttpStatus.OK)
        .expect((res: request.Response) => {
          expect(res.body).toStrictEqual(tag);
        });
    });

    it('/get-tag-by-name (GET)', () => {
      return (
        req
          // .get(`${BASE_URL}/tags?q=${encodeURIComponent(tag.tname)}`)
          .get(`${BASE_URL}/tags`)
          .query({ q: tag.tname })
          // .query(encodeURIComponent(tag.tname))
          .expect(HttpStatus.OK)
          .expect((res: request.Response) => {
            // console.log('********>>', res.body);
            expect(res.body).toStrictEqual([tag]);
          })
      );
    });

    it('/delete-tag (DELETE)', () => {
      return req
        .delete(`${BASE_URL}/tags/${tag.id}`)
        .expect(HttpStatus.OK)
        .expect((res: request.Response) => {
          // console.log('🚀  res:', res.body);
          const { affected } = res.body;
          expect(affected).toBe(1);
        });
    });
  });

  describe('PostController - CRUD', () => {
    let post: Post;

    it('/create-post validate - length (POST)', () => {
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
          // console.log('🚀  post:', post);
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

    it('/get-post-all (GET)', () => {
      return req
        .get(`${BASE_URL}`)
        .expect(HttpStatus.OK)
        .expect((res: request.Response) => {
          // console.log('********>>', res.body);
          const posts = <Post[]>res.body;
          expect(posts.map((post) => post.id)).toContain(post.id);
        });
    });

    it('/get-post-by-tag (GET)', () => {
      const {
        tags: {
          '0': { tname },
        },
      } = post;
      console.log('🚀  tname:', tname);

      return req
        .get(`${BASE_URL}`)
        .query({ tname })
        .expect(HttpStatus.OK)
        .expect((res: request.Response) => {
          console.log('********>>', res.body);
          const posts = <Post[]>res.body;
          expect(posts.length).toBeGreaterThanOrEqual(1);
        });
    });

    it('/update-post (PATCH)', () => {
      return req
        .patch(`${BASE_URL}/${post.id}`)
        .set('accepted', 'application/json')
        .send({
          ...post,
          writer: post.writer.id,
          title: 'xxx',
          tags: mock.tags,
        })
        .expect(HttpStatus.OK)
        .expect((res: request.Response) => {
          const { title, tags } = res.body;
          expect(title).toBe('xxx');
          expect(tags.map((tag: Tag) => tag.tname));
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
