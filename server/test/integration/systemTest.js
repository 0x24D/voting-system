import chai, { expect, assert } from 'chai';
import app from '../../app';

import System from '../../src/models/systemModel';
import PollingStation from '../../src/models/pollingStationModel';
import Campaign from '../../src/models/campaignModel';

const chaiHttp = require('chai-http');

const should = chai.should();

chai.use(chaiHttp);
describe('System tests', () => {
  let system1Id;
  let station1Id;
  let station2Id;
  let campaign1Id;
  let campaign2Id;
  beforeEach((done) => {
    const station1 = new PollingStation({
      close_time: Date.now() + 1,
    });
    station1Id = String(station1._id);
    const campaign1 = new Campaign({
      name: 'Campaign 1',
      type: 'Campaign Type',
      active: 'live',
      end_date: Date.now() + 1,
    });
    campaign1Id = String(campaign1._id);
    const system1 = new System({
      station: station1,
      voters: 'all',
      campaigns: campaign1,
    });
    system1Id = String(system1._id);
    const station2 = new PollingStation({
      close_time: Date.now() + 1,
    });
    station2Id = String(station2._id);
    const campaign2 = new Campaign({
      name: 'Campaign 2',
      type: 'Campaign Type',
      active: 'live',
      end_date: Date.now() + 1,
    });
    campaign2Id = String(campaign2._id);
    const system2 = new System({
      station: station2,
      voters: 'all',
      campaigns: campaign2,
    });
    PollingStation.insertMany([station1, station2], () => {
      Campaign.insertMany([campaign1, campaign2], () => {
        System.insertMany([system1, system2], () => {
          done();
        });
      });
    });
  });

  afterEach((done) => {
    System.collection.drop(() => {
      Campaign.collection.drop(() => {
        PollingStation.collection.drop(() => {
          done();
        });
      });
    });
  });
  it('should list all system and their campaigns and stations on /api/v1/systems GET', (done) => {
    chai.request(app)
      .get('/api/v1/systems')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        expect(res.body).to.have.lengthOf(2);
        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('station');
        res.body[0].should.have.property('voters');
        res.body[0].should.have.property('campaigns');
        res.body[0].should.have.property('language');
        res.body[0].station.should.equal(station1Id);
        res.body[0].voters.should.equal('all');
        expect(res.body[0].campaigns).to.have.lengthOf(1);
        res.body[0].campaigns[0].should.equal(campaign1Id);
        res.body[0].language.should.equal('en-gb');

        res.body[1].should.have.property('_id');
        res.body[1].should.have.property('station');
        res.body[1].should.have.property('voters');
        res.body[1].should.have.property('campaigns');
        res.body[1].should.have.property('language');
        res.body[1].station.should.equal(station2Id);
        res.body[1].voters.should.equal('all');
        expect(res.body[1].campaigns).to.have.lengthOf(1);
        res.body[1].campaigns[0].should.equal(campaign2Id);
        res.body[1].language.should.equal('en-gb');
        done();
      });
  });

  it('should list 1 system on /api/v1/systems/<id> GET', (done) => {
    chai.request(app)
      .get(`/api/v1/systems/${system1Id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('station');
        res.body.should.have.property('voters');
        res.body.should.have.property('campaigns');
        res.body.should.have.property('language');
        res.body.station.should.equal(station1Id);
        res.body.voters.should.equal('all');
        expect(res.body.campaigns).to.have.lengthOf(1);
        res.body.campaigns[0].should.equal(campaign1Id);
        res.body.language.should.equal('en-gb');
        done();
      });
  });
});
