import chai, { expect, assert } from 'chai';
import bcrypt from 'bcryptjs';
import app from '../../app';

import Admin from '../../src/models/adminModel';
import Voter from '../../src/models/voterModel';

const chaiHttp = require('chai-http');

const should = chai.should();

const SALT_WORK_FACTOR = 10;

chai.use(chaiHttp);

describe('Authentication tests', () => {
  const adminToken = 'admin123456';
  const voterToken = 'voter123456';
  beforeEach((done) => {
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      bcrypt.hash('admin', salt, (err2, hash) => {
        const admin1 = new Admin({
          username: 'admin1',
          name: 'Admin 1',
          email: 'admin1@email.com',
          password: hash,
          roles: 'admin',
          salt,
        });
        const admin2 = new Admin({
          username: 'admin2',
          name: 'Admin 2',
          email: 'admin2@email.com',
          password: hash,
          roles: 'admin',
          salt,
          token: adminToken,
        });
        Admin.insertMany([admin1, admin2], () => {
          bcrypt.genSalt(SALT_WORK_FACTOR, (err3, salt2) => {
            bcrypt.hash('voter', salt2, (err4, hash2) => {
              const voter1 = new Voter({
                username: 'voter1',
                name: 'Voter 2',
                email: 'voter1@email.com',
                password: hash2,
                roles: 'voter',
                date_of_birth: new Date('01/01/01'),
                salt: salt2,
              });
              const voter2 = new Voter({
                username: 'voter2',
                name: 'Voter 2',
                email: 'voter2@email.com',
                password: hash2,
                roles: 'voter',
                date_of_birth: new Date('01/01/01'),
                salt: salt2,
                token: voterToken,
              });
              Voter.insertMany([voter1, voter2], () => {
                done();
              });
            });
          });
        });
      });
    });
  });
  afterEach((done) => {
    Admin.collection.drop(() => {
      Voter.collection.drop(() => {
        done();
      });
    });
  });

  it('should get a token on /api/v1/authentication/login POST with valid admin credentials', (done) => {
    chai.request(app)
      .post('/api/v1/authentication/login')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        username: 'admin1',
        password: 'admin',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('token');
        res.body.token.should.not.be.null;
        done();
      });
  });

  it('should error on /api/v1/authentication/login POST with valid but logged-in admin credentials', (done) => {
    chai.request(app)
      .post('/api/v1/authentication/login')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        username: 'admin2',
        password: 'admin',
      })
      .end((err, res) => {
        res.should.have.status(409);
        done();
      });
  });

  it('should error on /api/v1/authentication/login POST with invalid admin credentials', (done) => {
    chai.request(app)
      .post('/api/v1/authentication/login')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        username: 'admin1',
        password: 'invalid',
      })
      .end((err, res) => {
        res.should.have.status(500);
        done();
      });
  });

  it('should delete admin token on /api/v1/authentication/logout POST with a token', (done) => {
    chai.request(app)
      .post('/api/v1/authentication/logout')
      .set('Authorization', adminToken)
      .end((err, res) => {
        res.should.have.status(204);
        done();
      });
  });

  it('should get a token on /api/v1/authentication/login POST with valid voter credentials', (done) => {
    chai.request(app)
      .post('/api/v1/authentication/login')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        username: 'voter1',
        password: 'voter',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('token');
        res.body.token.should.not.be.null;
        done();
      });
  });

  it('should error on /api/v1/authentication/login POST with valid but logged-in voter credentials', (done) => {
    chai.request(app)
      .post('/api/v1/authentication/login')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        username: 'voter2',
        password: 'voter',
      })
      .end((err, res) => {
        res.should.have.status(409);
        done();
      });
  });

  it('should error on /api/v1/authentication/login POST with invalid voter credentials', (done) => {
    chai.request(app)
      .post('/api/v1/authentication/login')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        username: 'voter1',
        password: 'invalid',
      })
      .end((err, res) => {
        res.should.have.status(500);
        done();
      });
  });

  it('should delete voter token on /api/v1/authentication/logout POST with a token', (done) => {
    chai.request(app)
      .post('/api/v1/authentication/logout')
      .set('Authorization', voterToken)
      .end((err, res) => {
        res.should.have.status(204);
        done();
      });
  });

  it('should error on /api/v1/authentication/logout POST with an invalid token', (done) => {
    chai.request(app)
      .post('/api/v1/authentication/logout')
      .set('Authorization', 'thisIsAnInvalidToken')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('should error on /api/v1/authentication/logout POST with no token', (done) => {
    chai.request(app)
      .post('/api/v1/authentication/logout')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});
