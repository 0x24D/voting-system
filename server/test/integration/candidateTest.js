import chai from 'chai';
import { expect } from 'chai';
import { assert } from 'chai';
import app from '../../app';

import Candidate from '../../src/models/candidateModel';
import Party from '../../src/models/partyModel';

const chaiHttp = require('chai-http');

const should = chai.should();

chai.use(chaiHttp);

describe('Candidate tests', () => {
  beforeEach((done) => {
    const party1 = new Party({
      name: 'Party 1',
      description: 'Description for party 1',
    });
    const candidate1 = new Candidate({
      name: 'Candidate 1',
      party: party1
    });
    const party2 = new Party({
      name: 'Party 2',
      description: 'Description for party 2',
    });
    const candidate2 = new Candidate({
      name: 'Candidate 2',
      party: party2
    });
    Party.insertMany([party1, party2], () => {
      Candidate.insertMany([candidate1, candidate2], () => {
        done();
      });
    });
  });

  afterEach((done) => {
    Candidate.collection.drop(() => {
      Party.collection.drop(() => {
        done();
      });
    });
  });

  it('should list all candidates and their parties on /api/v1/candidates GET', (done) => {
    chai.request(app)
      .get('/api/v1/candidates')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        expect(res.body).to.have.lengthOf(2);
        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('name');
        res.body[0].should.have.property('party');
        res.body[0].name.should.equal('Candidate 1');
        res.body[0].party.should.be.a('object');
        res.body[0].party.should.have.property('_id');
        res.body[0].party.should.have.property('name');
        res.body[0].party.should.have.property('description');
        res.body[0].party.name.should.equal('Party 1');
        res.body[0].party.description.should.equal('Description for party 1');

        res.body[1].should.have.property('_id');
        res.body[1].should.have.property('name');
        res.body[1].should.have.property('party');
        res.body[1].name.should.equal('Candidate 2');
        res.body[1].party.should.be.a('object');
        res.body[1].party.should.have.property('_id');
        res.body[1].party.should.have.property('name');
        res.body[1].party.should.have.property('description');
        res.body[1].party.name.should.equal('Party 2');
        res.body[1].party.description.should.equal('Description for party 2');
        done();
      });
    });
  });
