const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const db = require('../utils/db.js');

require('dotenv').config();

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

describe.only('db utils', () => {
  it.only('db-gets-finds', async () => {
    const emps = await db.finds('Emp', { dept: 3 });
    console.log('🚀  emps:', emps);
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
chai.use(chaiHttp); // DI

describe.skip('서버', () => {
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
