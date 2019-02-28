import mongoose from 'mongoose'
import { expect } from 'chai'

import Constituency from '../../src/models/constituencyModel';

describe('constituency', () => {
    it('should be invalid if name is empty', function(done) {
        var c = new Constituency();

        c.validate(function(err) {
            expect(err.errors.name).to.exist;
            done();
        });
    });
});

describe('constituency', () => {
    it('should be invalid if minimum_age is empty', function(done) {
        var c = new Constituency();

        c.validate(function(err) {
            expect(err.errors.minimum_age).to.exist;
            done();
        });
    });
});

describe('constituency', () => {
    it('should be invalid if voting_system is empty', function(done) {
        var c = new Constituency();

        c.validate(function(err) {
            expect(err.errors.voting_system).to.exist;
            done();
        });
    });
});
