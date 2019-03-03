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
  it('should be invalid if open_time is empty', (done) => {
    const p = new PollingStation();

    p.validate((err) => {
      expect(err.errors.open_time).to.not.exist;
      done();
    });
  });
});

describe('pollingStation', () => {
  it('should be invalid if close_time is empty', (done) => {
    const p = new PollingStation();

    p.validate((err) => {
      expect(err.errors.close_time).to.exist;
      done();
    });
  });
});
