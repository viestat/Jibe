var mongoose = require('mongoose'),
    shortid  = require('shortid');

var Schema = mongoose.Schema;

//===========================
// Playlist schema
//===========================
var PlaylistSchema = new Schema({
  _creator : {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  _id: {
    type: String,
    unique: true,
    'default': shortid.generate
  },
  songs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Song' // references Song _id see mongoose Populations and document.populate()
    }
  ],
  playedSongs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Song' // references Song _id
    }
  ],
  updated_at: {
    type: Date
  }
});


PlaylistSchema.methods.hasSong = function (songId) {
  console.log(this)
  var promise = this.populate('songs.song').exec(function(err, songs) {
    if (err) throw new Error('Playlist Error: could not check if song in playlist.');
    return songs.some(function(song) {
      return song.uri === songId;
    });
  });
  return promise;
};

PlaylistSchema.methods.hasPlayed = function(songId) {
  var promise = this.populate('playedSongs.song').exec(function(err, songs) {
    if (err) throw new Error('Playlist Error: could not check if song was played for playlist.');
    return songs.some(function(song) {
      return song.uri === songId;
    });
  });
  return promise;
};

PlaylistSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

module.exports = mongoose.model('Playlist', PlaylistSchema);