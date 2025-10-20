# TabGeni API Documentation

## Base URL
```
http://localhost:3001
```

## Endpoints

### Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "message": "TabGeni API is running"
}
```

---

### Upload Audio File

```http
POST /upload
Content-Type: multipart/form-data
```

**Parameters:**
- `audio` (file): Audio file to upload

**Response:**
```json
{
  "success": true,
  "message": "File uploaded successfully",
  "file": {
    "filename": "audio-1234567890-123456789.mp3",
    "path": "/path/to/uploads/audio-1234567890-123456789.mp3",
    "size": 1024000,
    "mimetype": "audio/mpeg"
  }
}
```

---

### Analyze Song

```http
POST /analyze
Content-Type: application/json
```

**Method 1: From uploaded file**
```json
{
  "filename": "audio-1234567890-123456789.mp3"
}
```

**Method 2: From text search**
```json
{
  "title": "Song Title",
  "artist": "Artist Name"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "title": "Song Title",
    "artist": "Artist Name",
    "album": "Album Name",
    "bpm": 120,
    "key": "C Major",
    "duration": 240,
    "chords": ["C", "G", "Am", "F"],
    "tabs": "Chords for Song...",
    "backingTrackUrl": "https://youtube.com/...",
    "youtubeUrl": "https://youtube.com/...",
    "spotifyUrl": "https://open.spotify.com/...",
    "audioUrl": "/uploads/audio-1234567890-123456789.mp3",
    "thumbnailUrl": "https://..."
  }
}
```

---

### Get Library

```http
GET /library?userId=default-user
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "userId": "default-user",
      "title": "Song Title",
      "artist": "Artist Name",
      "bpm": 120,
      "key": "C Major",
      "chords": ["C", "G", "Am", "F"],
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### Get Single Song

```http
GET /library/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "default-user",
    "title": "Song Title",
    "artist": "Artist Name",
    "bpm": 120,
    "key": "C Major",
    "chords": ["C", "G", "Am", "F"],
    "tabs": "Chords for Song...",
    "userNotes": "My personal notes",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### Save Song to Library

```http
POST /library
Content-Type: application/json
```

**Request Body:**
```json
{
  "userId": "default-user",
  "title": "Song Title",
  "artist": "Artist Name",
  "bpm": 120,
  "key": "C Major",
  "chords": ["C", "G", "Am", "F"],
  "tabs": "Chords for Song...",
  "userNotes": "My personal notes"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Song saved to library",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "default-user",
    "title": "Song Title",
    "artist": "Artist Name",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### Update Song

```http
PUT /library/:id
Content-Type: application/json
```

**Request Body:**
```json
{
  "userNotes": "Updated notes",
  "bpm": 125
}
```

**Response:**
```json
{
  "success": true,
  "message": "Song updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "default-user",
    "title": "Song Title",
    "artist": "Artist Name",
    "userNotes": "Updated notes",
    "bpm": 125,
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

---

### Delete Song

```http
DELETE /library/:id
```

**Response:**
```json
{
  "success": true,
  "message": "Song deleted successfully"
}
```

---

## Error Responses

All endpoints may return error responses in the following format:

```json
{
  "error": "Error message",
  "message": "Detailed error description"
}
```

Common HTTP status codes:
- `400` - Bad Request (missing parameters, invalid data)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error

---

## Notes

- The default `userId` is `"default-user"` for all operations
- Audio files are stored in the `/uploads` directory
- File size limit for uploads is 50MB
- Supported audio formats: MP3, WAV, M4A, and other common audio formats
