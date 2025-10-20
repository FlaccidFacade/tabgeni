const express = require('express');
const router = express.Router();
const Song = require('../models/Song');
const { apiLimiter, writeLimiter } = require('../middleware/rateLimiter');

// Get all songs in library
router.get('/', apiLimiter, async (req, res) => {
  try {
    // Sanitize userId to prevent injection
    const userId = String(req.query.userId || 'default-user').replace(/[^a-zA-Z0-9_-]/g, '');
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
router.get('/:id', apiLimiter, async (req, res) => {
  try {
    // Validate MongoDB ObjectId format
    if (!/^[0-9a-fA-F]{24}$/.test(req.params.id)) {
      return res.status(400).json({ error: 'Invalid song ID format' });
    }
    
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
router.post('/', writeLimiter, async (req, res) => {
  try {
    // Sanitize userId to prevent injection
    const userId = String(req.body.userId || 'default-user').replace(/[^a-zA-Z0-9_-]/g, '');
    
    const songData = {
      ...req.body,
      userId,
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
router.put('/:id', writeLimiter, async (req, res) => {
  try {
    // Validate MongoDB ObjectId format
    if (!/^[0-9a-fA-F]{24}$/.test(req.params.id)) {
      return res.status(400).json({ error: 'Invalid song ID format' });
    }
    
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
router.delete('/:id', writeLimiter, async (req, res) => {
  try {
    // Validate MongoDB ObjectId format
    if (!/^[0-9a-fA-F]{24}$/.test(req.params.id)) {
      return res.status(400).json({ error: 'Invalid song ID format' });
    }
    
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
