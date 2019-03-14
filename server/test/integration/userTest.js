import chai, { expect, assert } from 'chai';
import app from '../../app';

import User from '../../src/models/userModel';

const chaiHttp = require('chai-http');

const should = chai.should();

chai.use(chaiHttp);

describe('User tests', () => {
  let userId1;
  beforeEach((done) => {
    const user1 = new User({
      username: 'username1',
      name: 'User 1',
      email: 'user1@hotmail.com',
      password: 'user1',
      roles: 'voter',

    });
    userId1 = String(user1._id);
    const user2 = new User({
      username: 'username2',
      name: 'User 2',
      email: 'user2@hotmail.com',
      password: 'user2',
      roles: 'admin',

    });
    User.insertMany([user1, user2], () => {
      done();
    });
  });

  afterEach((done) => {
    User.collection.drop(() => {
      done();
    });
  });

  it('should list 1 user on /api/v1/users/<username> GET', (done) => {
    chai.request(app)
      .get('/api/v1/users/username1')
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
        res.body.username.should.equal('username1');
        res.body.name.should.equal('User 1');
        res.body.email.should.equal('user1@hotmail.com');
        res.body.password.should.equal('user1');
        res.body.roles.should.equal('voter');
        res.body.authentication_attempts.should.equal(0);

        done();
      });
  });

  it('should set authentication attempts to 1 on /api/v1/users/<id> PUT', (done) => {
    chai.request(app)
      .put(`/api/v1/users/${userId1}`)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        authentication_attempts: 1, // could also do user1.authentication_attempts + 1
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
        res.body.should.have.property('roles');
        res.body.should.have.property('authentication_attempts');
        res.body._id.should.equal(userId1);
        res.body.username.should.equal('username1');
        res.body.name.should.equal('User 1');
        res.body.email.should.equal('user1@hotmail.com');
        res.body.password.should.equal('user1');
        res.body.roles.should.equal('voter');
        res.body.authentication_attempts.should.equal(1);
        done();
      });
  });

  it('should add new user on /api/v1/users POST', (done) => {
    chai.request(app)
      .post('/api/v1/users')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        username: 'testuser',
        name: 'testname',
        email: 'test@mail',
        password: 'testPass',
        roles: 'voter',
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('username');
        res.body.should.have.property('name');
        res.body.should.have.property('email');
        res.body.should.have.property('password');
        res.body.should.have.property('roles');
        res.body.should.have.property('authentication_attempts');
        res.body.username.should.equal('testuser');
        res.body.name.should.equal('testname');
        res.body.email.should.equal('test@mail');
        res.body.password.should.equal('testPass');
        res.body.roles.should.equal('voter');
        res.body.authentication_attempts.should.equal(0);
        done();
      });
  });
});
