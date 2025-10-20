const express = require('express');
const router = express.Router();
const path = require('path');
const Song = require('../models/Song');
const {
  identifySong,
  detectBPM,
  detectKey,
  fetchTabsAndChords,
  fetchBackingTrack,
} = require('../utils/audioAnalysis');

// Analyze audio file
router.post('/', async (req, res) => {
  try {
    const { filename, title, artist } = req.body;

    if (!filename && (!title || !artist)) {
      return res.status(400).json({ 
        error: 'Either filename or (title and artist) must be provided' 
      });
    }

    let songInfo = {};
    let audioFilePath = null;

    // If filename provided, identify from audio
    if (filename) {
      audioFilePath = path.join(__dirname, '../../uploads', filename);
      
      // Identify song using AudD
      const identified = await identifySong(audioFilePath);
      
      if (identified) {
        songInfo = { ...identified };
      } else {
        // If identification fails, use provided metadata
        songInfo = {
          title: title || 'Unknown Title',
          artist: artist || 'Unknown Artist',
        };
      }

      // Detect BPM and Key
      const [bpm, key] = await Promise.all([
        detectBPM(audioFilePath),
        detectKey(audioFilePath),
      ]);

      songInfo.bpm = bpm;
      songInfo.key = key;
    } else {
      // Text-based search
      songInfo = {
        title,
        artist,
      };
    }

    // Fetch tabs, chords, and backing tracks
    const [tabsData, trackData] = await Promise.all([
      fetchTabsAndChords(songInfo.title, songInfo.artist),
      fetchBackingTrack(songInfo.title, songInfo.artist),
    ]);

    const result = {
      ...songInfo,
      chords: tabsData.chords,
      tabs: tabsData.tabs,
      backingTrackUrl: trackData.backingTrackUrl,
      youtubeUrl: trackData.youtubeUrl,
      audioUrl: filename ? `/uploads/${filename}` : null,
    };

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ 
      error: 'Failed to analyze song', 
      message: error.message 
    });
  }
});

module.exports = router;
