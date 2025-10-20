import { useState, useRef } from 'react'
import axios from 'axios'

interface UploadSectionProps {
  onAnalysisComplete: (data: any) => void
}

export default function UploadSection({ onAnalysisComplete }: UploadSectionProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadMethod, setUploadMethod] = useState<'upload' | 'text'>('upload')
  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

  const handleFileUpload = async (file: File) => {
    setLoading(true)
    setError(null)

    try {
      // Upload file
      const formData = new FormData()
      formData.append('audio', file)

      const uploadRes = await axios.post(`${API_URL}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      if (uploadRes.data.success) {
        // Analyze the uploaded file
        const analyzeRes = await axios.post(`${API_URL}/analyze`, {
          filename: uploadRes.data.file.filename,
        })

        if (analyzeRes.data.success) {
          onAnalysisComplete(analyzeRes.data.data)
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to process audio file')
      console.error('Upload error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleTextSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const analyzeRes = await axios.post(`${API_URL}/analyze`, {
        title,
        artist,
      })

      if (analyzeRes.data.success) {
        onAnalysisComplete(analyzeRes.data.data)
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to analyze song')
      console.error('Analysis error:', err)
    } finally {
      setLoading(false)
    }
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
        const audioFile = new File([audioBlob], 'recording.wav', { type: 'audio/wav' })
        handleFileUpload(audioFile)
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (err) {
      setError('Failed to access microphone')
      console.error('Recording error:', err)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Analyze a Song</h2>

      {/* Method Selector */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setUploadMethod('upload')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            uploadMethod === 'upload'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Upload/Record Audio
        </button>
        <button
          onClick={() => setUploadMethod('text')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            uploadMethod === 'text'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Search by Title
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {uploadMethod === 'upload' ? (
        <div className="space-y-4">
          {/* File Upload */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleFileUpload(file)
              }}
              className="hidden"
              disabled={loading}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
            >
              {loading ? 'Processing...' : '📁 Choose Audio File'}
            </button>
            <p className="mt-2 text-sm text-gray-500">
              Supported formats: MP3, WAV, M4A, etc.
            </p>
          </div>

          {/* Recording */}
          <div className="text-center">
            <button
              onClick={isRecording ? stopRecording : startRecording}
              disabled={loading}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                isRecording
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              } disabled:bg-gray-400`}
            >
              {isRecording ? '⏹️ Stop Recording' : '🎤 Record Audio'}
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleTextSearch} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Song Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter song title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Artist Name
            </label>
            <input
              type="text"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter artist name"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-medium"
          >
            {loading ? 'Analyzing...' : '🔍 Analyze Song'}
          </button>
        </form>
      )}

      {loading && (
        <div className="mt-4 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-sm text-gray-600">Analyzing your song...</p>
        </div>
      )}
    </div>
  )
}
