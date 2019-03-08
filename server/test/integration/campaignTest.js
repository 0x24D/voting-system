import chai, { expect, assert } from 'chai';
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
  let candidate2Id;
  let constituency1Id;
  let constituency2Id;
  beforeEach((done) => {
    const party1 = new Party({
      name: 'Party 1',
      description: 'Description for party 1',
    });
    const party2 = new Party({
      name: 'Party 2',
      description: 'Description for party 2',
    });
    const candidate1 = new Candidate({
      name: 'Candidate 1',
      party: party1,
    });
    candidate1Id = String(candidate1._id);
    const candidate2 = new Candidate({
      name: 'Candidate 2',
      party: party2,
    });
    candidate2Id = String(candidate2._id);
    const constituency1 = new Constituency({
      name: 'Constituency',
      minimum_age: 18,
      voting_system: 'FPTP',
    });
    constituency1Id = String(constituency1._id);
    const campaign1 = new Campaign({
      name: 'Campaign 1',
      candidates: [candidate1, candidate2],
      votes: [{ [candidate1Id]: 0 }, { [candidate2Id]: 0 }],
      campaign_type: 'Campaign Type',
      active: 'Active',
      constituencies: [constituency1],
      end_date: Date.now() + 86400000,
    });
    campaign1Id = String(campaign1._id);
    const constituency2 = new Constituency({
      name: 'Constituency 2',
      minimum_age: 16,
      voting_system: 'FPTP',
    });
    constituency2Id = String(constituency2._id);
    const campaign2 = new Campaign({
      name: 'Campaign 2',
      candidates: [candidate1],
      votes: [{ [candidate1Id]: 0 }],
      campaign_type: 'Campaign Type',
      active: 'Inactive',
      constituencies: [constituency2],
      end_date: Date.now(),
    });
    campaign2Id = String(campaign2._id);


    Constituency.insertMany([constituency1, constituency2], () => {
      Party.insertMany([party1, party2], () => {
        Candidate.insertMany([candidate1, candidate2], () => {
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
        res.body[0].should.have.property('campaign_type');
        res.body[0].should.have.property('active');
        res.body[0].should.have.property('constituencies');
        res.body[0].should.have.property('start_date');
        res.body[0].should.have.property('end_date');
        res.body[0]._id.should.equal(campaign1Id);
        res.body[0].name.should.equal('Campaign 1');
        res.body[0].total_votes.should.equal(0);
        res.body[0].candidates.should.be.a('array');
        expect(res.body[0].candidates).to.have.lengthOf(2);
        res.body[0].candidates[0].should.equal(candidate1Id);
        res.body[0].candidates[1].should.equal(candidate2Id);
        res.body[0].votes.should.be.a('array');
        expect(res.body[0].votes).to.have.lengthOf(2);
        res.body[0].votes[0].should.be.a('object');
        res.body[0].votes[0].should.have.property(candidate1Id);
        res.body[0].votes[0][candidate1Id].should.have.equal(0);
        res.body[0].votes[1].should.be.a('object');
        res.body[0].votes[1].should.have.property(candidate2Id);
        res.body[0].votes[1][candidate2Id].should.have.equal(0);
        res.body[0].campaign_type.should.equal('Campaign Type');
        res.body[0].active.should.equal('Active');
        res.body[0].constituencies.should.be.a('array');
        expect(res.body[0].constituencies).to.have.lengthOf(1);
        res.body[0].constituencies[0].should.equal(constituency1Id);
        res.body[1].should.have.property('_id');
        res.body[1].should.have.property('name');
        res.body[1].should.have.property('total_votes');
        res.body[1].should.have.property('candidates');
        res.body[1].should.have.property('votes');
        res.body[1].should.have.property('campaign_type');
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
        expect(res.body[1].votes).to.have.lengthOf(1);
        res.body[1].votes[0].should.be.a('object');
        res.body[1].votes[0].should.have.property(candidate1Id);
        res.body[1].votes[0][candidate1Id].should.have.equal(0);
        res.body[1].campaign_type.should.equal('Campaign Type');
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
        res.body[0].should.have.property('campaign_type');
        res.body[0].should.have.property('active');
        res.body[0].should.have.property('constituencies');
        res.body[0].should.have.property('start_date');
        res.body[0].should.have.property('end_date');
        res.body[0]._id.should.equal(campaign1Id);
        res.body[0].name.should.equal('Campaign 1');
        res.body[0].total_votes.should.equal(0);
        res.body[0].candidates.should.be.a('array');
        expect(res.body[0].candidates).to.have.lengthOf(2);
        res.body[0].candidates[0].should.equal(candidate1Id);
        res.body[0].candidates[1].should.equal(candidate2Id);
        res.body[0].votes.should.be.a('array');
        expect(res.body[0].votes).to.have.lengthOf(2);
        res.body[0].votes[0].should.be.a('object');
        res.body[0].votes[0].should.have.property(candidate1Id);
        res.body[0].votes[0][candidate1Id].should.have.equal(0);
        res.body[0].votes[1].should.be.a('object');
        res.body[0].votes[1].should.have.property(candidate2Id);
        res.body[0].votes[1][candidate2Id].should.have.equal(0);
        res.body[0].campaign_type.should.equal('Campaign Type');
        res.body[0].active.should.equal('Active');
        res.body[0].constituencies.should.be.a('array');
        expect(res.body[0].constituencies).to.have.lengthOf(1);
        res.body[0].constituencies[0].should.equal(constituency1Id);
        done();
      });
  });

  it('should add 1 campaign on /api/v1/campaigns POST', (done) => {
    const candidate3 = new Candidate({
      name: 'Candidate 3',
    });
    const candidate3Id = String(candidate3._id);
    const candidate4 = new Candidate({
      name: 'Candidate 4',
    });
    const candidate4Id = String(candidate4._id);
    const constituency3 = new Constituency({
      name: 'Constituency 3',
      minimum_age: 18,
      voting_system: 'FPTP',
    });
    const constituency3Id = String(constituency3._id);
    const constituency4 = new Constituency({
      name: 'Constituency 4',
      minimum_age: 18,
      voting_system: 'FPTP',
    });
    const constituency4Id = String(constituency4._id);

    Candidate.insertMany([candidate3, candidate4]);
    Constituency.insertMany([constituency3, constituency4]);

    chai.request(app)
      .post('/api/v1/campaigns')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        name: 'Campaign 3',
        candidates: [candidate3Id, candidate4Id],
        votes: [{ [candidate3Id]: 0 }, { [candidate4Id]: 0 }],
        campaign_type: 'Campaign Type',
        active: 'Active',
        constituencies: [constituency3Id, constituency4Id],
        end_date: Date.now() + 86400000,
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('name');
        res.body.should.have.property('total_votes');
        res.body.should.have.property('candidates');
        res.body.should.have.property('votes');
        res.body.should.have.property('campaign_type');
        res.body.should.have.property('active');
        res.body.should.have.property('constituencies');
        res.body.should.have.property('start_date');
        res.body.should.have.property('end_date');
        res.body.name.should.equal('Campaign 3');
        res.body.total_votes.should.equal(0);
        res.body.candidates.should.be.a('array');
        expect(res.body.candidates).to.have.lengthOf(2);
        res.body.candidates[0].should.equal(candidate3Id);
        res.body.candidates[1].should.equal(candidate4Id);
        res.body.votes.should.be.a('array');
        expect(res.body.votes).to.have.lengthOf(2);
        res.body.votes[0].should.be.a('object');
        res.body.votes[0].should.have.property(candidate3Id);
        console.log(typeof res.body.votes[0][candidate3Id]);
        res.body.votes[0][candidate3Id].should.have.equal(0);
        res.body.votes[1].should.be.a('object');
        res.body.votes[1].should.have.property(candidate4Id);
        res.body.votes[1][candidate4Id].should.have.equal(0);
        res.body.campaign_type.should.equal('Campaign Type');
        res.body.active.should.equal('Active');
        res.body.constituencies.should.be.a('array');
        expect(res.body.constituencies).to.have.lengthOf(2);
        res.body.constituencies[0].should.equal(constituency3Id);
        res.body.constituencies[1].should.equal(constituency4Id);
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
        res.body.should.have.property('campaign_type');
        res.body.should.have.property('active');
        res.body.should.have.property('constituencies');
        res.body.should.have.property('start_date');
        res.body.should.have.property('end_date');

        res.body._id.should.equal(campaign1Id);

        res.body.name.should.equal('Campaign 1');
        res.body.total_votes.should.equal(0);
        res.body.candidates.should.be.a('array');
        expect(res.body.candidates).to.have.lengthOf(2);
        res.body.candidates[0].should.equal(candidate1Id);
        res.body.candidates[1].should.equal(candidate2Id);
        res.body.votes.should.be.a('array');
        expect(res.body.votes).to.have.lengthOf(2);
        res.body.votes[0].should.be.a('object');
        res.body.votes[0].should.have.property(candidate1Id);
        res.body.votes[0][candidate1Id].should.have.equal(0);
        res.body.votes[1].should.be.a('object');
        res.body.votes[1].should.have.property(candidate2Id);
        res.body.votes[1][candidate2Id].should.have.equal(0);
        res.body.campaign_type.should.equal('Campaign Type');
        res.body.active.should.equal('Active');
        res.body.constituencies.should.be.a('array');
        expect(res.body.constituencies).to.have.lengthOf(1);
        res.body.constituencies[0].should.equal(constituency1Id);
        done();
      });
  });

  it('should update 1 campaign on /api/v1/campaigns/<id> PUT', (done) => {
    chai.request(app)
      .put(`/api/v1/campaigns/${campaign1Id}`)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        total_votes: '++', // increment total_votes
        votes: candidate1Id, // add vote to candidate1
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('name');
        res.body.should.have.property('total_votes');
        res.body.should.have.property('candidates');
        res.body.should.have.property('votes');
        res.body.should.have.property('campaign_type');
        res.body.should.have.property('active');
        res.body.should.have.property('constituencies');
        res.body.should.have.property('start_date');
        res.body.should.have.property('end_date');
        res.body._id.should.equal(campaign1Id);
        res.body.name.should.equal('Campaign 1');
        res.body.total_votes.should.equal(1);
        res.body.candidates.should.be.a('array');
        expect(res.body.candidates).to.have.lengthOf(2);
        res.body.candidates[0].should.equal(candidate1Id);
        res.body.candidates[1].should.equal(candidate2Id);
        res.body.votes.should.be.a('array');
        expect(res.body.votes).to.have.lengthOf(2);
        res.body.votes[0].should.be.a('object');
        res.body.votes[0].should.have.property(candidate1Id);
        res.body.votes[0][candidate1Id].should.have.equal(1);
        res.body.votes[1].should.be.a('object');
        res.body.votes[1].should.have.property(candidate2Id);
        res.body.votes[1][candidate2Id].should.have.equal(0);
        res.body.campaign_type.should.equal('Campaign Type');
        res.body.active.should.equal('Active');
        res.body.constituencies.should.be.a('array');
        expect(res.body.constituencies).to.have.lengthOf(1);
        res.body.constituencies[0].should.equal(constituency1Id);
        done();
      });
  });

  it('should update only 1 campaign on /api/v1/campaigns/<id> PUT', (done) => {
    chai.request(app)
      .put(`/api/v1/campaigns/${campaign1Id}`)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        total_votes: '++', // increment total_votes
        votes: candidate1Id, // add vote to candidate1
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('name');
        res.body.should.have.property('total_votes');
        res.body.should.have.property('candidates');
        res.body.should.have.property('votes');
        res.body.should.have.property('campaign_type');
        res.body.should.have.property('active');
        res.body.should.have.property('constituencies');
        res.body.should.have.property('start_date');
        res.body.should.have.property('end_date');
        res.body._id.should.equal(campaign1Id);
        res.body.name.should.equal('Campaign 1');
        res.body.total_votes.should.equal(1);
        res.body.candidates.should.be.a('array');
        expect(res.body.candidates).to.have.lengthOf(2);
        res.body.candidates[0].should.equal(candidate1Id);
        res.body.candidates[1].should.equal(candidate2Id);
        res.body.votes.should.be.a('array');
        expect(res.body.votes).to.have.lengthOf(2);
        res.body.votes[0].should.be.a('object');
        res.body.votes[0].should.have.property(candidate1Id);
        res.body.votes[0][candidate1Id].should.have.equal(1);
        res.body.votes[1].should.be.a('object');
        res.body.votes[1].should.have.property(candidate2Id);
        res.body.votes[1][candidate2Id].should.have.equal(0);
        res.body.campaign_type.should.equal('Campaign Type');
        res.body.active.should.equal('Active');
        res.body.constituencies.should.be.a('array');
        expect(res.body.constituencies).to.have.lengthOf(1);
        res.body.constituencies[0].should.equal(constituency1Id);
        done();
      });
  });
});
