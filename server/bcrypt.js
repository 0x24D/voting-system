#!/usr/bin/env node
const bcrypt = require('bcryptjs');

const SALT_WORK_FACTOR = 10;
const passwordToHash = 'adminPass';

bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
  bcrypt.hash(passwordToHash, salt, (err2, hash) => {
    console.log(`Password: ${passwordToHash}, salt: ${salt}, hash: ${hash}`);
  });
});
