var mongoose = require('mongoose'),
    Q        = require('q');

// NOTE ABOUT DATABASE SCHEMA
// _id (ObjectId) is included as default for all Schema
// With ObjectId as _id field, you don't need created_at field.
// ObjectIds have a method called getTimestamp().

// ObjectId("507c7f79bcf86cd7994f6c0e").getTimestamp()
// This will return the following output:
// ISODate("2012-10-15T21:26:17Z")

var Schema = mongoose.Schema;

//===========================
// Song schema
//===========================
var SongSchema = new Schema({
  spotifyId: {type: String, required: true},
  artist: [{type: String, required: true}],
  song_name: {type: String, required: true},
  album_name:  String,
  duration_ms: Number,
  popularity: Number,
  preview_url: String,
  image: String,
  meta: {
    upvotes: Number,
    upvoteUsers: [{type: Schema.Types.ObjectId, ref: 'User'}], // references User _id
    downvotes:  Number,
    downvoteUsers: [{type: Schema.Types.ObjectId, ref: 'User'}] // references User _id
  },
  updated_at: { type: Date },
  plays: Number,
  played: {
    type: Boolean,
    default: false
  }
});

SongSchema.methods.upvote = function () {
  this.meta.upvotes++;
  return this.save();
};

SongSchema.methods.downvote = function() {
  this.meta.downvotes--;
  return this.save();
};

// revise the updated_at field before saving each entry
SongSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

module.exports = mongoose.model('Song', SongSchema);