import React, { useState, useEffect } from 'react';
import { Disc, Music } from 'lucide-react';
import Roulette from 'react-roulette-pro';
import 'react-roulette-pro/dist/index.css';
import { Song } from '../db';

interface SongRouletteProps {
  songs: Song[];
  onSelectSong: (song: Song) => void;
}

const SongRoulette: React.FC<SongRouletteProps> = ({ songs, onSelectSong }) => {
  const [prizeIndex, setPrizeIndex] = useState(0);
  const [start, setStart] = useState(false);
  const [winnerSong, setWinnerSong] = useState<Song | null>(null);

  const prizes = songs.map((song, index) => ({
    id: index.toString(),
    image: `https://img.youtube.com/vi/${song.youtubeId}/0.jpg`,
    text: song.name,
  }));

  const handleStart = () => {
    if (!start) {
      setPrizeIndex(Math.floor(Math.random() * songs.length));
      setStart(true);
      setWinnerSong(null);
    }
  };

  const handlePrizeDefined = () => {
    const selectedSong = songs[prizeIndex];
    setWinnerSong(selectedSong);
    setTimeout(() => onSelectSong(selectedSong), 1000);
  };

  useEffect(() => {
    if (winnerSong) {
      const timer = setTimeout(() => {
        setStart(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [winnerSong]);

  return (
    <div className="mb-8 bg-gradient-to-r from-purple-800 to-indigo-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 flex items-center justify-center text-yellow-300">
        <Disc className="mr-3" size={32} /> Ruleta Musical
      </h2>
      <div className="bg-gray-900 p-6 rounded-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-20"></div>
        <Roulette
          prizes={prizes}
          prizeIndex={prizeIndex}
          start={start}
          onPrizeDefined={handlePrizeDefined}
          spinningTime={5} // Reducido de 7 a 5 segundos
          classes={{
            wrapper: 'roulette-wrapper custom-roulette',
            container: 'roulette-container',
            prize: 'roulette-prize',
          }}
          options={{
            stopInCenter: true,
            withoutAnimation: false,
            animationDuration: '0.5s', // Reducido de 1s a 0.5s
          }}
        />
        <button
          className={`mt-6 w-full text-lg font-bold py-3 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300 ${
            start
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-yellow-400 hover:bg-yellow-500 text-gray-900'
          }`}
          onClick={handleStart}
          disabled={start}
        >
          {start ? 'Girando...' : '¡Girar la Ruleta!'}
        </button>
      </div>
      {winnerSong && (
        <div className="mt-6 text-center animate-fade-in-up">
          <h3 className="text-2xl font-bold text-yellow-300 mb-2">¡Canción Seleccionada!</h3>
          <p className="text-xl">
            <Music className="inline mr-2" />
            {winnerSong.name} - {winnerSong.artist}
          </p>
        </div>
      )}
    </div>
  );
};

export default SongRoulette;