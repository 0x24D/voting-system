import chai, { expect, assert } from 'chai';
import app from '../../app';

import Constituency from '../../src/models/constituencyModel';

const chaiHttp = require('chai-http');

const should = chai.should();

chai.use(chaiHttp);

describe('Constituency tests', () => {
  let constituency1Id;
  let constituency2Id;

  beforeEach((done) => {
    const constituency1 = new Constituency({
      name: 'Constituency 1',
      minimum_age: 18,
      voting_system: 'FPTP',
    });
    constituency1Id = String(constituency1._id);

    const constituency2 = new Constituency({
      name: 'Constituency 2',
      minimum_age: 18,
      voting_system: 'FPTP',
    });
    constituency2Id = String(constituency2._id);

    Constituency.insertMany([constituency1, constituency2], () => {
      done();
    });
  });

  afterEach((done) => {
    Constituency.collection.drop(() => {
      done();
    });
  });

  it('should list all constituencies /api/v1/constituencies GET', (done) => {
    chai.request(app)
      .get('/api/v1/constituencies')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        expect(res.body).to.have.lengthOf(2);
        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('name');
        res.body[0].should.have.property('minimum_age');
        res.body[0].should.have.property('voting_system');
        res.body[0]._id.should.equal(constituency1Id);
        res.body[0].name.should.equal('Constituency 1');
        res.body[0].minimum_age.should.equal(18);
        res.body[0].voting_system.should.equal('FPTP');

        res.body[1].should.have.property('_id');
        res.body[1].should.have.property('name');
        res.body[1].should.have.property('minimum_age');
        res.body[1].should.have.property('voting_system');
        res.body[1]._id.should.equal(constituency2Id);
        res.body[1].name.should.equal('Constituency 2');
        res.body[1].minimum_age.should.equal(18);
        res.body[1].voting_system.should.equal('FPTP');
        done();
      });
  });

  it('should list one constituency /api/v1/constituencies/<id> GET', (done) => {
    chai.request(app)
      .get(`/api/v1/constituencies/${constituency1Id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('name');
        res.body.should.have.property('minimum_age');
        res.body.should.have.property('voting_system');
        res.body._id.should.equal(constituency1Id);
        res.body.name.should.equal('Constituency 1');
        res.body.minimum_age.should.equal(18);
        res.body.voting_system.should.equal('FPTP');

        done();
      });
  });
});
