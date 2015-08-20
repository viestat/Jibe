var mongoUri = require('./config/database.js').url;

module.exports = {
  mongodb: {
    defaultForType: 'mongodb',
    connector: 'loopback-connector-mongodb',
    url: mongoUri
  }
};