import React from 'react';

export const StreamingLinksBar: React.FC = () => {
  return (
    <div
      id="streaming-links-bar"
      className="sticky top-16 sm:top-20 z-40 bg-[#0D0D0D] text-neutral-300 border-b border-neutral-800 text-xs py-2 px-4 sm:px-8 select-none shadow-sm"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
        
        {/* Label - ONLY OFFICIAL LINKS as requested */}
        <div className="flex items-center gap-2 text-[10px] font-mono-space uppercase tracking-widest text-neutral-400">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E51B24] inline-block animate-pulse" />
          <span className="font-bold text-neutral-200">
            OFFICIAL LINKS
          </span>
        </div>

        {/* Discreet Icon + Label Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-mono-space">
          {/* Bandcamp */}
          <a
            href="https://lovnis.bandcamp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors group py-0.5"
            title="Bandcamp · Pre-Sale"
          >
            <svg className="w-3.5 h-3.5 fill-current text-[#629aa9] group-hover:text-white transition-colors" viewBox="0 0 24 24">
              <path d="M0 18.75l7.437-13.5h16.563l-7.438 13.5z" />
            </svg>
            <span className="text-[11px] font-sans font-medium text-white group-hover:text-[#E51B24] transition-colors">Bandcamp</span>
            <span className="text-[9px] bg-[#E51B24]/20 border border-[#E51B24]/40 text-[#ff6b6b] px-1.5 py-0.2 uppercase font-bold">
              Pre-Sale
            </span>
          </a>

          <span className="text-neutral-700 hidden sm:inline">|</span>

          {/* Spotify (Placed right after Bandcamp) */}
          <a
            href="https://open.spotify.com/search/LOVNIS"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors group py-0.5"
            title="Spotify · Pre-Save"
          >
            <svg className="w-3.5 h-3.5 fill-current text-[#1db954] group-hover:text-white transition-colors" viewBox="0 0 24 24">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
            <span className="text-[11px] font-sans font-medium text-white group-hover:text-[#E51B24] transition-colors">Spotify</span>
            <span className="text-[9px] bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 px-1.5 py-0.2 uppercase font-bold">
              Pre-Save
            </span>
          </a>

          <span className="text-neutral-700 hidden sm:inline">|</span>

          {/* SoundCloud (Audio Reel removed) */}
          <a
            href="https://soundcloud.com/lovnis"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors group py-0.5"
            title="SoundCloud"
          >
            <svg className="w-3.5 h-3.5 fill-current text-[#ff5500] group-hover:text-white transition-colors" viewBox="0 0 24 24">
              <path d="M11.56 8.87V17h7.25c1.76 0 3.19-1.42 3.19-3.17s-1.43-3.18-3.19-3.18c-.28 0-.54.04-.79.11C17.65 9.17 16.27 8 14.62 8c-.68 0-1.32.2-1.86.56-.37-.77-1.15-1.31-2.07-1.31-.08 0-.15.01-.23.02v1.6zm-1.81.9v7.23h.91V9.45c-.32.09-.62.2-.91.32zm-1.82.8v6.43h.91v-6.2c-.31.11-.61.23-.91.37zm-1.81.82v5.61h.91v-5.41c-.31.12-.61.25-.91.4zm-1.82 1.01v4.6h.91v-4.42c-.31.12-.61.26-.91.42zm-1.82 1.25v3.35h.91v-3.18c-.3.13-.61.28-.91.43zm-1.81 1.7v1.65h.91v-1.46c-.3.14-.6.31-.91.48z" />
            </svg>
            <span className="text-[11px] font-sans font-medium text-white group-hover:text-[#E51B24] transition-colors">SoundCloud</span>
          </a>

          <span className="text-neutral-700 hidden sm:inline">|</span>

          {/* YouTube */}
          <a
            href="https://www.youtube.com/@LOVNIS.LOVETHIS"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors group py-0.5"
            title="YouTube · @LOVNIS.LOVETHIS"
          >
            <svg className="w-3.5 h-3.5 fill-current text-[#ff0000] group-hover:text-white transition-colors" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            <span className="text-[11px] font-sans font-medium text-white group-hover:text-[#E51B24] transition-colors">YouTube</span>
          </a>

          <span className="text-neutral-700 hidden sm:inline">|</span>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/lovnis.lovethis/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors group py-0.5"
            title="Instagram · @lovnis.lovethis"
          >
            <svg className="w-3.5 h-3.5 fill-current text-[#e1306c] group-hover:text-white transition-colors" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <span className="text-[11px] font-sans font-medium text-white group-hover:text-[#E51B24] transition-colors">Instagram</span>
          </a>
        </div>

      </div>
    </div>
  );
};
