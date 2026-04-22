import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, ListMusic } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Track } from '../types';
import Visualizer from './Visualizer';

const DUMMY_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Neon Drift',
    artist: 'CyberGen AI',
    duration: 185,
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    color: '#00f3ff'
  },
  {
    id: '2',
    title: 'Cyber Sunset',
    artist: 'SynthWave-V3',
    duration: 210,
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    color: '#ff00ff'
  },
  {
    id: '3',
    title: 'Data Pulse',
    artist: 'Logic Nodes',
    duration: 145,
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    color: '#39ff14'
  }
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const currentTrack = DUMMY_TRACKS[currentTrackIndex];

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % DUMMY_TRACKS.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play();
    }
  }, [currentTrackIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', nextTrack);
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', nextTrack);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-md glass-panel p-6" id="music-player">
      <audio ref={audioRef} src={currentTrack.url} />
      
      <div className="flex items-center gap-4 mb-6">
        <div 
          className="w-16 h-16 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center relative overflow-hidden"
        >
          <motion.div 
            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-dashed border-white/20 rounded-full"
          />
          <ListMusic className="absolute w-8 h-8 opacity-30 text-white" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold truncate text-white tracking-tight">
            {currentTrack.title}
          </h3>
          <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold truncate">{currentTrack.artist}</p>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex justify-center">
          <Visualizer isPlaying={isPlaying} color="#00ffff" />
        </div>
        
        <div className="space-y-2">
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-neon-cyan to-neon-pink" 
              style={{ width: `${progress}%` }}
              transition={{ type: "spring", bounce: 0, duration: 0.1 }}
            />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-white/30 uppercase font-bold tracking-widest">
            <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
            <span>{formatTime(currentTrack.duration)}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-8">
        <button 
          onClick={prevTrack}
          className="text-white/40 hover:text-white transition-colors"
          id="prev-track"
        >
          <SkipBack className="w-6 h-6" />
        </button>
        
        <button 
          onClick={togglePlay}
          className="w-14 h-14 rounded-full flex items-center justify-center bg-white fill-black text-black hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          id="play-pause-btn"
        >
          {isPlaying ? <Pause className="w-6 h-6 fill-black" /> : <Play className="w-6 h-6 fill-black ml-1" />}
        </button>

        <button 
          onClick={nextTrack}
          className="text-white/40 hover:text-white transition-colors"
          id="next-track"
        >
          <SkipForward className="w-6 h-6" />
        </button>
      </div>

      <div className="mt-8 pt-6 border-t border-white/5">
        <div className="flex items-center gap-3 text-white/20 hover:text-white/40 transition-colors cursor-pointer group">
          <div className="flex-shrink-0">
            <Volume2 className="w-4 h-4" />
          </div>
          <div className="h-1 bg-white/5 rounded-full flex-1 overflow-hidden">
            <div className="h-full bg-white/20 group-hover:bg-white/40 w-3/4 transition-all" />
          </div>
        </div>
      </div>
    </div>
  );
}
