import { useState } from 'react'
import axios from 'axios'

interface SongDetailsProps {
  song: any
  onSongSaved?: () => void
}

export default function SongDetails({ song, onSongSaved }: SongDetailsProps) {
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedNotes, setEditedNotes] = useState(song.userNotes || '')

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

  const handleSaveToLibrary = async () => {
    setIsSaving(true)
    setSaveMessage(null)

    try {
      const response = await axios.post(`${API_URL}/library`, {
        ...song,
        userNotes: editedNotes,
      })

      if (response.data.success) {
        setSaveMessage('✅ Song saved to library!')
        if (onSongSaved) onSongSaved()
        setTimeout(() => setSaveMessage(null), 3000)
      }
    } catch (error) {
      setSaveMessage('❌ Failed to save song')
      console.error('Save error:', error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{song.title}</h2>
          <p className="text-xl text-gray-600 mt-1">{song.artist}</p>
          {song.album && <p className="text-sm text-gray-500 mt-1">{song.album}</p>}
        </div>
        <button
          onClick={handleSaveToLibrary}
          disabled={isSaving}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors font-medium"
        >
          {isSaving ? 'Saving...' : '💾 Save to Library'}
        </button>
      </div>

      {saveMessage && (
        <div className={`mb-4 p-3 rounded-lg ${
          saveMessage.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {saveMessage}
        </div>
      )}

      {/* Song Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {song.bpm && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 font-medium">BPM</p>
            <p className="text-2xl font-bold text-blue-600">{song.bpm}</p>
          </div>
        )}
        {song.key && (
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 font-medium">Key</p>
            <p className="text-2xl font-bold text-purple-600">{song.key}</p>
          </div>
        )}
        {song.duration && (
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 font-medium">Duration</p>
            <p className="text-2xl font-bold text-green-600">
              {Math.floor(song.duration / 60)}:{String(Math.floor(song.duration % 60)).padStart(2, '0')}
            </p>
          </div>
        )}
        {song.chords && song.chords.length > 0 && (
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 font-medium">Chords</p>
            <p className="text-sm font-bold text-orange-600">
              {song.chords.join(', ')}
            </p>
          </div>
        )}
      </div>

      {/* Tabs Section */}
      {song.tabs && (
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">📝 Tabs & Chords</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <pre className="whitespace-pre-wrap font-mono text-sm text-gray-700">
              {song.tabs}
            </pre>
          </div>
        </div>
      )}

      {/* Links Section */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3">🔗 Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {song.youtubeUrl && (
            <a
              href={song.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              ▶️ Watch on YouTube
            </a>
          )}
          {song.backingTrackUrl && (
            <a
              href={song.backingTrackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              🎸 Backing Track
            </a>
          )}
          {song.spotifyUrl && (
            <a
              href={song.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              🎵 Listen on Spotify
            </a>
          )}
        </div>
      </div>

      {/* Audio Player */}
      {song.audioUrl && (
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">🎧 Audio Playback</h3>
          <audio controls className="w-full">
            <source src={`${API_URL}${song.audioUrl}`} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      {/* User Notes */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-bold text-gray-800">📋 Notes</h3>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </div>
        {isEditing ? (
          <div>
            <textarea
              value={editedNotes}
              onChange={(e) => setEditedNotes(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              placeholder="Add your notes here..."
            />
            <button
              onClick={() => {
                setIsEditing(false)
                song.userNotes = editedNotes
              }}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Notes
            </button>
          </div>
        ) : (
          <div className="bg-gray-50 p-4 rounded-lg min-h-[100px]">
            <p className="text-gray-700">
              {editedNotes || 'No notes yet. Click Edit to add notes.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
