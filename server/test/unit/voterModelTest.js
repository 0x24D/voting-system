import { expect } from 'chai';

import Voter from '../../src/models/voterModel';

describe('voter', () => {
  it('should be invalid if username is empty', (done) => {
    const v = new Voter();

    v.validate((err) => {
      expect(err.errors.username).to.exist;
      done();
    });
  });
});

describe('voter', () => {
  it('should be invalid if name is empty', (done) => {
    const v = new Voter();

    v.validate((err) => {
      expect(err.errors.name).to.exist;
      done();
    });
  });
});

describe('voter', () => {
  it('should be invalid if email is empty', (done) => {
    const v = new Voter();

    v.validate((err) => {
      expect(err.errors.email).to.exist;
      done();
    });
  });
});

describe('voter', () => {
  it('should be invalid if password is empty', (done) => {
    const v = new Voter();

    v.validate((err) => {
      expect(err.errors.password).to.exist;
      done();
    });
  });
});

describe('voter', () => {
  it('should be invalid if authentication_attempts is empty', (done) => {
    const v = new Voter();

    v.validate((err) => {
      expect(err.errors.authentication_attempts).to.not.exist;
      done();
    });
  });
});

describe('voter', () => {
  it('should be invalid if voted is empty', (done) => {
    const v = new Voter();

    v.validate((err) => {
      expect(err.errors.voted).to.not.exist;
      done();
    });
  });
});

describe('voter', () => {
  it('should be invalid if date_of_birth is empty', (done) => {
    const v = new Voter();

    v.validate((err) => {
      expect(err.errors.date_of_birth).to.exist;
      done();
    });
  });
});

describe('voter', () => {
  it('should be invalid if address is empty', (done) => {
    const v = new Voter();

    v.validate((err) => {
      expect(err.errors.address).to.not.exist;
      done();
    });
  });
});
