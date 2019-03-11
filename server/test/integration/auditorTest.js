import chai, { expect, assert } from 'chai';
import app from '../../app';

import PollingStation from '../../src/models/pollingStationModel';
import Auditor from '../../src/models/auditorModel';

const chaiHttp = require('chai-http');

const should = chai.should();

chai.use(chaiHttp);

// Creates a dummy auditor and polling station and ensures the auditor routes works appropriately
describe('Auditor tests', () => {
  let auditorId1;
  let pollingStationId1;
  beforeEach((done) => {
    const pollingStation1 = new PollingStation({
      address: null,
      close_time: new Date('01/04/19'),
    });
    pollingStationId1 = String(pollingStation1._id);
    const auditor1 = new Auditor({
      username: 'auditor1',
      name: 'Auditor 1',
      email: 'auditor1@hotmail.com',
      password: 'auditor1',
      roles: 'auditor',
      polling_station: pollingStation1,
    });
    auditorId1 = String(auditor1._id);
    auditor1.save(() => {
      done();
    });
  });

  afterEach((done) => {
    Auditor.collection.drop(() => {
      done();
    });
  });

  it('should list 1 auditor on /api/v1/auditors/<id> GET', (done) => {
    chai.request(app)
      .get(`/api/v1/auditors/${auditorId1}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('username');
        res.body.should.have.property('name');
        res.body.should.have.property('email');
        res.body.should.have.property('password');
        res.body.should.have.property('roles');
        res.body.should.have.property('polling_station');
        res.body._id.should.equal(auditorId1);
        res.body.username.should.equal('auditor1');
        res.body.name.should.equal('Auditor 1');
        res.body.email.should.equal('auditor1@hotmail.com');
        res.body.password.should.equal('auditor1');
        res.body.roles.should.equal('auditor');
        res.body.polling_station.should.equal(pollingStationId1);
        done();
      });
  });
});
