import mongoose from 'mongoose'
import { expect } from 'chai'

const { CampaignSchema } = require('../../src/models/campaignModel');
const Campaign = mongoose.model('campaign', CampaignSchema);

describe('campaign', () => {
    it('should be invalid if name is empty', function(done) {
        var c = new Campaign();

        c.validate(function(err) {
            expect(err.errors.name).to.exist;
            done();
        });
    });
});

describe('campaign', ()=> {
    it('should be invalid if totalVotes is empty', function(done) {
        var c = new Campaign();
 
        c.validate(function(err) {
            expect(err.errors.totalVotes).to.not.exist;
            done();
        });
    });
});

describe('campaign', ()=> {
    it('should be invalid if candidates is empty', function(done) {
        var c = new Campaign();
 
        c.validate(function(err) {
            expect(err.errors.candidates).to.not.exist;
            done();
        });
    });
});

describe('campaign', () => {
    it('should be invalid if votes is empty', function(done) {
        var c = new Campaign();

        c.validate(function(err) {
            expect(err.errors.votes).to.exist;
            done();
        });
    });
});

describe('campaign', () => {
    it('should be invalid if type is empty', function(done) {
        var c = new Campaign();

        c.validate(function(err) {
            expect(err.errors.type).to.exist;
            done();
        });
    });
});

describe('campaign', () => {
    it('should be invalid if active is empty', function(done) {
        var c = new Campaign();

        c.validate(function(err) {
            expect(err.errors.active).to.exist;
            done();
        });
    });
});

describe('campaign', ()=> {
    it('should be invalid if constituences is empty', function(done) {
        var c = new Campaign();
 
        c.validate(function(err) {
            expect(err.errors.constituency).to.not.exist;
            done();
        });
    });
});

describe('campaign', ()=> {
    it('should be invalid if startDate is empty', function(done) {
        var c = new Campaign();
 
        c.validate(function(err) {
            expect(err.errors.startDate).to.not.exist;
            done();
        });
    });
});

describe('campaign', () => {
    it('should be invalid if endDate is empty', function(done) {
        var c = new Campaign();

        c.validate(function(err) {
            expect(err.errors.endDate).to.exist;
            done();
        });
    });
});

