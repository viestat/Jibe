var playlistController = require('./playlistController');

module.exports = function (app) {
  // app === playlistRouter injected from middlware.js

  app.param('playlistId', playlistController.findPlaylist);
  app.param('spotifyId', playlistController.hasSong);


  app.post('/create', playlistController.createPlaylist);
  app.post('/add/:playlistId/:songId', playlistController.addSong);
  app.post('/remove/:playlistId/:songId', playlistController.removeSong);
};
