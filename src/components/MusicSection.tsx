import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { ALL_VIDEOS } from '../data/lovnisData';
import { VideoItem } from '../types';

interface MusicSectionProps {
  onSelectVideo: (video: VideoItem) => void;
}

export const MusicSection: React.FC<MusicSectionProps> = ({ onSelectVideo }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'music-video' | 'live'>('all');

  const filteredVideos = ALL_VIDEOS.filter((v) => {
    if (activeFilter === 'all') return true;
    return v.category === activeFilter;
  });

  return (
    <section id="music" className="bg-[#FAF9F6] text-neutral-900 py-16 sm:py-24 px-6 sm:px-12 border-b-2 border-black">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header & Filter Controls */}
        <div className="border-b-2 border-black pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs sm:text-sm font-oswald tracking-widest text-[#E51B24] uppercase font-bold block mb-1">
              CINEMATIC &amp; LIVE CONCERT ARCHIVE
            </span>
            <h2
              id="music-heading"
              className="text-4xl sm:text-6xl font-archivo text-black tracking-tight uppercase"
            >
              Videos &amp; Archives
            </h2>
          </div>

          {/* Filter Bar (Tabbed Segmented Control) */}
          <div className="flex items-center gap-1 bg-white p-1 border-2 border-black shadow-xs">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-oswald uppercase tracking-wider font-bold transition-colors ${
                activeFilter === 'all'
                  ? 'bg-black text-white'
                  : 'text-neutral-700 hover:text-black'
              }`}
            >
              All Videos ({ALL_VIDEOS.length})
            </button>
            <button
              onClick={() => setActiveFilter('music-video')}
              className={`px-3.5 py-1.5 text-xs font-oswald uppercase tracking-wider font-bold transition-colors ${
                activeFilter === 'music-video'
                  ? 'bg-black text-white'
                  : 'text-neutral-700 hover:text-black'
              }`}
            >
              Music Videos ({ALL_VIDEOS.filter((v) => v.category === 'music-video').length})
            </button>
            <button
              onClick={() => setActiveFilter('live')}
              className={`px-3.5 py-1.5 text-xs font-oswald uppercase tracking-wider font-bold transition-colors ${
                activeFilter === 'live'
                  ? 'bg-black text-white'
                  : 'text-neutral-700 hover:text-black'
              }`}
            >
              Live Sets ({ALL_VIDEOS.filter((v) => v.category === 'live').length})
            </button>
          </div>
        </div>

        {/* 4 In The Same Row Grid (Mirroring inline band members layout) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => onSelectVideo(video)}
              className="bg-white border-2 border-black p-3 hover:border-[#E51B24] transition-colors group cursor-pointer flex flex-col justify-between shadow-xs"
            >
              <div>
                {/* Compact Thumbnail Container */}
                <div className="relative aspect-video w-full overflow-hidden bg-neutral-900 border border-black mb-3">
                  <img
                    src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 flex items-center justify-center transition-colors">
                    <div className="w-10 h-10 bg-black/90 text-white group-hover:bg-[#E51B24] flex items-center justify-center transition-colors border border-neutral-700 shadow-md">
                      <Play className="w-4 h-4 ml-0.5 fill-current" />
                    </div>
                  </div>

                  {video.year && (
                    <span className="absolute top-2 left-2 bg-black text-white px-1.5 py-0.5 text-[10px] font-mono-space font-bold uppercase">
                      {video.year}
                    </span>
                  )}
                  <span className="absolute bottom-2 right-2 bg-black/80 text-white px-1.5 py-0.5 text-[9px] font-mono-space uppercase">
                    {video.category === 'music-video' ? 'CLIP' : 'LIVE'}
                  </span>
                </div>

                <h4 className="font-archivo text-sm sm:text-base text-black uppercase group-hover:text-[#E51B24] transition-colors font-bold leading-tight line-clamp-1">
                  {video.title}
                </h4>

                <p className="text-xs text-neutral-600 mt-1 line-clamp-2 leading-relaxed">
                  {video.description}
                </p>
              </div>

              <div className="pt-2 mt-2 border-t border-neutral-200 flex items-center justify-between text-[11px] font-oswald font-bold tracking-wider text-black group-hover:text-[#E51B24] uppercase">
                <span>PLAY VIDEO</span>
                <span>▶</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
