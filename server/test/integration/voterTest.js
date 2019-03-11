import chai, { expect, assert } from 'chai';
import app from '../../app';

import Address from '../../src/models/addressModel';
import Voter from '../../src/models/voterModel';

const chaiHttp = require('chai-http');

const should = chai.should();

chai.use(chaiHttp);

describe('Voter tests', () => {
  let voterId1;
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
    voter1.save(() => {
      done();
    });
  });

  afterEach((done) => {
    Voter.collection.drop(() => {
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
        roles: 'voter',
        date_of_birth: new Date('01/01/01'),
        address: addressId1,
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
        res.body.should.have.property('voted');
        res.body.should.have.property('date_of_birth');
        res.body.should.have.property('address');
        res.body.username.should.equal('testuser');
        res.body.name.should.equal('testname');
        res.body.email.should.equal('test@mail');
        res.body.password.should.equal('testPass');
        res.body.roles.should.equal('voter');
        res.body.authentication_attempts.should.equal(0);
        res.body.voted.should.equal(false);
        res.body.date_of_birth.should.equal(new Date('01/01/01').toISOString());
        res.body.address.should.equal(addressId1);
        done();
      });
  });
});
