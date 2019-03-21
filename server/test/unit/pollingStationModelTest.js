import { expect } from 'chai';

import PollingStation from '../../src/models/pollingStationModel';

describe('pollingStation', () => {
  it('should be no errors as address is defaulted', (done) => {
    const p = new PollingStation();

    p.validate((err) => {
      expect(err).to.not.exist;
      done();
    });
  });
});
