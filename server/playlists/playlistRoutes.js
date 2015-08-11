var playlistController = require('./playlistController');

module.exports = function (app) {
  // app === playlistRouter injected from middlware.js

  app.post('/add', playlistController.addSong);
  app.post('/remove', playlistController.removeSong);
};
