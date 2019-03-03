import { expect } from 'chai';

import Address from '../../src/models/addressModel';

describe('address', () => {
  it('should be invalid if line_one is empty', (done) => {
    const a = new Address();

    a.validate((err) => {
      expect(err.errors.line_one).to.exist;
      done();
    });
  });
});

describe('address', () => {
  it('should be invalid if line_two is empty', (done) => {
    const a = new Address();

    a.validate((err) => {
      expect(err.errors.line_two).to.exist;
      done();
    });
  });
});

describe('address', () => {
  it('should be invalid if town is empty', (done) => {
    const a = new Address();

    a.validate((err) => {
      expect(err.errors.town).to.exist;
      done();
    });
  });
});

describe('address', () => {
  it('should be invalid if county is empty', (done) => {
    const a = new Address();

    a.validate((err) => {
      expect(err.errors.county).to.exist;
      done();
    });
  });
});

describe('address', () => {
  it('should be invalid if country is empty', (done) => {
    const a = new Address();

    a.validate((err) => {
      expect(err.errors.country).to.exist;
      done();
    });
  });
});

describe('address', () => {
  it('should be invalid if postcode is empty', (done) => {
    const a = new Address();

    a.validate((err) => {
      expect(err.errors.postcode).to.exist;
      done();
    });
  });
});

describe('address', () => {
  it('should be invalid if constituency is empty', (done) => {
    const a = new Address();

    a.validate((err) => {
      expect(err.errors.constituency).to.not.exist;
      done();
    });
  });
});
