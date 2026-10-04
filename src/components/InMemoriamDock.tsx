import React from 'react';
import { Camera, ExternalLink } from 'lucide-react';

interface InMemoriamDockProps {
  onOpenGallery: () => void;
}

export const InMemoriamDock: React.FC<InMemoriamDockProps> = ({ onOpenGallery }) => {
  return (
    <aside
      id="in-memoriam-bar"
      aria-label="In Memoriam Amanda Longo"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#0E0E0E]/95 backdrop-blur-md text-white border-t border-[#E51B24] shadow-2xl h-11 sm:h-12 flex items-center px-3 sm:px-6 select-none"
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-2 sm:gap-4 h-full">
        
        {/* Left: Clickable Photo Placeholder (Opens photo gallery lightbox with placeholders) */}
        <button
          onClick={onOpenGallery}
          className="flex items-center gap-2 text-left group shrink-0 focus:outline-none focus:ring-1 focus:ring-[#E51B24]"
          title="Click photo to open gallery"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-neutral-900 border border-neutral-700 group-hover:border-[#E51B24] flex items-center justify-center transition-colors">
            <Camera className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#E51B24] transition-colors" />
          </div>

          <div className="hidden xs:block">
            <span className="text-[9px] font-mono-space text-[#E51B24] font-bold uppercase tracking-wider block leading-none">
              PHOTO
            </span>
            <span className="text-[11px] font-archivo uppercase text-white font-bold group-hover:text-[#E51B24] transition-colors block leading-tight">
              Amanda Longo
            </span>
          </div>
        </button>

        {/* Center: Ultra-slim One-Line Tribute Flow */}
        <div className="flex-1 min-w-0 flex items-center gap-2 text-[11px] sm:text-xs overflow-hidden">
          <span className="hidden sm:inline-block bg-[#E51B24] text-white px-1.5 py-0.2 text-[9px] font-oswald font-bold uppercase tracking-widest shrink-0">
            IN MEMORIAM
          </span>

          <span className="font-archivo text-xs uppercase text-white font-bold tracking-wide shrink-0">
            Amanda Longo <span className="text-[10px] font-mono-space text-neutral-400 font-normal">(1987 — 2024)</span>
          </span>

          <span className="hidden md:inline text-neutral-600">·</span>

          <p className="text-[11px] text-neutral-300 font-sans italic truncate hidden md:inline">
            &quot;Amanda co-founded LOVNIS and infused the project with fearless energy... debut album lives October 2026.&quot;
          </p>
        </div>

        {/* Right: Quick Action to Open Gallery */}
        <button
          onClick={onOpenGallery}
          className="shrink-0 text-[10px] font-oswald text-neutral-300 hover:text-white hover:bg-neutral-800 border border-neutral-700 px-2.5 py-1 uppercase font-bold tracking-wider transition-colors flex items-center gap-1"
        >
          <span>GALLERY</span>
          <ExternalLink className="w-2.5 h-2.5 text-[#E51B24]" />
        </button>

      </div>
    </aside>
  );
};
