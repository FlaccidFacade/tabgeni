const express = require('express');
const router = express.Router();
const Song = require('../models/Song');

// Get all songs in library
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId || 'default-user';
    const songs = await Song.find({ userId }).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: songs.length,
      data: songs,
    });
  } catch (error) {
    console.error('Library fetch error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch library', 
      message: error.message 
    });
  }
});

// Get single song
router.get('/:id', async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    
    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }
    
    res.json({
      success: true,
      data: song,
    });
  } catch (error) {
    console.error('Song fetch error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch song', 
      message: error.message 
    });
  }
});

// Save song to library
router.post('/', async (req, res) => {
  try {
    const songData = {
      userId: req.body.userId || 'default-user',
      ...req.body,
    };

    const song = new Song(songData);
    await song.save();
    
    res.status(201).json({
      success: true,
      message: 'Song saved to library',
      data: song,
    });
  } catch (error) {
    console.error('Song save error:', error);
    res.status(500).json({ 
      error: 'Failed to save song', 
      message: error.message 
    });
  }
});

// Update song
router.put('/:id', async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    
    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }
    
    res.json({
      success: true,
      message: 'Song updated successfully',
      data: song,
    });
  } catch (error) {
    console.error('Song update error:', error);
    res.status(500).json({ 
      error: 'Failed to update song', 
      message: error.message 
    });
  }
});

// Delete song
router.delete('/:id', async (req, res) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);
    
    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }
    
    res.json({
      success: true,
      message: 'Song deleted successfully',
    });
  } catch (error) {
    console.error('Song delete error:', error);
    res.status(500).json({ 
      error: 'Failed to delete song', 
      message: error.message 
    });
  }
});

module.exports = router;
