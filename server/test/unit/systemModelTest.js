import { expect } from 'chai';

import System from '../../src/models/systemModel';

describe('system', () => {
  it('should be invalid if station is empty', (done) => {
    const s = new System();

    s.validate((err) => {
      expect(err.errors.station).to.not.exist;
      done();
    });
  });
});

describe('system', () => {
  it('should be invalid if voters is empty', (done) => {
    const s = new System();

    s.validate((err) => {
      expect(err.errors.voters).to.exist;
      done();
    });
  });
});

describe('system', () => {
  it('should be invalid if campaigns is empty', (done) => {
    const s = new System();

    s.validate((err) => {
      expect(err.errors.campaigns).to.not.exist;
      done();
    });
  });
});

describe('system', () => {
  it('should be invalid if language is empty', (done) => {
    const s = new System();

    s.validate((err) => {
      expect(err.errors.county).to.not.exist;
      done();
    });
  });
});
