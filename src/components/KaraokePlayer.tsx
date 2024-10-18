import React, { useState, useEffect, useRef } from 'react';
import YouTube from 'react-youtube';
import { X, Volume2, VolumeX } from 'lucide-react';
import { Song } from '../db';

interface KaraokePlayerProps {
  song: Song;
  onClose: () => void;
}

const KaraokePlayer: React.FC<KaraokePlayerProps> = ({ song, onClose }) => {
  const [player, setPlayer] = useState<any>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const muteIntervalsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    return () => {
      muteIntervalsRef.current.forEach(clearTimeout);
    };
  }, []);

  const onReady = (event: { target: any }) => {
    setPlayer(event.target);
    setIsReady(true);
    scheduleMuteIntervals(event.target);
  };

  const scheduleMuteIntervals = (ytPlayer: any) => {
    const duration = ytPlayer.getDuration();
    const intervals = 3;
    const muteDuration = 30;

    for (let i = 0; i < intervals; i++) {
      const startTime = Math.random() * (duration - muteDuration);
      const muteInterval = setTimeout(() => {
        ytPlayer.mute();
        setIsMuted(true);
        setTimeout(() => {
          ytPlayer.unMute();
          setIsMuted(false);
        }, muteDuration * 1000);
      }, startTime * 1000);
      muteIntervalsRef.current.push(muteInterval);
    }
  };

  const toggleMute = () => {
    if (player) {
      if (isMuted) {
        player.unMute();
      } else {
        player.mute();
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-4 rounded-lg w-full max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{song.name}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <div className="aspect-w-16 aspect-h-9 mb-4">
          {song.youtubeId && (
            <YouTube
              videoId={song.youtubeId}
              opts={{
                height: '100%',
                width: '100%',
                playerVars: {
                  autoplay: 1,
                  modestbranding: 1,
                  rel: 0,
                },
              }}
              onReady={onReady}
            />
          )}
        </div>
        <div className="flex justify-between items-center">
          <p className="text-lg">
            Artista: <span className="font-semibold">{song.artist}</span>
          </p>
          <button
            onClick={toggleMute}
            className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center ${
              !isReady ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={!isReady}
          >
            {isMuted ? <VolumeX className="mr-2" /> : <Volume2 className="mr-2" />}
            {isMuted ? 'Activar Sonido' : 'Silenciar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default KaraokePlayer;