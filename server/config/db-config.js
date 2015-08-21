// db-config.js -- set up database connection and schema
// ----------------------------------------------
// var BluebirdPromise = require('bluebird');
var mongoose = require('mongoose');
// var bcrypt = require('bcrypt-nodejs');

// Connect to Grizzly 
mongoose.connect('mongodb://localhost:27017/grizzly');

// Define party schema
var partySchema = mongoose.Schema ({
  name: { type: String, index: { unique: true } },
  playlist: { type: Array , default: [] }
});

// Define song schema
var songSchema = mongoose.Schema ({
  videoId: { type: String, index: { unique: true } },
  title: String,
  score: Number,
  played: { type: Boolean , default: false }
});

var Party = mongoose.model('Party', partySchema);
var Song = mongoose.model('Song', songSchema);

module.exports = Party;
module.exports = Song;



var party1 = new Party({
  name: 'stevensDopePartyJam',
  playlist: []
});

var party2 = new Party({
  name: 'natesCoolParty',
  playlist: []
});

var song1 = new Song({
  videoId: 'sjhdf287f',
  title: 'David Rosson - Argle My Bargle',
  score: 13
});

var song2 = new Song({
  videoId: 'zc2vlwo7f',
  title: 'Hello - friend',
  score: 1
});