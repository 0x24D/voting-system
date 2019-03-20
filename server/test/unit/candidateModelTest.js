import { expect } from 'chai';

import Candidate from '../../src/models/candidateModel';

describe('candidate', () => {
  it('should be invalid if name is empty', (done) => {
    const c = new Candidate();

    c.validate((err) => {
      expect(err.errors.name).to.exist;
      done();
    });
  });

  it('should not be invalid if party is empty', (done) => {
    const c = new Candidate();

    c.validate((err) => {
      expect(err.errors.party).to.not.exist;
      done();
    });
  });

  it('should not be invalid if description is empty', (done) => {
    const c = new Candidate();

    c.validate((err) => {
      expect(err.errors.description).to.not.exist;
      done();
    });
  });
});
