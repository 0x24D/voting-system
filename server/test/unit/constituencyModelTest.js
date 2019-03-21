import { expect } from 'chai';

import Constituency from '../../src/models/constituencyModel';

describe('constituency', () => {
  it('should be invalid if name is empty', (done) => {
    const c = new Constituency();

    c.validate((err) => {
      expect(err.errors.name).to.exist;
      done();
    });
  });

  it('should be invalid if minimum_age is empty', (done) => {
    const c = new Constituency();

    c.validate((err) => {
      expect(err.errors.minimum_age).to.exist;
      done();
    });
  });

  it('should be invalid if voting_system is empty', (done) => {
    const c = new Constituency();

    c.validate((err) => {
      expect(err.errors.voting_system).to.exist;
      done();
    });
  });
});
