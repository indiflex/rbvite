// describe('json-server', () => {
//   describe('Emp - 직원', () => {
//     it.only('emp object', () => {...});
//     it('/emps - GET - 404', done => {...});
//     it('/emps - GET - 404', done => {...});
//   });

//   describe('Dept - 부서', () => {
//     it.skip('/depts - POST', done => {...});
//     describe('Dept - Emp :: 부서장', () => {...}
//   });
// });
// import chai, { expect } from 'chai';

const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');

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

const should = chai.should();
chai.use(chaiHttp); // DI

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
