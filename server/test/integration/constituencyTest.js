import chai from 'chai';
import { expect } from 'chai';
import { assert } from 'chai';
import app from '../../app';

import Constituency from '../../src/models/constituencyModel';

const chaiHttp = require('chai-http');

const should = chai.should();

chai.use(chaiHttp);

describe('Constituency tests', () => {
  let constituency1id;
  let constituency2id;

  beforeEach((done) => {
    const constituency1 = new Constituency({
      name: 'Party 1',
      minimum_age: 18,
      voting_system: 'FPTP',
    });

    constituency1id = String(constituency1._id);

    const constituency2 = new Constituency({
      name: 'Party 2',
      minimum_age: 18,
      voting_system: 'FPTP',
    });

    constituency2id = String(constituency2._id);

    Constituency.insertMany([constituency1, constituency2], () => {
      done();
    });
  });

  afterEach((done) => {
    Constituency.collection.drop(() => {
      done();
    });
  });

  it('should list one constituency /api/v1/constituencies GET', (done) => {
    chai.request(app)
      .get(`/api/v1/constituencies/${constituency1id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('name');
        res.body.should.have.property('minimum_age');
        res.body.should.have.property('voting_system');
        res.body._id.should.equal(constituency1id);
        res.body.name.should.equal('Party 1');
        res.body.minimum_age.should.equal(18);
        res.body.voting_system.should.equal('FPTP');

        done();
      });
  });
});
