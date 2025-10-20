# 🎵 TabGeni

**TabGeni** is a comprehensive web application for analyzing songs from audio files or text search. Upload or record audio to automatically identify songs, detect BPM and musical key, fetch tabs/chords, and access backing tracks.

## Features

- 🎤 **Audio Upload & Recording**: Upload audio files or record directly from your microphone
- 🔍 **Song Identification**: Automatic song recognition using AudD API
- 🎹 **Music Analysis**: Detect BPM (tempo) and musical key
- 📝 **Tabs & Chords**: Fetch guitar tabs and chord progressions
- 🎸 **Backing Tracks**: Find backing tracks on YouTube
- 💾 **Personal Library**: Save, edit, and manage your analyzed songs
- 🎨 **Clean UI**: Beautiful, responsive interface built with Tailwind CSS

## Tech Stack

### Frontend
- **Next.js 14** with TypeScript
- **Tailwind CSS** for styling
- **Axios** for API calls

### Backend
- **Node.js** with Express
- **MongoDB** for data persistence
- **Multer** for file uploads
- **AudD API** for song identification

### DevOps
- **Docker** & **Docker Compose** for containerization

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (or use Docker Compose)
- AudD API key (optional, for song identification)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/FlaccidFacade/tabgeni.git
cd tabgeni
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
MONGODB_URI=mongodb://localhost:27017/tabgeni
AUDD_API_KEY=your_audd_api_key_here
PORT=3001
NEXT_PUBLIC_API_URL=http://localhost:3001
```

4. **Start MongoDB** (if not using Docker)
```bash
mongod
```

5. **Run the application**

In separate terminals:

```bash
# Start the backend server
npm run server

# Start the Next.js frontend
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Using Docker

```bash
# Build and start all services
docker-compose up --build

# Stop services
docker-compose down
```

## Usage

### Analyze a Song

1. **Upload/Record Audio**:
   - Click "Choose Audio File" to upload an audio file
   - Or click "Record Audio" to record from your microphone
   - Supported formats: MP3, WAV, M4A, etc.

2. **Search by Title**:
   - Switch to "Search by Title" tab
   - Enter song title and artist name
   - Click "Analyze Song"

3. **View Results**:
   - BPM and musical key
   - Chords and tabs
   - Links to YouTube, Spotify, and backing tracks
   - Audio playback (for uploaded files)

4. **Save to Library**:
   - Click "Save to Library" to store the song
   - Add personal notes
   - Access from "My Library" tab

### Manage Your Library

- View all saved songs in the "My Library" tab
- Click "View Details" to see full song information
- Delete songs you no longer need
- Edit notes and replay audio

## API Endpoints

### Upload Audio
```
POST /upload
Body: FormData with 'audio' file
```

### Analyze Song
```
POST /analyze
Body: { filename: string } or { title: string, artist: string }
```

### Library Operations
```
GET    /library          - Get all songs
GET    /library/:id      - Get single song
POST   /library          - Save song
PUT    /library/:id      - Update song
DELETE /library/:id      - Delete song
```

## Project Structure

```
tabgeni/
├── pages/                # Next.js pages
│   ├── _app.tsx         # App wrapper
│   ├── _document.tsx    # Document structure
│   └── index.tsx        # Main page
├── components/          # React components
│   ├── UploadSection.tsx
│   ├── SongDetails.tsx
│   └── Library.tsx
├── server/              # Express backend
│   ├── index.js         # Server entry point
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   └── utils/           # Utility functions
├── styles/              # CSS styles
├── docker-compose.yml   # Docker configuration
├── Dockerfile           # Docker build
└── package.json         # Dependencies
```

## Development

```bash
# Run linter
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Acknowledgments

- [AudD API](https://audd.io/) for song identification
- [Next.js](https://nextjs.org/) for the frontend framework
- [Express](https://expressjs.com/) for the backend
- [MongoDB](https://www.mongodb.com/) for data storage