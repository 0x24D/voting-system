import chai, { expect, assert } from 'chai';
import app from '../../app';

import Address from '../../src/models/addressModel';
import Voter from '../../src/models/voterModel';

const chaiHttp = require('chai-http');

const should = chai.should();

chai.use(chaiHttp);

describe('Voter tests', () => {
  let voterId1;
  let voterId2;
  let addressId1;
  beforeEach((done) => {
    const address1 = new Address({
      line_one: 'address line 1',
      line_two: 'address line 2',
      town: 'town',
      county: 'county',
      country: 'country',
      postcode: 'postcode',
    });
    addressId1 = String(address1._id);
    const voter1 = new Voter({
      username: 'username1',
      name: 'User 1',
      email: 'user1@hotmail.com',
      password: 'user1',
      roles: 'voter',
      date_of_birth: new Date('01/01/01'),
      address: address1,
    });
    voterId1 = String(voter1._id);
    const voter2 = new Voter({
      username: 'username2',
      name: 'User 2',
      email: 'user2@hotmail.com',
      password: 'user2',
      roles: 'voter',
      date_of_birth: new Date('01/01/01'),
      address: address1,
    });
    voterId2 = String(voter2._id);
    Voter.insertMany([voter1, voter2], () => {
      done();
    });
  });

  afterEach((done) => {
    Voter.collection.drop(() => {
      done();
    });
  });

  it('should list all voters on /api/v1/voters GET', (done) => {
    chai.request(app)
      .get('/api/v1/voters')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.should.have.lengthOf(2);
        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('username');
        res.body[0].should.have.property('name');
        res.body[0].should.have.property('email');
        res.body[0].should.have.property('password');
        res.body[0].should.have.property('roles');
        res.body[0].should.have.property('authentication_attempts');
        res.body[0].should.have.property('voted');
        res.body[0].should.have.property('date_of_birth');
        res.body[0].should.have.property('address');
        res.body[0]._id.should.equal(voterId1);
        res.body[0].username.should.equal('username1');
        res.body[0].name.should.equal('User 1');
        res.body[0].email.should.equal('user1@hotmail.com');
        res.body[0].password.should.equal('user1');
        res.body[0].roles.should.equal('voter');
        res.body[0].authentication_attempts.should.equal(0);
        res.body[0].voted.should.equal(false);
        res.body[0].date_of_birth.should.equal(new Date('01/01/01').toISOString());
        res.body[0].address.should.equal(addressId1);

        res.body[1].should.have.property('_id');
        res.body[1].should.have.property('username');
        res.body[1].should.have.property('name');
        res.body[1].should.have.property('email');
        res.body[1].should.have.property('password');
        res.body[1].should.have.property('roles');
        res.body[1].should.have.property('authentication_attempts');
        res.body[1].should.have.property('voted');
        res.body[1].should.have.property('date_of_birth');
        res.body[1].should.have.property('address');
        res.body[1]._id.should.equal(voterId2);
        res.body[1].username.should.equal('username2');
        res.body[1].name.should.equal('User 2');
        res.body[1].email.should.equal('user2@hotmail.com');
        res.body[1].password.should.equal('user2');
        res.body[1].roles.should.equal('voter');
        res.body[1].authentication_attempts.should.equal(0);
        res.body[1].voted.should.equal(false);
        res.body[1].date_of_birth.should.equal(new Date('01/01/01').toISOString());
        res.body[1].address.should.equal(addressId1);
        done();
      });
  });

  it('should list 1 voter on /api/v1/voters/<id> GET', (done) => {
    chai.request(app)
      .get(`/api/v1/voters/${voterId1}`)
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
        res.body.should.have.property('voted');
        res.body.should.have.property('date_of_birth');
        res.body.should.have.property('address');
        res.body._id.should.equal(voterId1);
        res.body.username.should.equal('username1');
        res.body.name.should.equal('User 1');
        res.body.email.should.equal('user1@hotmail.com');
        res.body.password.should.equal('user1');
        res.body.roles.should.equal('voter');
        res.body.authentication_attempts.should.equal(0);
        res.body.voted.should.equal(false);
        res.body.date_of_birth.should.equal(new Date('01/01/01').toISOString());
        res.body.address.should.equal(addressId1);
        done();
      });
  });

  it('should set voted to true on /api/v1/voters/<id> PUT', (done) => {
    chai.request(app)
      .put(`/api/v1/voters/${voterId1}`)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        voted: true,
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
        res.body.should.have.property('voted');
        res.body.should.have.property('date_of_birth');
        res.body.should.have.property('address');
        res.body._id.should.equal(voterId1);
        res.body.username.should.equal('username1');
        res.body.name.should.equal('User 1');
        res.body.email.should.equal('user1@hotmail.com');
        res.body.password.should.equal('user1');
        res.body.roles.should.equal('voter');
        res.body.authentication_attempts.should.equal(0);
        res.body.voted.should.equal(true);
        res.body.date_of_birth.should.equal(new Date('01/01/01').toISOString());
        res.body.address.should.equal(addressId1);
        done();
      });
  });

  it('should add new voter on /api/v1/voters POST', (done) => {
    chai.request(app)
      .post('/api/v1/voters')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        username: 'testuser',
        name: 'testname',
        email: 'test@mail',
        password: 'testPass',
        date_of_birth: new Date('01/01/01'),
        address: addressId1,
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
        res.body.should.have.property('voted');
        res.body.should.have.property('date_of_birth');
        res.body.should.have.property('address');
        res.body.username.should.equal('testuser');
        res.body.name.should.equal('testname');
        res.body.email.should.equal('test@mail');
        res.body.password.should.not.equal('testPass');
        res.body.authentication_attempts.should.equal(0);
        res.body.voted.should.equal(false);
        res.body.date_of_birth.should.equal(new Date('01/01/01').toISOString());
        res.body.address.should.equal(addressId1);
        done();
      });
  });
});
