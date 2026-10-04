import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { LP_TRACKS_SIDE_ONE, LP_TRACKS_SIDE_TWO } from '../data/lovnisData';
import { TrackItem } from '../types';
import { vinylPlayer } from '../utils/audioPreview';

interface SamplyPlayerProps {
  listenerEmail?: string;
  onTrackChange?: (track: TrackItem) => void;
}

export const SamplyPlayer: React.FC<SamplyPlayerProps> = ({ onTrackChange }) => {
  const allTracks = [...LP_TRACKS_SIDE_ONE, ...LP_TRACKS_SIDE_TWO];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  const currentTrack = allTracks[currentIdx];

  const parseSeconds = (dur: string) => {
    const p = dur.split(':');
    return p.length === 2 ? parseInt(p[0], 10) * 60 + parseInt(p[1], 10) : 180;
  };
  const totalTrackSeconds = parseSeconds(currentTrack.duration);

  useEffect(() => {
    vinylPlayer.setUnlocked(true);
    vinylPlayer.setMaxDuration(totalTrackSeconds);
    vinylPlayer.setCallbacks(
      (sec) => setSeconds(sec),
      (playing, trackNum) => {
        setIsPlaying(playing);
        if (trackNum !== null) {
          const idx = allTracks.findIndex(
            (t) => t.number === trackNum && (trackNum <= 6 ? t.side === 'ONE' : t.side === 'TWO')
          );
          if (idx !== -1) {
            setCurrentIdx(idx);
            onTrackChange?.(allTracks[idx]);
          }
        }
      }
    );
  }, [allTracks, totalTrackSeconds, onTrackChange]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      vinylPlayer.pause();
    } else {
      vinylPlayer.playTrack(currentTrack.number, seconds);
    }
  };

  const handleSelectTrack = (idx: number) => {
    setCurrentIdx(idx);
    setSeconds(0);
    vinylPlayer.setMaxDuration(parseSeconds(allTracks[idx].duration));
    vinylPlayer.playTrack(allTracks[idx].number, 0);
    onTrackChange?.(allTracks[idx]);
  };

  const handleNext = () => {
    const next = (currentIdx + 1) % allTracks.length;
    handleSelectTrack(next);
  };

  const handlePrev = () => {
    const prev = (currentIdx - 1 + allTracks.length) % allTracks.length;
    handleSelectTrack(prev);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      vinylPlayer.setVolume(volume);
    } else {
      setIsMuted(true);
      vinylPlayer.setVolume(0);
    }
  };

  const progressPercent = Math.min(100, (seconds / totalTrackSeconds) * 100);

  return (
    <div className="bg-[#0A0A0A] border border-neutral-800 text-white px-3 py-1.5 select-none shadow-xs">
      <div className="flex items-center justify-between gap-2.5">
        
        {/* Left: Small Album Cover Icon + Compact Playback Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 bg-neutral-900 border border-neutral-700 overflow-hidden">
            <img
              src="/assets/drive/cover-art.jpg"
              alt="LOVNIS Album Art"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              className="w-6 h-6 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
              title="Previous Track"
              aria-label="Previous Track"
            >
              <SkipBack className="w-3 h-3" />
            </button>

            <button
              onClick={handleTogglePlay}
              className="w-7 h-7 bg-[#E51B24] hover:bg-white hover:text-black text-white flex items-center justify-center transition-colors shadow-xs"
              title={isPlaying ? 'Pause' : 'Play'}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 fill-current" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              )}
            </button>

            <button
              onClick={handleNext}
              className="w-6 h-6 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
              title="Next Track"
              aria-label="Next Track"
            >
              <SkipForward className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Center: Track Info + Inline Thin Progress Scrubber */}
        <div className="flex-1 min-w-0 px-2 space-y-1">
          <div className="flex items-center justify-between gap-2 text-[11px]">
            <div className="flex items-center gap-1.5 truncate">
              <span className="text-[9px] font-mono-space text-[#E51B24] uppercase font-bold shrink-0">
                SIDE {currentTrack.side} · #{String(currentTrack.number).padStart(2, '0')}
              </span>
              <span className="text-white text-xs font-sans font-normal truncate">
                {currentTrack.title}
              </span>
              {currentTrack.guests && (
                <span className="text-neutral-400 text-[10px] truncate hidden md:inline">
                  (★ {currentTrack.guests})
                </span>
              )}
            </div>

            <div className="text-[10px] font-mono-space text-neutral-400 shrink-0">
              {formatTime(seconds)} / {currentTrack.duration}
            </div>
          </div>

          {/* Minimal 2px Scrubber Line */}
          <div
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const ratio = Math.max(0, Math.min(1, clickX / rect.width));
              const targetSec = Math.floor(ratio * totalTrackSeconds);
              vinylPlayer.seek(targetSec);
              setSeconds(targetSec);
            }}
            className="relative h-1 w-full bg-neutral-800 hover:h-1.5 transition-all cursor-pointer overflow-hidden rounded-xs"
          >
            <div
              className="absolute left-0 top-0 bottom-0 bg-[#E51B24] transition-all duration-100"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Right: Slim Volume Slider */}
        <div className="hidden sm:flex items-center gap-1 shrink-0 pl-1">
          <button
            onClick={toggleMute}
            className="text-neutral-400 hover:text-white transition-colors p-0.5"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              const v = parseFloat(e.target.value);
              setVolume(v);
              setIsMuted(false);
              vinylPlayer.setVolume(v);
            }}
            className="w-12 h-1 accent-[#E51B24] cursor-pointer"
          />
        </div>

      </div>
    </div>
  );
};
