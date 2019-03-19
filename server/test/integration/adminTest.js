import chai, { expect, assert } from 'chai';
import app from '../../app';

import Admin from '../../src/models/adminModel';

const chaiHttp = require('chai-http');

const should = chai.should();

chai.use(chaiHttp);

describe('Admin tests', () => {
  let adminId1;
  beforeEach((done) => {
    const admin1 = new Admin({
      username: 'username1',
      name: 'User 1',
      email: 'user1@hotmail.com',
      password: 'user1',
      roles: 'admin',
    });
    adminId1 = String(admin1._id);
    admin1.save(() => {
      done();
    });
  });

  afterEach((done) => {
    Admin.collection.drop(() => {
      done();
    });
  });

  it('should list 1 admin on /api/v1/admins/<id> GET', (done) => {
    chai.request(app)
      .get(`/api/v1/admins/${adminId1}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('username');
        res.body.should.have.property('name');
        res.body.should.have.property('email');
        res.body.should.have.property('password');
        res.body.should.have.property('roles');
        res.body.should.have.property('authentication_attempts');
        res.body._id.should.equal(adminId1);
        res.body.username.should.equal('username1');
        res.body.name.should.equal('User 1');
        res.body.email.should.equal('user1@hotmail.com');
        res.body.password.should.equal('user1');
        res.body.roles.should.equal('admin');
        res.body.authentication_attempts.should.equal(0);
        done();
      });
  });

  it('should add new admin on /api/v1/admins POST', (done) => {
    chai.request(app)
      .post('/api/v1/admins')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        username: 'testuser',
        name: 'testname',
        email: 'test@mail',
        password: 'testPass',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('username');
        res.body.should.have.property('name');
        res.body.should.have.property('email');
        res.body.should.have.property('password');
        res.body.should.have.property('authentication_attempts');
        res.body.username.should.equal('testuser');
        res.body.name.should.equal('testname');
        res.body.email.should.equal('test@mail');
        res.body.password.should.not.equal('testPass');
        res.body.authentication_attempts.should.equal(0);
        done();
      });
  });
});
