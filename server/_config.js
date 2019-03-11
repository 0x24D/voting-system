const config = {};

config.mongoURI = {
  development: 'mongodb://localhost/votingSystemDb',
  test: 'mongodb://localhost/votingSystemTestDb',
};

config.email = {
  // host/port or service
  'host': 'smtp.ethereal.email',
  'port': 587,
    'auth': {
      'user' : 'alva77@ethereal.email',
      'pass' : 'tGQgcncz7Nw6VTnwGF',
    }
};

module.exports = config;
