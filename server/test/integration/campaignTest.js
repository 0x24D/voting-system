import chai from 'chai';
import { expect } from 'chai';
import { assert } from 'chai';
import app from '../../app';

import Campaign from '../../src/models/campaignModel';
import Candidate from '../../src/models/candidateModel';
import Constituency from '../../src/models/constituencyModel';
import Party from '../../src/models/partyModel';

const chaiHttp = require('chai-http');

const should = chai.should();

chai.use(chaiHttp);

describe('Campaign tests', () => {
  let campaign1Id;
  let campaign2Id;
  let candidate1Id;
  let constituency1Id;
  let constituency2Id;
  beforeEach((done) => {
    const party1 = new Party({
      name: 'Party 1',
      description: 'Description for party 1',
    });
    const candidate1 = new Candidate({
      name: 'Candidate 1',
      party: party1
    });
    candidate1Id = String(candidate1._id);
    const constituency1 = new Constituency({
      name: 'Constituency',
      minimum_age: 18,
      voting_system: 'FPTP'
    });
    constituency1Id = String(constituency1._id);
    const campaign1 = new Campaign({
      name: 'Campaign 1',
      candidates: [candidate1],
      votes: [{[candidate1Id]: 0}],
      type: 'Campaign Type',
      active: 'Active',
      constituencies: [constituency1],
      end_date: Date.now() + 1,
    });
    campaign1Id = String(campaign1._id);
    const constituency2 = new Constituency({
      name: 'Constituency 2',
      minimum_age: 16,
      voting_system: 'FPTP'
    });
    constituency2Id = String(constituency2._id);
    const campaign2 = new Campaign({
      name: 'Campaign 2',
      candidates: [candidate1],
      votes: [{[candidate1Id]: 0}],
      type: 'Campaign Type',
      active: 'Inactive',
      constituencies: [constituency2],
      end_date: Date.now(),
    });
    campaign2Id = String(campaign2._id);


    Constituency.insertMany([constituency1, constituency2],() => {
      party1.save(() => {
        candidate1.save(() => {
          Campaign.insertMany([campaign1, campaign2], () => {
            done();
          });
        });
      });
    });
  });

  afterEach((done) => {
    Campaign.collection.drop(() => {
      Constituency.collection.drop(() => {
        Candidate.collection.drop(() => {
          Party.collection.drop(() => {
            done();
          });
        });
      });
    });
  });

  it('should return all campaigns on /api/v1/campaigns GET', (done) => {
    chai.request(app)
      .get('/api/v1/campaigns')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        expect(res.body).to.have.lengthOf(2);
        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('name');
        res.body[0].should.have.property('total_votes');
        res.body[0].should.have.property('candidates');
        res.body[0].should.have.property('votes');
        res.body[0].should.have.property('type');
        res.body[0].should.have.property('active');
        res.body[0].should.have.property('constituencies');
        res.body[0].should.have.property('start_date');
        res.body[0].should.have.property('end_date');
        res.body[0]._id.should.equal(campaign1Id);
        res.body[0].name.should.equal('Campaign 1');
        res.body[0].total_votes.should.equal(0);
        res.body[0].candidates.should.be.a('array');
        expect(res.body[0].candidates).to.have.lengthOf(1);
        res.body[0].candidates[0].should.equal(candidate1Id);
        res.body[0].votes.should.be.a('array');
        expect(res.body[0].votes).to.have.lengthOf(1);
        res.body[0].votes[0].should.be.a('object');
        res.body[0].votes[0].should.have.property(candidate1Id);
        res.body[0].votes[0][candidate1Id].should.have.equal(0);
        res.body[0].type.should.equal('Campaign Type');
        res.body[0].active.should.equal('Active');
        res.body[0].constituencies.should.be.a('array');
        expect(res.body[0].constituencies).to.have.lengthOf(1);
        res.body[0].constituencies[0].should.equal(constituency1Id);
        res.body[1].should.have.property('_id');
        res.body[1].should.have.property('name');
        res.body[1].should.have.property('total_votes');
        res.body[1].should.have.property('candidates');
        res.body[1].should.have.property('votes');
        res.body[1].should.have.property('type');
        res.body[1].should.have.property('active');
        res.body[1].should.have.property('constituencies');
        res.body[1].should.have.property('start_date');
        res.body[1].should.have.property('end_date');
        res.body[1]._id.should.equal(campaign2Id);
        res.body[1].name.should.equal('Campaign 2');
        res.body[1].total_votes.should.equal(0);
        res.body[1].candidates.should.be.a('array');
        expect(res.body[1].candidates).to.have.lengthOf(1);
        res.body[1].candidates[0].should.equal(candidate1Id);
        res.body[1].votes.should.be.a('array');
        expect(res.body[0].votes).to.have.lengthOf(1);
        res.body[1].votes[0].should.be.a('object');
        res.body[1].votes[0].should.have.property(candidate1Id);
        res.body[1].votes[0][candidate1Id].should.have.equal(0);
        res.body[1].type.should.equal('Campaign Type');
        res.body[1].active.should.equal('Inactive');
        res.body[1].constituencies.should.be.a('array');
        expect(res.body[1].constituencies).to.have.lengthOf(1);
        res.body[1].constituencies[0].should.equal(constituency2Id);
        done();
      });
    });

    it('should list 1 campaign on /api/v1/campaigns?constituency=<constituency> GET', (done) => {
      chai.request(app)
        .get(`/api/v1/campaigns?constituency=${constituency1Id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          expect(res.body).to.have.lengthOf(1);
          res.body[0].should.have.property('_id');
          res.body[0].should.have.property('name');
          res.body[0].should.have.property('total_votes');
          res.body[0].should.have.property('candidates');
          res.body[0].should.have.property('votes');
          res.body[0].should.have.property('type');
          res.body[0].should.have.property('active');
          res.body[0].should.have.property('constituencies');
          res.body[0].should.have.property('start_date');
          res.body[0].should.have.property('end_date');
          res.body[0]._id.should.equal(campaign1Id);
          res.body[0].name.should.equal('Campaign 1');
          res.body[0].total_votes.should.equal(0);
          res.body[0].candidates.should.be.a('array');
          expect(res.body[0].candidates).to.have.lengthOf(1);
          res.body[0].candidates[0].should.equal(candidate1Id);
          res.body[0].votes.should.be.a('array');
          expect(res.body[0].votes).to.have.lengthOf(1);
          res.body[0].votes[0].should.be.a('object');
          res.body[0].votes[0].should.have.property(candidate1Id);
          res.body[0].votes[0][candidate1Id].should.have.equal(0);
          res.body[0].type.should.equal('Campaign Type');
          res.body[0].active.should.equal('Active');
          res.body[0].constituencies.should.be.a('array');
          expect(res.body[0].constituencies).to.have.lengthOf(1);
          res.body[0].constituencies[0].should.equal(constituency1Id);
          done();
        });
      });

    it('should list 1 campaign on /api/v1/campaigns/<id> GET', (done) => {
      chai.request(app)
        .get(`/api/v1/campaigns/${campaign1Id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.should.have.property('name');
          res.body.should.have.property('total_votes');
          res.body.should.have.property('candidates');
          res.body.should.have.property('votes');
          res.body.should.have.property('type');
          res.body.should.have.property('active');
          res.body.should.have.property('constituencies');
          res.body.should.have.property('start_date');
          res.body.should.have.property('end_date');
          res.body._id.should.equal(campaign1Id);
          res.body.name.should.equal('Campaign 1');
          res.body.total_votes.should.equal(0);
          res.body.candidates.should.be.a('array');
          expect(res.body.candidates).to.have.lengthOf(1);
          res.body.candidates[0].should.equal(candidate1Id);
          res.body.votes.should.be.a('array');
          expect(res.body.votes).to.have.lengthOf(1);
          res.body.votes[0].should.be.a('object');
          res.body.votes[0].should.have.property(candidate1Id);
          res.body.votes[0][candidate1Id].should.have.equal(0);
          res.body.type.should.equal('Campaign Type');
          res.body.active.should.equal('Active');
          res.body.constituencies.should.be.a('array');
          expect(res.body.constituencies).to.have.lengthOf(1);
          res.body.constituencies[0].should.equal(constituency1Id);
          done();
        });
    });
  });
