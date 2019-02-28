import mongoose from 'mongoose'
import { expect } from 'chai'

import Address from '../../src/models/addressModel';

describe('address', () => {
    it('should be invalid if lineOne is empty', function(done) {
        var a = new Address();

        a.validate(function(err) {
            expect(err.errors.lineOne).to.exist;
            done();
        });
    });
});

describe('address', () => {
    it('should be invalid if lineTwo is empty', function(done) {
        var a = new Address();

        a.validate(function(err) {
            expect(err.errors.lineTwo).to.exist;
            done();
        });
    });
});

describe('address', () => {
    it('should be invalid if town is empty', function(done) {
        var a = new Address();

        a.validate(function(err) {
            expect(err.errors.town).to.exist;
            done();
        });
    });
});

describe('address', () => {
    it('should be invalid if county is empty', function(done) {
        var a = new Address();

        a.validate(function(err) {
            expect(err.errors.county).to.exist;
            done();
        });
    });
});

describe('address', ()=> {
    it('should be invalid if country is empty', function(done) {
        var a = new Address();

        a.validate(function(err) {
            expect(err.errors.country).to.exist;
            done();
        });
    });
});

describe('address', ()=> {
    it('should be invalid if postcode is empty', function(done) {
        var a = new Address();

        a.validate(function(err) {
            expect(err.errors.postcode).to.exist;
            done();
        });
    });
});

describe('address', () => {
    it('should be invalid if constituency is empty', function(done) {
        var a = new Address();

        a.validate(function(err) {
            expect(err.errors.constituency).to.not.exist;
            done();
        });
    });
});
