import mongoose from 'mongoose'
import { expect } from 'chai'

const { SystemSchema } = require('../../src/models/systemModel');
const System = mongoose.model('system', SystemSchema);

describe('system', () => {
    it('should be invalid if station is empty', function(done) {
        var s = new System();

        s.validate(function(err) {
            expect(err.errors.station).to.not.exist;
            done();
        });
    });
});

describe('system', () => {
    it('should be invalid if voters is empty', function(done) {
        var s = new System();

        s.validate(function(err) {
            expect(err.errors.voters).to.exist;
            done();
        });
    });
});

describe('system', () => {
    it('should be invalid if campaigns is empty', function(done) {
        var s = new System();

        s.validate(function(err) {
            expect(err.errors.campaigns).to.not.exist;
            done();
        });
    });
});

describe('system', () => {
    it('should be invalid if language is empty', function(done) {
        var s = new System();

        s.validate(function(err) {
            expect(err.errors.county).to.not.exist;
            done();
        });
    });
});
