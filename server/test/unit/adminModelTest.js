import { expect } from 'chai';

import Admin from '../../src/models/adminModel';

describe('admin', () => {
  it('should be invalid if username is empty', (done) => {
    const v = new Admin();

    v.validate((err) => {
      expect(err.errors.username).to.exist;
      done();
    });
  });
});

describe('admin', () => {
  it('should be invalid if name is empty', (done) => {
    const v = new Admin();

    v.validate((err) => {
      expect(err.errors.name).to.exist;
      done();
    });
  });
});

describe('admin', () => {
  it('should be invalid if email is empty', (done) => {
    const v = new Admin();

    v.validate((err) => {
      expect(err.errors.email).to.exist;
      done();
    });
  });
});

describe('admin', () => {
  it('should be invalid if password is empty', (done) => {
    const v = new Admin();

    v.validate((err) => {
      expect(err.errors.password).to.exist;
      done();
    });
  });
});

describe('admin', () => {
  it('should be invalid if authentication_attempts is empty', (done) => {
    const v = new Admin();

    v.validate((err) => {
      expect(err.errors.authentication_attempts).to.not.exist;
      done();
    });
  });
});
