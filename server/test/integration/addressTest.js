import chai from 'chai';
import { expect } from 'chai';
import { assert } from 'chai';
import app from '../../app';

import Constituency from '../../src/models/constituencyModel';
import Address from '../../src/models/addressModel';

const chaiHttp = require('chai-http');

const should = chai.should();

chai.use(chaiHttp);

describe('Address tests', () => {
  let address1Id;
  let constituency1Id;
  let constituency2Id;
  let address2Id;
  beforeEach((done) => {
    const constituency1 = new Constituency({
      name: 'constituency 1',
      minimum_age: 18,
      voting_system: 'fptp',
    });
    constituency1Id = String(constituency1._id);

    const address1 = new Address({
      lineOne: 'address line 1',
      lineTwo: 'address line 2',
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
      lineOne: 'address line 2',
      lineTwo: 'address line 2',
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

    afterEach((done) => {
      Address.collection.drop(() => {
        done();
      });
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
        res.body.should.have.property('lineOne');
        res.body.should.have.property('lineTwo');
        res.body.should.have.property('town');
        res.body.should.have.property('county');
        res.body.should.have.property('country');
        res.body.should.have.property('postcode');
        res.body.should.have.property('constituency');
        res.body._id.should.equal(address1Id);
        res.body.lineOne.should.equal('address line 1');
        res.body.lineTwo.should.equal('address line 2');
        res.body.town.should.equal('town');
        res.body.county.should.equal('county');
        res.body.country.should.equal('country');
        res.body.postcode.should.equal('postcode');
        res.body.constituency.should.equal(constituency1Id);
        done();
      });
  });
});
