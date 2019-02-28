import mongoose from 'mongoose'
import { expect } from 'chai'

import User from '../../src/models/userModel';

describe('user', () => {
    it('should be invalid if username is empty', function(done) {
        var u = new User();

        u.validate(function(err) {
            expect(err.errors.username).to.exist;
            done();
        });
    });
});

describe('user', () => {
    it('should be invalid if name is empty', function(done) {
        var u = new User();

        u.validate(function(err) {
            expect(err.errors.name).to.exist;
            done();
        });
    });
});

describe('user', () => {
    it('should be invalid if email is empty', function(done) {
        var u = new User();

        u.validate(function(err) {
            expect(err.errors.email).to.exist;
            done();
        });
    });
});

describe('user', () => {
    it('should be invalid if password is empty', function(done) {
        var u = new User();

        u.validate(function(err) {
            expect(err.errors.password).to.exist;
            done();
        });
    });
});

describe('user', () => {
    it('should be invalid if authenticationAttempts is empty', function(done) {
        var u = new User();

        u.validate(function(err) {
            expect(err.errors.authenticationAttempts).to.not.exist;
            done();
        });
    });
});
