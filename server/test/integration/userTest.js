import chai from 'chai';
import { expect } from 'chai';
import { assert } from 'chai';
import app from '../../app';

import User from '../../src/models/userModel';

const chaiHttp = require('chai-http');

const should = chai.should();

chai.use(chaiHttp);

describe('User tests', () => {
  let userId1;
  let userId2;
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
    userId2 = String(user2._id)
    User.insertMany([user1, user2], () => {
      done();
      });
    });

  afterEach((done) => {
      User.collection.drop(() => {
        done();
    });
  });

  it('should list 1 user on /api/v1/users/<id> GET', (done) => {
    chai.request(app)
      .get(`/api/v1/users/${userId1}`)
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
        res.body.should.have.property('authenticationAttempts');        
        res.body._id.should.equal(userId1);
        res.body.username.should.equal('username1');
        res.body.name.should.equal('User 1');
        res.body.email.should.equal('user1@hotmail.com');
        res.body.password.should.equal('user1');
        res.body.roles.should.equal('voter');
        res.body.authenticationAttempts.should.equal(0);
        done();
      });
  });
});
