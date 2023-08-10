const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const db = require('../utils/db.js');

require('dotenv').config();

const SAMPLE_NUTRITION = {
  id: 6787,
  food_cd: 'D018027',
  group_name: '구이류-육류구이',
  food_name: '돼지불고기',
  research_year: '2020',
  maker_name: '전국(대표)',
  ref_name: '식품영양성분 자료집',
  serving_size: 200,
  calorie: '449.57',
  carbohydrate: '8.10',
  protein: '29.71',
  province: '33.15',
  sugars: '9.26',
  salt: '625.15',
  cholesterol: '85.66',
  saturated_fatty_acids: '9.02',
  trans_fat: '0.20',
};

function f() {
  return [1, 2, 3];
}

// before(() => console.log('before'));
// beforeEach(() => console.log('before-each'));
// after(() => console.log('after'));
// afterEach(() => console.log('after-each'));

describe('회원', () => {
  it('login', () => {
    const arr = f();
    // console.log('🚀  arr:', arr);
    expect(arr).to.deep.equal([1, 2, 3]);
  });
});

describe('dotenv', () => {
  it('get', () => {
    expect(process.env.TEST).to.be.equal('12345');
  });
});

describe('db utils', () => {
  it('db-gets-finds', async () => {
    const emps = await db.finds('Emp', { dept: 3 });
    // console.log('🚀  emps:', emps);
    expect(emps).to.length(15);
  });

  it('db-gets', async () => {
    const limit = 10;
    const emps = await db.gets('Emp', limit);
    // console.log('🚀  emps:', emps);
    expect(emps).to.length(limit);
  });

  it('db-get', async () => {
    const emp1 = await db.get('Emp', 1);
    // console.log('🚀  emp1:', emp1);
    expect(emp1).to.deep.equal({
      id: 1,
      ename: '전파태',
      dept: 3,
      salary: 900,
    });
  });

  it('db-info', () => {
    const dbinfo = db.getDbInfo();
    // console.log('🚀  dbinfo:', dbinfo);
    expect(dbinfo).to.deep.equal({
      host: 'mydb1.c85blf5gqirg.ap-northeast-2.rds.amazonaws.com',
      port: 3306,
      user: 'lnsol',
      password: process.env.DB_PASSWD,
      database: 'mydb',
      waitForConnections: true,
      connectionLimit: 2,
      maxIdle: 2,
    });
  });
});

const should = chai.should();
chai.use(chaiHttp); // DI & IoC

const uriPath = '/api/v1.0/nutritions';
describe('nutrition - find', () => {
  it('400 BadRequest', done => {
    chai
      .request('http://localhost:8088')
      .get(uriPath)
      .end((err, res) => {
        // console.log('rrrrreeeeerr>>>', err);
        // console.log('rrrrrrr>>>', res.body);
        should.not.exist(err);
        res.statusCode.should.be.eq(400);
        res.body.should.be.deep.eq({
          message: '검색할 조건을 입력하세요!',
          code: 'BadRequest',
        });
        done();
      });
  });

  it('food_code', done => {
    const mockRequest = { food_code: 'D018027' };
    chai
      .request('http://localhost:8088')
      .get(uriPath)
      .query(mockRequest)
      .end((err, res) => {
        // console.log('rrrrreeeeerr>>>', err);
        // console.log('rrrrrrr>>>', res.body);
        should.not.exist(err);
        res.statusCode.should.be.eq(200);
        res.body.should.be.deep.eq([SAMPLE_NUTRITION]);
        done();
      });
  });
});

describe('서버', () => {
  it('get', done => {
    chai
      .request('http://0.0.0.0')
      .get('/')
      .end((err, res) => {
        // console.log('body>>', res.text);
        should.not.exist(err);
        should.exist(res);

        const { text } = res;
        text.should.eq('Hello, Node!');

        // const { body } = res;
        // const { id, name } = body;
        // id.should.to.be.a('number');
        // id.should.to.be.eq(1);
        // id.should.eq(1);
        // id.should.not.to.be.eq(0);
        // id.should.not.eq(0);
        // name.should.to.be.a('string');

        // const user2 = { ...user, name: '홍길동' };
        // body.should.to.be.deep.eq(user2);
        // body.should.deep.eq(user2);
        // expect(body).deep.eq(user2);

        // body.should.have.property('id');
        // body.should.have.property('id').and.eq(1);

        done();
      });
  });
});
