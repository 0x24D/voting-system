import chai, { expect, assert } from 'chai';
import nodemailer from 'nodemailer';
import app from '../../app';
import Voter from '../../src/models/voterModel';

const chaiHttp = require('chai-http');

const should = chai.should();

chai.use(chaiHttp);

describe('Email tests', () => {
  afterEach((done) => {
    Voter.collection.drop(() => {
      done();
    });
  });

  it('Should send an email on /api/v1/email with valid Id', (done) => {
    let voter1Id = '';
    nodemailer.createTestAccount((err, acc) => {
      const voter1 = new Voter({
        username: 'emailTest',
        name: 'User 1',
        email: acc.user,
        password: 'user1',
        roles: 'voter',
        date_of_birth: new Date('01/01/01'),
        address: null,
      });
      voter1Id = String(voter1._id);
      voter1.save(() => {
        chai.request(app)
          .post('/api/v1/email')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({
            id: voter1Id,
            subject: 'subject',
            text: 'text',
          })
          .end((saveErr, res) => {
            res.should.have.status(204);
            done();
          });
      });
    });
  });

  it('Should error on /api/v1/email with invalid Id', (done) => {
    chai.request(app)
      .post('/api/v1/email')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        id: 'invalidId',
        subject: 'subject',
        text: 'text',
      })
      .end((err, res) => {
        res.should.have.status(500);
        done();
      });
  });
});
