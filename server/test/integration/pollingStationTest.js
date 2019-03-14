import chai, { expect, assert } from 'chai';
import app from '../../app';

import PollingStation from '../../src/models/pollingStationModel';
import Address from '../../src/models/addressModel';


const chaiHttp = require('chai-http');

const should = chai.should();

chai.use(chaiHttp);

describe('PollingStation tests', () => {
  let address1Id;
  let address2Id;
  let pollingStation1Id;
  let pollingStation2Id;

  beforeEach((done) => {
    const address1 = new Address({
      line_one: 'address line 1',
      line_two: 'address line 2',
      town: 'town',
      county: 'county',
      country: 'country',
      postcode: 'postcode',
    });
    address1Id = String(address1._id);

    const pollingStation1 = new PollingStation({
      address: address1,
      close_time: Date.now() + 1,
    });
    pollingStation1Id = String(pollingStation1._id);

    const address2 = new Address({
      line_one: 'address line 1',
      line_two: 'address line 2',
      town: 'town',
      county: 'county',
      country: 'country',
      postcode: 'postcode',
    });
    address2Id = String(address2._id);

    const pollingStation2 = new PollingStation({
      address: address2,
      close_time: Date.now() + 1,
    });
    pollingStation2Id = String(pollingStation2._id);

    PollingStation.insertMany([pollingStation1, pollingStation2], () => {
      done();
    });
  });

  afterEach((done) => {
    PollingStation.collection.drop(() => {
      done();
    });
  });

  it('should list 1 polling station on /api/v1/pollingStations/<id> GET', (done) => {
    chai.request(app)
      .get(`/api/v1/pollingStations/${pollingStation1Id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('address');
        res.body.should.have.property('open_time');
        res.body.should.have.property('close_time');
        res.body._id.should.equal(pollingStation1Id);
        res.body.address.should.equal(address1Id);
        done();
      });
  });

  it('should list all polling stations on /api/v1/pollingStations GET', (done) => {
    chai.request(app)
      .get('/api/v1/pollingStations')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        expect(res.body).to.have.lengthOf(2);
        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('address');
        res.body[0].should.have.property('open_time');
        res.body[0].should.have.property('close_time');
        res.body[0]._id.should.equal(pollingStation1Id);
        res.body[0].address.should.equal(address1Id);

        res.body[1].should.have.property('_id');
        res.body[1].should.have.property('address');
        res.body[1].should.have.property('open_time');
        res.body[1].should.have.property('close_time');
        res.body[1]._id.should.equal(pollingStation2Id);
        res.body[1].address.should.equal(address2Id);
        done();
      });
  });
});
