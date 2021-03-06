import chai, { expect, assert } from 'chai';
import app from '../../app';

import Party from '../../src/models/partyModel';

const chaiHttp = require('chai-http');

const should = chai.should();

chai.use(chaiHttp);

describe('Party tests', () => {
  let party1Id;

  beforeEach((done) => {
    const party1 = new Party({
      name: 'Party 1',
      description: 'description for party 1',
    });
    party1Id = String(party1._id);

    const party2 = new Party({
      name: 'Party 2',
      description: 'description for party 2',
    });

    Party.insertMany([party1, party2], () => {
      done();
    });
  });

  afterEach((done) => {
    Party.collection.drop(() => {
      done();
    });
  });

  it('should list 1 party on /api/v1/parties/<id> GET', (done) => {
    chai.request(app)
      .get(`/api/v1/parties/${party1Id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('name');
        res.body.should.have.property('description');
        res.body._id.should.equal(party1Id);
        res.body.name.should.equal('Party 1');
        res.body.description.should.equal('description for party 1');
        done();
      });
  });

  it('should add new party on /api/v1/parties POST', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        name: 'first last',
        description: 'test description',
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('name');
        res.body.should.have.property('description');
        res.body.name.should.equal('first last');
        res.body.description.should.equal('test description');
        done();
      });
  });
});
