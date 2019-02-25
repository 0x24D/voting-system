const config = {};

config.mongoURI = {
  development: 'mongodb://localhost/votingSystemDb',
  test: 'mongodb://localhost/votingSystemTestDb',
};

module.exports = config;
