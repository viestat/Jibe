// server-config.js -- set up express
// ----------------------------------------------
// Dependencies
var handler = require('./server-routes.js');
var bodyParser = require('body-parser');
var express = require('express');
var morgan = require('morgan');

// Initialize express process
var app = express();

// Bind middleware to app instance
app.use(morgan('dev'));
app.use(express.static('./client'));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendfile('./client/index.html');
});

app.get('/api/getPlaylist', handler.getPlaylist);

app.post('/api/createParty', handler.createParty);
app.post('/api/joinParty', handler.joinParty);
app.post('/api/addSong', handler.addSong);
app.post('/api/upvote', handler.upvote);
app.post('/api/downvote', handler.downvote);

// Export server app instance
module.exports = app;