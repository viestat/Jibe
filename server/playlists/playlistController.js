var Playlist       = require('./playlistModel'),
    SongController = require('../songs/songController'),
    Q              = require('q');

module.exports = {

  createPlaylist: function(req, res, next) {
    var playlist = new Playlist({'_creator': req.body.userId});
    playlist.save(function(err, playlist) {
      if (err) {
        next(err);
      } else {
        res.json({'playlistId': playlist._id});
      }
    });
  },

  findPlaylist: function(req, res, next, playlistId) {

    var findOne = Q.nbind(Playlist.findOne, Playlist);
    var query = {"_id": playlistId};

    findOne(query)
      .then(function(playlist) {
        if (playlist === null) {
          next(new Error('Playlist Error: playlist not found in database.'));
        } else {
          req.playlist = playlist;
        }
      })
      .fail(function (error) {
        next(error);
      });
  },

  hasSong: function(req, res, next, spotifyId) {
    req.hasSong = req.playlist.hasSong(spotifyId);
  },

  addSong: function(req, res, next) {

  },

  removeSong: function(req, res, next) {

  }
};