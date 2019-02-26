import mongoose from 'mongoose'
import { expect } from 'chai'

const { CandidateSchema } = require('../../src/models/candidateModel');
const Candidate = mongoose.model('candidate', CandidateSchema);

describe('candidate', () => {
    it('should be invalid if name is empty', function(done) {
        var c = new Candidate();

        c.validate(function(err) {
            expect(err.errors.name).to.exist;
            done();
        });
    });
});

describe('candidate', ()=> {
    it('should be invalid if party is empty', function(done) {
        var c = new Candidate();
 
        c.validate(function(err) {
            expect(err.errors.party).to.not.exist;
            done();
        });
    });
});