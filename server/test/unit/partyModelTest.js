import mongoose from 'mongoose'
import { expect } from 'chai'

import Party from '../../src/models/partyModel';

describe('party', () => {
    it('should be invalid if name is empty', function(done) {
        var p = new Party();

        p.validate(function(err) {
            expect(err.errors.name).to.exist;
            done();
        });
    });
});

describe('party', () => {
    it('should be invalid if description is empty', function(done) {
        var p = new Party();

        p.validate(function(err) {
            expect(err.errors.description).to.not.exist;
            done();
        });
    });
});
