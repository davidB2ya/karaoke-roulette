import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { Song } from '../db';

interface AddSongFormProps {
  onClose: () => void;
  onAddSong: (song: Song) => void;
}

const AddSongForm: React.FC<AddSongFormProps> = ({ onClose, onAddSong }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [artist, setArtist] = useState('');
  const [youtubeId, setYoutubeId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSong: Song = { name, category, artist, youtubeId };
    onAddSong(newSong);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Agregar Nueva Canción</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Nombre de la Canción
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 rounded-md text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium mb-1">
              Categoría
            </label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 rounded-md text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="artist" className="block text-sm font-medium mb-1">
              Artista
            </label>
            <input
              type="text"
              id="artist"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 rounded-md text-white"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="youtubeId" className="block text-sm font-medium mb-1">
              ID del Video de YouTube
            </label>
            <input
              type="text"
              id="youtubeId"
              value={youtubeId}
              onChange={(e) => setYoutubeId(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 rounded-md text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
          >
            <Save className="mr-2" /> Guardar Canción
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSongForm;