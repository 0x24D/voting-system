import chai, { expect, assert } from 'chai';
import app from '../../app';

import Constituency from '../../src/models/constituencyModel';
import Address from '../../src/models/addressModel';

const chaiHttp = require('chai-http');

const should = chai.should();

chai.use(chaiHttp);

describe('Address tests', () => {
  let address1Id;
  let address2Id;
  let constituency1Id;
  let constituency2Id;
  beforeEach((done) => {
    const constituency1 = new Constituency({
      name: 'constituency 1',
      minimum_age: 18,
      voting_system: 'fptp',
    });
    constituency1Id = String(constituency1._id);

    const address1 = new Address({
      line_one: 'address line 1',
      line_two: 'address line 2',
      town: 'town',
      county: 'county',
      country: 'country',
      postcode: 'postcode',
      constituency: constituency1,
    });
    address1Id = String(address1._id);

    const constituency2 = new Constituency({
      name: 'constituency 2',
      minimum_age: 18,
      voting_system: 'fptp',
    });
    constituency2Id = String(constituency2._id);

    const address2 = new Address({
      line_one: 'address line 3',
      line_two: 'address line 4',
      town: 'town 2',
      county: 'county 2',
      country: 'country 2',
      postcode: 'postcode 2',
      constituency: constituency2,
    });
    address2Id = String(address2._id);

    Address.insertMany([address1, address2], () => {
      done();
    });
  });

  afterEach((done) => {
    Address.collection.drop(() => {
      done();
    });
  });

  it('should list 1 address on /api/v1/addresses/<id> GET', (done) => {
    chai.request(app)
      .get(`/api/v1/addresses/${address1Id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('line_one');
        res.body.should.have.property('line_two');
        res.body.should.have.property('town');
        res.body.should.have.property('county');
        res.body.should.have.property('country');
        res.body.should.have.property('postcode');
        res.body.should.have.property('constituency');
        res.body._id.should.equal(address1Id);
        res.body.line_one.should.equal('address line 1');
        res.body.line_two.should.equal('address line 2');
        res.body.town.should.equal('town');
        res.body.county.should.equal('county');
        res.body.country.should.equal('country');
        res.body.postcode.should.equal('postcode');
        res.body.constituency.should.equal(constituency1Id);
        done();
      });
  });

  it('should add 1 address on /api/v1/addresses POST', (done) => {
    chai.request(app)
      .post('/api/v1/addresses')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        line_one: 'Line 1',
        line_two: 'Line 2',
        town: 'Town',
        county: 'County',
        country: 'Country',
        postcode: 'Postcode',
        constituency: constituency1Id,
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('line_one');
        res.body.should.have.property('line_two');
        res.body.should.have.property('town');
        res.body.should.have.property('county');
        res.body.should.have.property('country');
        res.body.should.have.property('postcode');
        res.body.should.have.property('constituency');
        res.body.line_one.should.equal('Line 1');
        res.body.line_two.should.equal('Line 2');
        res.body.town.should.equal('Town');
        res.body.county.should.equal('County');
        res.body.country.should.equal('Country');
        res.body.postcode.should.equal('Postcode');
        res.body.constituency.should.equal(constituency1Id);
        done();
      });
  });

  it('should list all addresses on /api/v1/addresses GET', (done) => {
    chai.request(app)
      .get('/api/v1/addresses')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        expect(res.body).to.have.lengthOf(2);
        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('line_one');
        res.body[0].should.have.property('line_two');
        res.body[0].should.have.property('town');
        res.body[0].should.have.property('county');
        res.body[0].should.have.property('country');
        res.body[0].should.have.property('postcode');
        res.body[0].should.have.property('constituency');
        res.body[0]._id.should.equal(address1Id);
        res.body[0].line_one.should.equal('address line 1');
        res.body[0].line_two.should.equal('address line 2');
        res.body[0].town.should.equal('town');
        res.body[0].county.should.equal('county');
        res.body[0].country.should.equal('country');
        res.body[0].postcode.should.equal('postcode');
        res.body[0].constituency.should.equal(constituency1Id);

        res.body[1].should.have.property('_id');
        res.body[1].should.have.property('line_one');
        res.body[1].should.have.property('line_two');
        res.body[1].should.have.property('town');
        res.body[1].should.have.property('county');
        res.body[1].should.have.property('country');
        res.body[1].should.have.property('postcode');
        res.body[1].should.have.property('constituency');
        res.body[1]._id.should.equal(address2Id);
        res.body[1].line_one.should.equal('address line 3');
        res.body[1].line_two.should.equal('address line 4');
        res.body[1].town.should.equal('town 2');
        res.body[1].county.should.equal('county 2');
        res.body[1].country.should.equal('country 2');
        res.body[1].postcode.should.equal('postcode 2');
        res.body[1].constituency.should.equal(constituency2Id);
        done();
      });
  });
});
