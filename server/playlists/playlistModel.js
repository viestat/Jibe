var mongoose = require('mongoose'),
    shortid  = require('shortid');

var Schema = mongoose.Schema;

//===========================
// Playlist schema
//===========================
var PlaylistSchema = new Schema({
  _creator : {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  _id: {
    type: String, unique: true,
    'default': shortid.generate
  },
  songs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Song' // references Song _id see mongoose Populations
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

PlaylistSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

module.exports = mongoose.model('Playlist', PlaylistSchema);