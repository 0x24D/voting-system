import mongoose from 'mongoose';
import { expect } from 'chai';

import PollingStation from '../../src/models/pollingStationModel';

describe('pollingStation', () => {
  it('should be invalid if address is empty', (done) => {
    const p = new PollingStation();

    p.validate((err) => {
      expect(err.errors.address).to.not.exist;
      done();
    });
  });
});

describe('pollingStation', () => {
  it('should be invalid if openTime is empty', (done) => {
    const p = new PollingStation();

    p.validate((err) => {
      expect(err.errors.openTime).to.not.exist;
      done();
    });
  });
});

describe('pollingStation', () => {
  it('should be invalid if closeTime is empty', (done) => {
    const p = new PollingStation();

    p.validate((err) => {
      expect(err.errors.closeTime).to.exist;
      done();
    });
  });
});
