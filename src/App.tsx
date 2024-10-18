import React, { useState, useEffect } from 'react';
import { Music, Plus, Disc } from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from './db';
import CategorySelector from './components/CategorySelector';
import SongRoulette from './components/SongRoulette';
import KaraokePlayer from './components/KaraokePlayer';
import AddSongForm from './components/AddSongForm';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const categories = useLiveQuery(() => db.songs.orderBy('category').uniqueKeys());

  const songs = useLiveQuery(
    () => db.songs.where('category').equals(selectedCategory || '').toArray(),
    [selectedCategory]
  );

  useEffect(() => {
    if (categories && categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0] as string);
    }
  }, [categories, selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 text-white">
      <header className="bg-black bg-opacity-50 p-4">
        <h1 className="text-3xl font-bold flex items-center">
          <Music className="mr-2" /> Karaoke Roulette
        </h1>
      </header>
      <main className="container mx-auto p-4">
        {!selectedSong && (
          <>
            <CategorySelector
              categories={categories || []}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
            {selectedCategory && songs && (
              <SongRoulette songs={songs} onSelectSong={setSelectedSong} />
            )}
            <button
              className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center"
              onClick={() => setShowAddForm(true)}
            >
              <Plus className="mr-2" /> Agregar Canción
            </button>
          </>
        )}
        {selectedSong && (
          <KaraokePlayer
            song={selectedSong}
            onClose={() => setSelectedSong(null)}
          />
        )}
        {showAddForm && (
          <AddSongForm
            onClose={() => setShowAddForm(false)}
            onAddSong={(newSong) => {
              db.songs.add(newSong);
              setShowAddForm(false);
            }}
          />
        )}
      </main>
      <footer className="bg-black bg-opacity-50 p-4 mt-8">
        <p className="text-center flex items-center justify-center">
          <Disc className="mr-2" /> © 2024 Karaoke Roulette
        </p>
      </footer>
    </div>
  );
}

export default App;