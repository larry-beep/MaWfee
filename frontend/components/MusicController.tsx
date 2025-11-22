'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MusicControllerProps {
  enabled: boolean;
  onToggle: () => void;
}

export function MusicController({ enabled, onToggle }: MusicControllerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  if (!enabled) return null;

  return (
    <>
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        loop
        src="/music/romantic-background.mp3"
        preload="auto"
      />

      {/* Music Control Button */}
      <motion.div
        className="fixed top-6 right-6 z-40"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="glass rounded-full p-1">
          <button
            onClick={toggleMusic}
            className="w-12 h-12 rounded-full bg-accent-primary/20 hover:bg-accent-primary/30 transition-colors flex items-center justify-center text-white group relative"
          >
            {isPlaying ? '⏸' : '🎵'}

            {/* Volume Slider - Appears on hover */}
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="glass rounded-full p-3 flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 accent-accent-primary"
                />
                <span className="text-white/60 text-xs whitespace-nowrap">
                  {Math.round(volume * 100)}%
                </span>
              </div>
            </div>
          </button>
        </div>
      </motion.div>
    </>
  );
}