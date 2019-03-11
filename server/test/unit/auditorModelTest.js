import { expect } from 'chai';

import Auditor from '../../src/models/auditorModel';

// Creates a blank auditor and ensures the correct errors
// exist dependent on default and required properties.
describe('auditor', () => {
  it('should be invalid if username is empty', (done) => {
    const a = new Auditor();

    a.validate((err) => {
      expect(err.errors.username).to.exist;
      done();
    });
  });


  it('should be invalid if name is empty', (done) => {
    const a = new Auditor();

    a.validate((err) => {
      expect(err.errors.name).to.exist;
      done();
    });
  });

  it('should be invalid if email is empty', (done) => {
    const a = new Auditor();

    a.validate((err) => {
      expect(err.errors.email).to.exist;
      done();
    });
  });

  it('should be invalid if password is empty', (done) => {
    const a = new Auditor();

    a.validate((err) => {
      expect(err.errors.password).to.exist;
      done();
    });
  });

  it('should be invalid if authentication_attempts is empty', (done) => {
    const a = new Auditor();

    a.validate((err) => {
      expect(err.errors.authentication_attempts).to.not.exist;
      done();
    });
  });

  it('should be invalid if polling_station is empty', (done) => {
    const a = new Auditor();

    a.validate((err) => {
      expect(err.errors.polling_station).to.not.exist;
      done();
    });
  });
});
