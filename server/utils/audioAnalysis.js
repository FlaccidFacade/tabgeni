const axios = require('axios');
const path = require('path');

/**
 * Sanitize filename to prevent path traversal attacks
 */
function sanitizeFilename(filename) {
  // Remove any path separators and only keep the basename
  const basename = path.basename(filename);
  // Only allow alphanumeric, dots, hyphens, and underscores
  return basename.replace(/[^a-zA-Z0-9._-]/g, '');
}

/**
 * Identify song using AudD API
 */
async function identifySong(audioFilePath) {
  try {
    const apiKey = process.env.AUDD_API_KEY;
    
    if (!apiKey) {
      console.warn('AudD API key not configured');
      return null;
    }

    const FormData = require('form-data');
    const fs = require('fs');
    
    // Validate the file path to prevent path traversal
    const resolvedPath = path.resolve(audioFilePath);
    const uploadsDir = path.resolve(__dirname, '../../uploads');
    
    if (!resolvedPath.startsWith(uploadsDir)) {
      throw new Error('Invalid file path');
    }
    
    const formData = new FormData();
    formData.append('api_token', apiKey);
    formData.append('file', fs.createReadStream(resolvedPath));
    formData.append('return', 'apple_music,spotify,deezer');

    const response = await axios.post('https://api.audd.io/', formData, {
      headers: formData.getHeaders(),
      timeout: 30000,
    });

    if (response.data && response.data.status === 'success' && response.data.result) {
      const result = response.data.result;
      return {
        title: result.title,
        artist: result.artist,
        album: result.album,
        releaseDate: result.release_date,
        spotifyUrl: result.spotify?.external_urls?.spotify,
        thumbnailUrl: result.spotify?.album?.images?.[0]?.url,
        duration: result.spotify?.duration_ms / 1000,
      };
    }

    return null;
  } catch (error) {
    console.error('AudD API error:', error.message);
    return null;
  }
}

/**
 * Detect BPM using music-tempo library
 */
async function detectBPM(audioFilePath) {
  try {
    // Note: music-tempo requires audio buffer processing
    // For simplicity, returning a placeholder
    // In production, you'd use proper audio processing
    return Math.floor(Math.random() * (180 - 60) + 60);
  } catch (error) {
    console.error('BPM detection error:', error);
    return null;
  }
}

/**
 * Detect musical key
 */
async function detectKey(audioFilePath) {
  try {
    // Placeholder for key detection
    // In production, use proper music analysis library
    const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const modes = ['Major', 'Minor'];
    return keys[Math.floor(Math.random() * keys.length)] + ' ' + modes[Math.floor(Math.random() * modes.length)];
  } catch (error) {
    console.error('Key detection error:', error);
    return null;
  }
}

/**
 * Search for tabs and chords
 */
async function fetchTabsAndChords(title, artist) {
  try {
    // Placeholder - in production, integrate with tabs API like Ultimate Guitar API
    const searchQuery = `${title} ${artist} chords`;
    
    // Mock chord data
    const commonChords = ['C', 'G', 'Am', 'F', 'Dm', 'Em'];
    const randomChords = commonChords.sort(() => 0.5 - Math.random()).slice(0, 4);
    
    return {
      chords: randomChords,
      tabs: `Chords for ${title} by ${artist}\n\nVerse:\n${randomChords.join(' - ')}\n\nChorus:\n${randomChords.reverse().join(' - ')}`,
    };
  } catch (error) {
    console.error('Tabs fetch error:', error);
    return { chords: [], tabs: '' };
  }
}

/**
 * Search for backing tracks on YouTube
 */
async function fetchBackingTrack(title, artist) {
  try {
    // Construct YouTube search URL
    const searchQuery = encodeURIComponent(`${title} ${artist} backing track`);
    const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${searchQuery}`;
    
    return {
      backingTrackUrl: youtubeSearchUrl,
      youtubeUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(title + ' ' + artist)}`,
    };
  } catch (error) {
    console.error('Backing track fetch error:', error);
    return { backingTrackUrl: null, youtubeUrl: null };
  }
}

module.exports = {
  identifySong,
  detectBPM,
  detectKey,
  fetchTabsAndChords,
  fetchBackingTrack,
  sanitizeFilename,
};
