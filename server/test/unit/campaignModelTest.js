import { expect } from 'chai';

import Campaign from '../../src/models/campaignModel';

describe('campaign', () => {
  it('should be invalid if name is empty', (done) => {
    const c = new Campaign();

    c.validate((err) => {
      expect(err.errors.name).to.exist;
      done();
    });
  });

  it('should be invalid if total_votes is empty', (done) => {
    const c = new Campaign();

    c.validate((err) => {
      expect(err.errors.total_votes).to.not.exist;
      done();
    });
  });

  it('should be invalid if candidates is empty', (done) => {
    const c = new Campaign();

    c.validate((err) => {
      expect(err.errors.candidates).to.not.exist;
      done();
    });
  });

  it('should be invalid if votes is empty', (done) => {
    const c = new Campaign();

    c.validate((err) => {
      expect(err.errors.votes).to.not.exist;
      done();
    });
  });

  it('should be invalid if campaign_type is empty', (done) => {
    const c = new Campaign();

    c.validate((err) => {
      expect(err.errors.campaign_type).to.exist;
      done();
    });
  });

  it('should be invalid if active is empty', (done) => {
    const c = new Campaign();

    c.validate((err) => {
      expect(err.errors.active).to.exist;
      done();
    });
  });

  it('should be invalid if constituences is empty', (done) => {
    const c = new Campaign();

    c.validate((err) => {
      expect(err.errors.constituency).to.not.exist;
      done();
    });
  });

  it('should be invalid if start_date is empty', (done) => {
    const c = new Campaign();

    c.validate((err) => {
      expect(err.errors.start_date).to.not.exist;
      done();
    });
  });

  it('should be invalid if end_date is empty', (done) => {
    const c = new Campaign();

    c.validate((err) => {
      expect(err.errors.end_date).to.exist;
      done();
    });
  });
});
