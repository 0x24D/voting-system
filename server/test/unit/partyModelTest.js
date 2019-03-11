import { expect } from 'chai';

import Party from '../../src/models/partyModel';

describe('party', () => {
  it('should be invalid if name is empty', (done) => {
    const p = new Party();

    p.validate((err) => {
      expect(err.errors.name).to.exist;
      done();
    });
  });
});

describe('party', () => {
  it('should not be invalid if description is empty', (done) => {
    const p = new Party();

    p.validate((err) => {
      expect(err.errors.description).to.not.exist;
      done();
    });
  });
});
