import { expect } from 'chai';

import User from '../../src/models/userModel';

describe('user', () => {
  it('should be invalid if username is empty', (done) => {
    const u = new User();

    u.validate((err) => {
      expect(err.errors.username).to.exist;
      done();
    });
  });
  it('should be invalid if name is empty', (done) => {
    const u = new User();

    u.validate((err) => {
      expect(err.errors.name).to.exist;
      done();
    });
  });
  it('should be invalid if email is empty', (done) => {
    const u = new User();

    u.validate((err) => {
      expect(err.errors.email).to.exist;
      done();
    });
  });

  it('should be invalid if password is empty', (done) => {
    const u = new User();

    u.validate((err) => {
      expect(err.errors.password).to.exist;
      done();
    });
  });

  it("shouldn't be invalid if authentication_attempts is empty", (done) => {
    const u = new User();

    u.validate((err) => {
      expect(err.errors.authentication_attempts).to.not.exist;
      done();
    });
  });

  it("shouldn't be invalid if salt is empty", (done) => {
    const u = new User();

    u.validate((err) => {
      expect(err.errors.salt).to.not.exist;
      done();
    });
  });

  it("shouldn't be invalid if token is empty", (done) => {
    const u = new User();

    u.validate((err) => {
      expect(err.errors.token).to.not.exist;
      done();
    });
  });
});
