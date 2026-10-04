import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Disc, Check, Mail, Lock, Unlock, X } from 'lucide-react';
import {
  LP_TRACKS_SIDE_ONE,
  LP_TRACKS_SIDE_TWO,
  ALBUM_CREDITS,
  LINER_NOTES,
  BAND_MEMBERS_CREDITS,
  PRESALE_CONFIG,
} from '../data/lovnisData';
import { TrackItem } from '../types';
import { vinylPlayer } from '../utils/audioPreview';

interface VinylSleeveProps {
  onOpenVideo?: (videoId: string) => void;
}

function parseDurationToSeconds(dur: string): number {
  const parts = dur.split(':');
  if (parts.length === 2) {
    return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
  }
  return 180;
}

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

export const VinylSleeve: React.FC<VinylSleeveProps> = () => {
  const allTracks = [...LP_TRACKS_SIDE_ONE, ...LP_TRACKS_SIDE_TWO];
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [activeArtworkView, setActiveArtworkView] = useState<'front' | 'mockup'>('front');

  // Album listening unlock via email state
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    try {
      return localStorage.getItem('lovnis_album_unlocked') === 'true';
    } catch {
      return false;
    }
  });
  const [listenerEmail, setListenerEmail] = useState<string>(() => {
    try {
      return localStorage.getItem('lovnis_listener_email') || '';
    } catch {
      return '';
    }
  });
  const [emailInput, setEmailInput] = useState('');
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [justUnlocked, setJustUnlocked] = useState(false);

  const currentTrack: TrackItem = allTracks[currentTrackIndex];
  const trackTotalSeconds = parseDurationToSeconds(currentTrack.duration);

  useEffect(() => {
    vinylPlayer.setUnlocked(isUnlocked);
    vinylPlayer.setMaxDuration(isUnlocked ? trackTotalSeconds : 30);
  }, [isUnlocked, trackTotalSeconds]);

  useEffect(() => {
    vinylPlayer.setCallbacks(
      (seconds) => {
        setSecondsElapsed(seconds);
      },
      (playing, trackNum) => {
        setIsPlaying(playing);
        if (trackNum !== null) {
          const idx = allTracks.findIndex((t) => t.number === trackNum && (trackNum <= 6 ? t.side === 'ONE' : t.side === 'TWO'));
          if (idx !== -1) setCurrentTrackIndex(idx);
        }
      }
    );
  }, [allTracks]);

  const handleUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) return;
    try {
      localStorage.setItem('lovnis_album_unlocked', 'true');
      localStorage.setItem('lovnis_listener_email', emailInput);
      const existing = JSON.parse(localStorage.getItem('lovnis_subscribers') || '[]');
      existing.push({ email: emailInput, source: 'album-player', date: new Date().toISOString() });
      localStorage.setItem('lovnis_subscribers', JSON.stringify(existing));
    } catch {
      // Ignore
    }
    setIsUnlocked(true);
    setListenerEmail(emailInput);
    vinylPlayer.setUnlocked(true);
    vinylPlayer.setMaxDuration(trackTotalSeconds);
    setShowUnlockModal(false);
    setJustUnlocked(true);

    // Automatically begin playback of the current track
    vinylPlayer.playTrack(currentTrack.number, 0);
  };

  const handlePlayPause = () => {
    if (!isUnlocked) {
      setShowUnlockModal(true);
      return;
    }

    if (isPlaying) {
      vinylPlayer.pause();
    } else {
      vinylPlayer.playTrack(currentTrack.number, secondsElapsed);
    }
  };

  const handleSelectTrack = (track: TrackItem) => {
    if (!isUnlocked) {
      const idx = allTracks.findIndex((t) => t.title === track.title);
      if (idx !== -1) setCurrentTrackIndex(idx);
      setShowUnlockModal(true);
      return;
    }

    const idx = allTracks.findIndex((t) => t.title === track.title);
    if (idx !== -1) {
      setCurrentTrackIndex(idx);
      setSecondsElapsed(0);
      vinylPlayer.setMaxDuration(parseDurationToSeconds(track.duration));
      vinylPlayer.playTrack(track.number, 0);
    }
  };

  const handleNextTrack = () => {
    const nextIdx = (currentTrackIndex + 1) % allTracks.length;
    setCurrentTrackIndex(nextIdx);
    setSecondsElapsed(0);
    if (isUnlocked) {
      vinylPlayer.setMaxDuration(parseDurationToSeconds(allTracks[nextIdx].duration));
      if (isPlaying) {
        vinylPlayer.playTrack(allTracks[nextIdx].number, 0);
      }
    }
  };

  const handlePrevTrack = () => {
    const prevIdx = (currentTrackIndex - 1 + allTracks.length) % allTracks.length;
    setCurrentTrackIndex(prevIdx);
    setSecondsElapsed(0);
    if (isUnlocked) {
      vinylPlayer.setMaxDuration(parseDurationToSeconds(allTracks[prevIdx].duration));
      if (isPlaying) {
        vinylPlayer.playTrack(allTracks[prevIdx].number, 0);
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    vinylPlayer.setVolume(v);
  };

  const maxDurationToShow = isUnlocked ? trackTotalSeconds : 30;

  return (
    <section id="vinyl-player" className="bg-white text-neutral-900 py-16 sm:py-24 px-6 sm:px-12 border-b-2 border-black">
      <div className="max-w-7xl mx-auto space-y-14">
        
        {/* ============================================================ */}
        {/* SECTION HEADER                                               */}
        {/* ============================================================ */}
        <div className="border-b-2 border-black pb-8">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="bg-[#E51B24] text-white px-2.5 py-0.5 text-xs font-oswald font-bold tracking-widest uppercase">
              12&quot; VINYL &amp; ALBUM PLAYER
            </span>
            <span className="text-xs sm:text-sm font-mono-space font-bold text-neutral-700 uppercase">
              NOW AVAILABLE FOR ONLINE LISTENING
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-archivo uppercase text-black tracking-tight leading-none">
              Listen to the Album
            </h2>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm font-mono-space">
              <span className="bg-neutral-100 border border-neutral-300 px-3 py-1 font-bold text-black uppercase">
                Online Release: {PRESALE_CONFIG.onlineReleaseDate}
              </span>
              <span className="text-[#E51B24] font-bold border border-[#E51B24] bg-red-50 px-3 py-1 uppercase">
                Vinyl Delivery: ~3 months
              </span>
            </div>
          </div>
          <p className="mt-4 text-base sm:text-lg text-neutral-700 max-w-3xl leading-relaxed">
            The full debut album by LOVNIS is available right now for listening on this website. Leave your email below to unlock direct streaming of all 13 tracks, recorded in Berlin with co-founder Amanda Longo.
          </p>
        </div>

        {/* ============================================================ */}
        {/* EMAIL UNLOCK STATUS BANNER                                   */}
        {/* ============================================================ */}
        <div className={`p-4 sm:p-5 border-2 ${isUnlocked ? 'bg-emerald-50 border-emerald-600 text-emerald-950' : 'bg-red-50 border-[#E51B24] text-neutral-900'} shadow-sm`}>
          {isUnlocked ? (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-archivo text-base sm:text-lg uppercase font-bold text-emerald-900">
                      Full Album Streaming Unlocked
                    </span>
                    <Unlock className="w-4 h-4 text-emerald-700" />
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-800">
                    Listening as: <strong>{listenerEmail || 'Guest Listener'}</strong>. Enjoy full playback of all 13 tracks on Side One &amp; Side Two.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setShowUnlockModal(true)}
                  className="text-xs font-oswald text-emerald-800 hover:text-black uppercase tracking-wider underline font-bold"
                >
                  Change Email
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#E51B24] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-archivo text-base sm:text-lg uppercase font-bold text-black">
                    Leave your email to listen to the full album on the website
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-700 mt-0.5">
                    Unlock immediate high-fidelity streaming of all 13 tracks before the physical release on 30.10.2026.
                  </p>
                </div>
              </div>

              {/* Quick Inline Unlock Form */}
              <form onSubmit={handleUnlockSubmit} className="flex flex-col sm:flex-row items-center gap-2 shrink-0">
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email to listen..."
                  className="bg-white border-2 border-black px-3.5 py-2 text-xs sm:text-sm text-black focus:outline-none focus:border-[#E51B24] min-w-[240px]"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[#E51B24] hover:bg-black text-white px-5 py-2 text-xs sm:text-sm font-oswald font-bold tracking-widest uppercase transition-colors shrink-0"
                >
                  UNLOCK ALBUM
                </button>
              </form>
            </div>
          )}
        </div>

        {/* ============================================================ */}
        {/* VINYL RECORD PLAYER INTERFACE                                */}
        {/* ============================================================ */}
        <div className="bg-[#111111] text-white border-4 border-black p-6 sm:p-10 shadow-2xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Turntable / Vinyl Sleeve Visual */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
                {/* Vinyl record spinning out */}
                <div
                  className={`absolute inset-0 rounded-full bg-neutral-950 border-4 border-neutral-800 shadow-2xl flex items-center justify-center transition-transform duration-700 ${
                    isPlaying ? 'translate-x-6 sm:translate-x-10 animate-spin [animation-duration:3s]' : 'translate-x-4 sm:translate-x-6'
                  }`}
                  style={{
                    background:
                      'radial-gradient(circle, #E51B24 0%, #B91C1C 22%, #111 23%, #171717 38%, #111 40%, #171717 60%, #111 62%, #1a1a1a 80%, #0a0a0a 100%)',
                  }}
                >
                  {/* Center Label */}
                  <div className="w-24 h-24 rounded-full bg-[#E51B24] border-2 border-white flex flex-col items-center justify-center text-center p-1 text-white shadow-inner">
                    <span className="font-archivo text-xs uppercase font-black tracking-wider">
                      LOVNIS
                    </span>
                    <span className="text-[9px] font-mono-space font-bold mt-0.5">
                      SIDE {currentTrack.side}
                    </span>
                    <span className="text-[8px] font-mono-space text-white/80">
                      33⅓ RPM
                    </span>
                    <div className="w-3 h-3 rounded-full bg-black border border-white mt-1" />
                  </div>
                </div>

                {/* Jacket Cover */}
                <div className="relative z-10 w-56 h-56 sm:w-72 sm:h-72 bg-neutral-900 border-2 border-neutral-700 shadow-xl overflow-hidden group">
                  <img
                    src="/src/assets/images/lovnis_vinyl_sleeve_1791066553631.jpg"
                    alt="LOVNIS Vinyl Cover"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-[#E51B24] text-white px-2 py-0.5 text-[10px] font-oswald font-bold tracking-widest uppercase">
                    30.10.2026
                  </div>
                </div>
              </div>

              <div className="mt-4 text-xs font-mono-space text-neutral-400 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-[#E51B24]" />
                <span>
                  {isUnlocked ? 'FULL ALBUM STREAMING ACTIVE' : 'LEAVE EMAIL TO LISTEN TO FULL ALBUM'}
                </span>
              </div>
            </div>

            {/* Right: Player Controls & Now Playing */}
            <div className="lg:col-span-7 space-y-6">
              {/* Now Playing Header */}
              <div className="border-b border-neutral-800 pb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-oswald tracking-widest text-[#E51B24] uppercase font-bold block">
                    {isUnlocked ? 'NOW PLAYING · FULL ALBUM STREAM' : 'NOW PREVIEWING · ENTER EMAIL TO UNLOCK FULL TRACK'}
                  </span>
                  {isUnlocked ? (
                    <span className="text-[10px] font-mono-space text-emerald-400 bg-emerald-950/80 px-2 py-0.5 border border-emerald-700 uppercase">
                      STREAM UNLOCKED
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono-space text-amber-300 bg-amber-950/80 px-2 py-0.5 border border-amber-700 uppercase">
                      EMAIL REQUIRED
                    </span>
                  )}
                </div>

                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-2xl sm:text-4xl font-archivo uppercase text-white tracking-wide truncate font-bold">
                    {String(currentTrack.number).padStart(2, '0')}. {currentTrack.title}
                  </h3>
                  <span className="text-xs sm:text-sm font-mono-space text-neutral-400 bg-neutral-900 px-2.5 py-1 border border-neutral-800 uppercase shrink-0">
                    SIDE {currentTrack.side} · LP {currentTrack.duration}
                  </span>
                </div>
                {currentTrack.guests && (
                  <p className="text-xs sm:text-sm text-[#E51B24] font-medium mt-1">
                    ★ {currentTrack.guests}
                  </p>
                )}
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="w-full bg-neutral-800 h-2 cursor-pointer relative overflow-hidden">
                  <div
                    className="bg-[#E51B24] h-full transition-all duration-300"
                    style={{ width: `${(secondsElapsed / maxDurationToShow) * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs font-mono-space text-neutral-400">
                  <span>{formatTime(secondsElapsed)}</span>
                  <span className="text-neutral-500">
                    {isUnlocked ? `FULL TRACK (${currentTrack.duration})` : '30S PREVIEW LIMIT · ENTER EMAIL FOR FULL'}
                  </span>
                  <span>{formatTime(maxDurationToShow)}</span>
                </div>
              </div>

              {/* Main Control Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrevTrack}
                    className="p-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-none border border-neutral-700 transition-colors"
                    aria-label="Previous track"
                  >
                    <SkipBack className="w-5 h-5" />
                  </button>

                  <button
                    onClick={handlePlayPause}
                    className="px-6 py-3.5 bg-[#E51B24] hover:bg-white hover:text-black text-white font-oswald font-bold tracking-widest text-sm uppercase transition-colors flex items-center gap-2.5 shadow-md"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-5 h-5 fill-current" />
                        <span>PAUSE</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 fill-current" />
                        <span>{isUnlocked ? 'PLAY FULL TRACK' : 'LISTEN TO ALBUM'}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleNextTrack}
                    className="p-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-none border border-neutral-700 transition-colors"
                    aria-label="Next track"
                  >
                    <SkipForward className="w-5 h-5" />
                  </button>
                </div>

                {/* Volume slider */}
                <div className="flex items-center gap-2 text-neutral-400 text-xs font-mono-space">
                  <Volume2 className="w-4 h-4 text-neutral-400 shrink-0" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-24 accent-[#E51B24]"
                    aria-label="Volume"
                  />
                  <span className="w-8 text-right">{Math.round(volume * 100)}%</span>
                </div>
              </div>

              {/* Notice */}
              <div className="pt-2 text-xs font-mono-space text-neutral-400 flex items-center gap-2">
                <Disc className="w-4 h-4 text-[#E51B24] shrink-0" />
                <span>
                  {isUnlocked
                    ? 'Click any song in Side One or Side Two below to play.'
                    : 'Album listening is available on the website! Enter your email to unlock all tracks.'}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* ============================================================ */}
        {/* TRACKLIST (SIDE ONE & SIDE TWO)                              */}
        {/* ============================================================ */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b-2 border-black">
            <h3 className="text-2xl sm:text-4xl font-archivo text-black uppercase tracking-tight">
              Tracklist
            </h3>
            <span className="text-sm font-oswald text-[#E51B24] uppercase font-bold tracking-wider">
              {isUnlocked ? 'CLICK ANY TRACK TO PLAY' : 'ENTER EMAIL TO LISTEN'}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* SIDE ONE */}
            <div className="bg-[#FAFAFA] border-2 border-black p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b-2 border-black">
                <div>
                  <span className="text-xs font-oswald text-[#E51B24] uppercase font-bold tracking-widest block">
                    SIDE ONE · 6 TRACKS
                  </span>
                  <h4 className="text-2xl font-archivo text-black uppercase font-bold">
                    LADO A
                  </h4>
                </div>
                <span className="text-xs font-mono-space bg-black text-white px-2 py-0.5 font-bold">
                  33⅓ RPM
                </span>
              </div>

              <div className="divide-y divide-neutral-200">
                {LP_TRACKS_SIDE_ONE.map((track) => {
                  const isCurrent = currentTrack.title === track.title;
                  return (
                    <div
                      key={track.number}
                      onClick={() => handleSelectTrack(track)}
                      className={`py-3.5 px-3 transition-colors cursor-pointer group flex flex-col ${
                        isCurrent ? 'bg-red-50 border-l-4 border-[#E51B24]' : 'hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <button
                            className={`w-7 h-7 flex items-center justify-center shrink-0 text-xs font-bold transition-colors ${
                              isCurrent && isPlaying
                                ? 'bg-[#E51B24] text-white'
                                : 'bg-black text-white group-hover:bg-[#E51B24]'
                            }`}
                            aria-label={`Play ${track.title}`}
                          >
                            {isCurrent && isPlaying ? (
                              <Pause className="w-3.5 h-3.5 fill-current" />
                            ) : (
                              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                            )}
                          </button>

                          <span className="font-mono-space font-bold text-sm text-[#E51B24] shrink-0">
                            {String(track.number).padStart(2, '0')}
                          </span>

                          <span className="font-archivo text-base sm:text-lg text-black uppercase tracking-wide group-hover:text-[#E51B24] transition-colors truncate font-semibold">
                            {track.title}
                          </span>
                        </div>

                        <span className="font-mono-space text-sm text-neutral-500 shrink-0 font-medium">
                          {track.duration}
                        </span>
                      </div>

                      {track.guests && (
                        <p className="mt-1 ml-10 text-xs sm:text-sm text-[#E51B24] font-medium">
                          ★ {track.guests}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SIDE TWO */}
            <div className="bg-[#FAFAFA] border-2 border-black p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b-2 border-black">
                <div>
                  <span className="text-xs font-oswald text-[#E51B24] uppercase font-bold tracking-widest block">
                    SIDE TWO · 7 TRACKS
                  </span>
                  <h4 className="text-2xl font-archivo text-black uppercase font-bold">
                    LADO B
                  </h4>
                </div>
                <span className="text-xs font-mono-space bg-black text-white px-2 py-0.5 font-bold">
                  33⅓ RPM
                </span>
              </div>

              <div className="divide-y divide-neutral-200">
                {LP_TRACKS_SIDE_TWO.map((track) => {
                  const isCurrent = currentTrack.title === track.title;
                  return (
                    <div
                      key={track.number}
                      onClick={() => handleSelectTrack(track)}
                      className={`py-3.5 px-3 transition-colors cursor-pointer group flex flex-col ${
                        isCurrent ? 'bg-red-50 border-l-4 border-[#E51B24]' : 'hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <button
                            className={`w-7 h-7 flex items-center justify-center shrink-0 text-xs font-bold transition-colors ${
                              isCurrent && isPlaying
                                ? 'bg-[#E51B24] text-white'
                                : 'bg-black text-white group-hover:bg-[#E51B24]'
                            }`}
                            aria-label={`Play ${track.title}`}
                          >
                            {isCurrent && isPlaying ? (
                              <Pause className="w-3.5 h-3.5 fill-current" />
                            ) : (
                              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                            )}
                          </button>

                          <span className="font-mono-space font-bold text-sm text-[#E51B24] shrink-0">
                            {String(track.number).padStart(2, '0')}
                          </span>

                          <span className="font-archivo text-base sm:text-lg text-black uppercase tracking-wide group-hover:text-[#E51B24] transition-colors truncate font-semibold">
                            {track.title}
                          </span>
                        </div>

                        <span className="font-mono-space text-sm text-neutral-500 shrink-0 font-medium">
                          {track.duration}
                        </span>
                      </div>

                      {track.guests && (
                        <p className="mt-1 ml-10 text-xs sm:text-sm text-[#E51B24] font-medium">
                          ★ {track.guests}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* ============================================================ */}
        {/* COVER ARTWORK DISPLAY & LOGOS OF STREAMING / MUSIC LINKS     */}
        {/* ============================================================ */}
        <div className="space-y-8 pt-8 border-t-2 border-black">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-3 border-b-2 border-black gap-2">
            <div>
              <span className="text-xs sm:text-sm font-oswald text-[#E51B24] uppercase font-bold tracking-wider block mb-1">
                PHYSICAL ARTIFACT
              </span>
              <h3 className="text-2xl sm:text-4xl font-archivo text-black uppercase tracking-tight">
                Album Artwork &amp; Mockup
              </h3>
            </div>
            
            <div className="flex items-center gap-1 bg-neutral-100 p-1 border border-neutral-300">
              <button
                onClick={() => setActiveArtworkView('front')}
                className={`px-3 py-1.5 text-xs font-oswald uppercase tracking-wider transition-colors ${
                  activeArtworkView === 'front' ? 'bg-black text-white' : 'text-neutral-700 hover:text-black'
                }`}
              >
                Front Cover
              </button>
              <button
                onClick={() => setActiveArtworkView('mockup')}
                className={`px-3 py-1.5 text-xs font-oswald uppercase tracking-wider transition-colors ${
                  activeArtworkView === 'mockup' ? 'bg-black text-white' : 'text-neutral-700 hover:text-black'
                }`}
              >
                Vinyl Mockup
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#FAFAFA] border-2 border-black p-6 sm:p-10">
            <div className="relative aspect-square max-w-md mx-auto w-full border-2 border-black overflow-hidden shadow-lg bg-neutral-900">
              <img
                src={
                  activeArtworkView === 'front'
                    ? '/src/assets/images/lovnis_vinyl_sleeve_1791066553631.jpg'
                    : '/src/assets/images/lovnis_vinyl_mockup_1791066564337.jpg'
                }
                alt="LOVNIS Album Artwork"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4">
              <span className="text-xs font-oswald tracking-widest text-[#E51B24] uppercase font-bold block">
                COVER ARTWORK BY MURILO SÁ
              </span>
              <h4 className="text-2xl sm:text-3xl font-archivo text-black uppercase font-bold">
                Tropicália Collage &amp; Berlin Noir
              </h4>
              <p className="text-base text-neutral-700 leading-relaxed font-sans">
                The visual identity of LOVNIS reflects their living spaces in Berlin: cut-up photographs, high-contrast halftones, full ashtrays, bold red cadmium fields, and handwritten poetry. Featuring Amanda Longo, Murilo Sá, Bernar Gomma and Putti.
              </p>
              <div className="p-4 bg-white border border-neutral-300 text-xs font-mono-space text-neutral-700 space-y-1">
                <div><strong>Format:</strong> 12&quot; Vinyl Gatefold LP + Digital FLAC/MP3</div>
                <div><strong>Online Release Date:</strong> {PRESALE_CONFIG.onlineReleaseDate}</div>
                <div><strong>Vinyl Delivery:</strong> {PRESALE_CONFIG.vinylDeliveryForecast}</div>
              </div>
            </div>
          </div>

          {/* Platform Logos */}
          <div className="bg-white border-2 border-black p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-black pb-4">
              <div>
                <span className="text-xs font-oswald tracking-widest text-[#E51B24] uppercase font-bold block mb-1">
                  OFFICIAL STREAMING &amp; DISCOGRAPHY LINKS
                </span>
                <h4 className="text-xl sm:text-2xl font-archivo text-black uppercase font-bold">
                  Listen &amp; Connect On Your Favorite Platform
                </h4>
              </div>
              <span className="text-xs font-mono-space text-neutral-600">
                OFFICIAL ARTIST LINKS
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {/* Bandcamp */}
              <a
                href="https://lovnis.bandcamp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border-2 border-neutral-300 hover:border-black hover:bg-neutral-50 flex flex-col items-center justify-center text-center group transition-colors shadow-xs"
              >
                <div className="w-12 h-12 flex items-center justify-center mb-2 text-[#629aa9] group-hover:text-[#E51B24] transition-colors">
                  <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24">
                    <path d="M0 18.75l7.437-13.5h16.563l-7.438 13.5z" />
                  </svg>
                </div>
                <span className="font-archivo text-sm uppercase text-black font-bold">Bandcamp</span>
                <span className="text-[11px] font-mono-space text-neutral-500 mt-0.5">Vinyl Pre-Sale</span>
              </a>

              {/* SoundCloud */}
              <a
                href="https://soundcloud.com/lovnis"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border-2 border-neutral-300 hover:border-black hover:bg-neutral-50 flex flex-col items-center justify-center text-center group transition-colors shadow-xs"
              >
                <div className="w-12 h-12 flex items-center justify-center mb-2 text-[#ff5500] group-hover:text-[#E51B24] transition-colors">
                  <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24">
                    <path d="M11.56 8.87V17h7.25c1.76 0 3.19-1.42 3.19-3.17s-1.43-3.18-3.19-3.18c-.28 0-.54.04-.79.11C17.65 9.17 16.27 8 14.62 8c-.68 0-1.32.2-1.86.56-.37-.77-1.15-1.31-2.07-1.31-.08 0-.15.01-.23.02v1.6zm-1.81.9v7.23h.91V9.45c-.32.09-.62.2-.91.32zm-1.82.8v6.43h.91v-6.2c-.31.11-.61.23-.91.37zm-1.81.82v5.61h.91v-5.41c-.31.12-.61.25-.91.4zm-1.82 1.01v4.6h.91v-4.42c-.31.12-.61.26-.91.42zm-1.82 1.25v3.35h.91v-3.18c-.3.13-.61.28-.91.43zm-1.81 1.7v1.65h.91v-1.46c-.3.14-.6.31-.91.48z" />
                  </svg>
                </div>
                <span className="font-archivo text-sm uppercase text-black font-bold">SoundCloud</span>
                <span className="text-[11px] font-mono-space text-neutral-500 mt-0.5">Audio Archives</span>
              </a>

              {/* Spotify */}
              <a
                href="https://open.spotify.com/search/LOVNIS"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border-2 border-neutral-300 hover:border-black hover:bg-neutral-50 flex flex-col items-center justify-center text-center group transition-colors shadow-xs"
              >
                <div className="w-12 h-12 flex items-center justify-center mb-2 text-[#1db954] group-hover:text-[#E51B24] transition-colors">
                  <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                  </svg>
                </div>
                <span className="font-archivo text-sm uppercase text-black font-bold">Spotify</span>
                <span className="text-[11px] font-mono-space text-neutral-500 mt-0.5">Pre-Save LP</span>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com/c/LOVNISDUO"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border-2 border-neutral-300 hover:border-black hover:bg-neutral-50 flex flex-col items-center justify-center text-center group transition-colors shadow-xs"
              >
                <div className="w-12 h-12 flex items-center justify-center mb-2 text-[#ff0000] group-hover:text-black transition-colors">
                  <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </div>
                <span className="font-archivo text-sm uppercase text-black font-bold">YouTube</span>
                <span className="text-[11px] font-mono-space text-neutral-500 mt-0.5">Concert Videos</span>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/lovnisduo/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border-2 border-neutral-300 hover:border-black hover:bg-neutral-50 flex flex-col items-center justify-center text-center group transition-colors shadow-xs"
              >
                <div className="w-12 h-12 flex items-center justify-center mb-2 text-[#e1306c] group-hover:text-[#E51B24] transition-colors">
                  <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <span className="font-archivo text-sm uppercase text-black font-bold">Instagram</span>
                <span className="text-[11px] font-mono-space text-neutral-500 mt-0.5">@lovnisduo</span>
              </a>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* BAND MEMBERS - INLINE THE FOUR LIKE IN THE BACK COVER ART     */}
        {/* ============================================================ */}
        <div className="space-y-8 pt-8 border-t-2 border-black">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-3 border-b-2 border-black gap-2">
            <div>
              <span className="text-xs sm:text-sm font-oswald text-[#E51B24] uppercase font-bold tracking-wider block mb-1">
                BACK COVER LINEUP &amp; RECORDING CREDITS
              </span>
              <h3 className="text-2xl sm:text-4xl font-archivo text-black uppercase tracking-tight">
                Band Members
              </h3>
            </div>
            <span className="text-xs sm:text-sm font-mono-space text-neutral-600 uppercase">
              BERLIN SESSIONS · 4-PIECE BAND
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BAND_MEMBERS_CREDITS.map((member, idx) => (
              <div
                key={idx}
                className="bg-white border-2 border-black p-4 flex flex-col justify-between shadow-xs hover:border-[#E51B24] transition-colors"
              >
                <div>
                  <div className="aspect-[4/5] w-full overflow-hidden bg-neutral-100 border border-black mb-3">
                    <img
                      src={member.image}
                      alt={member.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale contrast-125"
                    />
                  </div>

                  <h4 className="font-archivo text-lg sm:text-xl text-black uppercase font-bold">
                    {member.name}
                  </h4>

                  {member.years && (
                    <span className="text-xs font-mono-space text-[#E51B24] font-bold block mt-0.5">
                      ({member.years}) · {member.aka}
                    </span>
                  )}
                  {!member.years && member.aka && (
                    <span className="text-xs font-mono-space text-[#E51B24] font-bold block mt-0.5">
                      {member.aka}
                    </span>
                  )}

                  <p className="text-xs sm:text-sm text-neutral-700 mt-2 leading-relaxed">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* ALBUM CREDITS (WITH SPECIAL GUESTS INTEGRATED INSIDE)         */}
        {/* ============================================================ */}
        <div className="bg-[#FAFAFA] border-2 border-black p-8 sm:p-10 space-y-6">
          <div className="border-b-2 border-black pb-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <span className="text-xs sm:text-sm font-oswald text-[#E51B24] uppercase font-bold tracking-widest block mb-1">
                COMPREHENSIVE RECORDING METADATA
              </span>
              <h4 className="text-2xl sm:text-3xl font-archivo text-black uppercase font-bold">
                Album Credits &amp; Collaborators
              </h4>
            </div>
            <span className="text-xs font-mono-space text-neutral-500">
              BERLIN · 2026
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-sm sm:text-base text-neutral-800 leading-relaxed font-sans">
            <div className="lg:col-span-6 space-y-3">
              <p>
                <strong className="text-black font-semibold block uppercase font-oswald tracking-wide">
                  Production &amp; Tracking:
                </strong>
                {ALBUM_CREDITS.producedAndRecorded}
              </p>
              <p>
                <strong className="text-black font-semibold block uppercase font-oswald tracking-wide">
                  Mixing:
                </strong>
                {ALBUM_CREDITS.mixedBy}
              </p>
              <p>
                <strong className="text-black font-semibold block uppercase font-oswald tracking-wide">
                  Visual Art &amp; Design:
                </strong>
                {ALBUM_CREDITS.coverArtwork} · {ALBUM_CREDITS.albumDesign}
              </p>
              <p className="text-xs text-neutral-600 pt-2 border-t border-neutral-300">
                {ALBUM_CREDITS.photographers}
              </p>
            </div>

            <div className="lg:col-span-6 space-y-2 bg-white border border-neutral-300 p-5">
              <span className="text-xs font-oswald text-[#E51B24] uppercase font-bold tracking-widest block mb-1">
                SPECIAL GUEST MUSICIANS
              </span>
              <ul className="space-y-2 text-xs sm:text-sm text-neutral-700">
                {ALBUM_CREDITS.specialGuests.map((guest, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#E51B24] font-bold">★</span>
                    <span>{guest}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* LINER NOTES ESSAY (MURILO SÁ)                                */}
        {/* ============================================================ */}
        <div className="bg-[#FAFAFA] border-2 border-black p-8 sm:p-12 lg:p-14 space-y-8 shadow-sm">
          <div className="border-b-2 border-black pb-6">
            <span className="text-xs sm:text-sm font-oswald text-[#E51B24] uppercase font-bold tracking-widest block mb-1">
              ALBUM ESSAY &amp; MANIFESTO
            </span>
            <h3 className="text-2xl sm:text-4xl font-archivo text-black uppercase tracking-tight font-bold">
              {LINER_NOTES.dedication}
            </h3>
            <span className="text-xs sm:text-sm font-mono-space text-neutral-600 block mt-2">
              BERLIN, GERMANY · WRITTEN BY MURILO SÁ
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 text-sm sm:text-base text-neutral-800 leading-relaxed font-sans">
            <div className="space-y-4">
              <p className="whitespace-pre-line">
                {LINER_NOTES.columns[0]}
              </p>
            </div>

            <div className="space-y-4">
              <p className="whitespace-pre-line">
                {LINER_NOTES.columns[1]}
              </p>
            </div>

            <div className="space-y-4 flex flex-col justify-between">
              <p className="whitespace-pre-line">
                {LINER_NOTES.columns[2]}
              </p>

              <div className="pt-6 border-t-2 border-black mt-6">
                <span className="text-3xl font-caveat text-black block">
                  {LINER_NOTES.authorSignature}
                </span>
                <span className="text-xs font-mono-space text-neutral-600 block mt-1">
                  Murilo Sá · Berlin
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ============================================================ */}
      {/* EMAIL UNLOCK MODAL                                           */}
      {/* ============================================================ */}
      {showUnlockModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white border-4 border-black max-w-lg w-full p-6 sm:p-8 text-black relative shadow-2xl space-y-5">
            <button
              onClick={() => setShowUnlockModal(false)}
              className="absolute top-4 right-4 text-black hover:text-[#E51B24] p-1"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-[#E51B24] text-white px-2 py-0.5 text-xs font-oswald font-bold uppercase tracking-widest">
                  EXCLUSIVE ONLINE STREAM
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-archivo uppercase text-black font-bold">
                Listen to the Full LOVNIS Debut LP
              </h3>
            </div>

            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
              The entire 13-track debut album is available for listening on the website right now. Just leave your email below to unlock instant streaming:
            </p>

            <form onSubmit={handleUnlockSubmit} className="space-y-4 pt-2">
              <div className="relative">
                <Mail className="w-5 h-5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  autoFocus
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full bg-neutral-50 border-2 border-black pl-11 pr-4 py-3 text-sm text-black focus:outline-none focus:border-[#E51B24]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#E51B24] hover:bg-black text-white py-3.5 text-sm font-oswald font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2"
              >
                <span>UNLOCK &amp; START PLAYING</span>
                <Play className="w-4 h-4 fill-current" />
              </button>
            </form>

            <div className="pt-2 text-xs font-mono-space text-neutral-500 border-t border-neutral-200 text-center">
              ✓ Instant streaming access · Debut LP drops on 30.10.2026
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
