import { expect } from 'chai';

import System from '../../src/models/systemModel';

describe('system', () => {
  it('should be no error as station is defaulted', (done) => {
    const s = new System();

    s.validate((err) => {
      expect(err).to.not.exist;
      done();
    });
  });

  it('should be no error as voters is defaulted', (done) => {
    const s = new System();

    s.validate((err) => {
      expect(err).to.not.exist;
      done();
    });
  });

  it('should be no error as campaigns is defaulted', (done) => {
    const s = new System();

    s.validate((err) => {
      expect(err).to.not.exist;
      done();
    });
  });

  it('should be no error as language is defaulted', (done) => {
    const s = new System();

    s.validate((err) => {
      expect(err).to.not.exist;
      done();
    });
  });
});
