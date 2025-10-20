import { useState } from 'react'
import Head from 'next/head'
import UploadSection from '@/components/UploadSection'
import SongDetails from '@/components/SongDetails'
import Library from '@/components/Library'

export default function Home() {
  const [currentSong, setCurrentSong] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<'analyze' | 'library'>('analyze')
  const [refreshLibrary, setRefreshLibrary] = useState(0)

  const handleAnalysisComplete = (songData: any) => {
    setCurrentSong(songData)
  }

  const handleSongSaved = () => {
    setRefreshLibrary(prev => prev + 1)
  }

  return (
    <>
      <Head>
        <title>TabGeni - Song Analysis & Tabs</title>
        <meta name="description" content="Analyze songs from audio or text" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        {/* Header */}
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              🎵 TabGeni
            </h1>
            <p className="mt-2 text-gray-600">
              Analyze songs from audio or text - Get tabs, chords, and backing tracks
            </p>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="flex space-x-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('analyze')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'analyze'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Analyze Song
            </button>
            <button
              onClick={() => setActiveTab('library')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'library'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              My Library
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'analyze' ? (
            <div className="space-y-8">
              <UploadSection onAnalysisComplete={handleAnalysisComplete} />
              {currentSong && (
                <SongDetails song={currentSong} onSongSaved={handleSongSaved} />
              )}
            </div>
          ) : (
            <Library key={refreshLibrary} onSongSelect={setCurrentSong} />
          )}
        </div>
      </main>
    </>
  )
}
