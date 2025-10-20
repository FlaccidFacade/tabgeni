import { useState, useEffect } from 'react'
import axios from 'axios'

interface LibraryProps {
  onSongSelect: (song: any) => void
}

export default function Library({ onSongSelect }: LibraryProps) {
  const [songs, setSongs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

  useEffect(() => {
    fetchLibrary()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchLibrary = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.get(`${API_URL}/library`)
      if (response.data.success) {
        setSongs(response.data.data)
      }
    } catch (err: any) {
      setError('Failed to load library')
      console.error('Library fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/library/${id}`)
      setSongs(songs.filter(song => song._id !== id))
      setDeleteConfirm(null)
    } catch (err) {
      console.error('Delete error:', err)
      alert('Failed to delete song')
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Loading your library...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
        <button
          onClick={fetchLibrary}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (songs.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-lg">
        <p className="text-2xl text-gray-600 mb-4">📚 Your library is empty</p>
        <p className="text-gray-500">Analyze and save songs to build your library!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          My Library ({songs.length} songs)
        </h2>
        <button
          onClick={fetchLibrary}
          className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          🔄 Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {songs.map((song) => (
          <div
            key={song._id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4"
          >
            {song.thumbnailUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={song.thumbnailUrl}
                alt={song.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            <h3 className="text-xl font-bold text-gray-800 mb-1 truncate">
              {song.title}
            </h3>
            <p className="text-gray-600 mb-3 truncate">{song.artist}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {song.bpm && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                  {song.bpm} BPM
                </span>
              )}
              {song.key && (
                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-sm">
                  {song.key}
                </span>
              )}
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => onSongSelect(song)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                View Details
              </button>
              {deleteConfirm === song._id ? (
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleDelete(song._id)}
                    className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                  >
                    ✓
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="px-3 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 text-sm"
                  >
                    ✗
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setDeleteConfirm(song._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  🗑️
                </button>
              )}
            </div>

            <p className="mt-3 text-xs text-gray-500">
              Added: {new Date(song.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
