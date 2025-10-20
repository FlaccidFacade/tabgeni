const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    default: 'default-user'
  },
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  album: String,
  bpm: Number,
  key: String,
  duration: Number,
  tabs: String,
  chords: [String],
  backingTrackUrl: String,
  youtubeUrl: String,
  spotifyUrl: String,
  audioUrl: String,
  thumbnailUrl: String,
  genre: String,
  releaseDate: String,
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  userNotes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

SongSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Song', SongSchema);
