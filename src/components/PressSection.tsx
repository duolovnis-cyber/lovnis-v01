import React, { useState } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { PRESS_HIGHLIGHTS } from '../data/lovnisData';
import { PressItem } from '../types';

export const PressSection: React.FC = () => {
  const [selectedPress, setSelectedPress] = useState<PressItem | null>(null);

  return (
    <section id="press" className="bg-white text-neutral-900 py-16 sm:py-20 px-6 sm:px-12 border-b-2 border-black">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="border-b-2 border-black pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="text-xs sm:text-sm font-oswald tracking-widest text-[#E51B24] uppercase font-bold block mb-1">
              EDITORIAL COVERAGE &amp; REVIEWS
            </span>
            <h2
              id="press-heading"
              className="text-3xl sm:text-5xl font-archivo text-black tracking-tight uppercase"
            >
              Press Highlights
            </h2>
          </div>
          <span className="text-xs sm:text-sm font-mono-space text-neutral-500 uppercase">
            ROLLING STONE · POP FANTASMA · SCREAM &amp; YELL · TMDQA!
          </span>
        </div>

        {/* Minimal Small Boxes for Press Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {PRESS_HIGHLIGHTS.map((press) => (
            <div
              key={press.id}
              onClick={() => setSelectedPress(press)}
              className="bg-[#FAFAFA] border-2 border-neutral-300 hover:border-black p-4 flex flex-col justify-between cursor-pointer transition-colors group shadow-xs space-y-3"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-oswald uppercase tracking-wider mb-1.5">
                  <span className="text-[#E51B24] font-bold">{press.outlet}</span>
                  <span className="text-neutral-500 font-mono-space">{press.tag}</span>
                </div>

                <h3 className="text-sm font-archivo text-black uppercase leading-snug group-hover:text-[#E51B24] transition-colors font-bold line-clamp-2">
                  {press.headline}
                </h3>

                <p className="text-xs text-neutral-600 mt-2 line-clamp-3 leading-relaxed italic">
                  &quot;{press.snippet}&quot;
                </p>
              </div>

              <div className="pt-2 border-t border-neutral-200 flex items-center justify-between text-[11px] font-oswald font-bold tracking-wider text-neutral-600 group-hover:text-[#E51B24] uppercase">
                <span>VIEW NOTE</span>
                <span>&rarr;</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Excerpt Modal */}
      {selectedPress && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-black max-w-lg w-full p-6 sm:p-8 text-black relative shadow-2xl space-y-5">
            <button
              onClick={() => setSelectedPress(null)}
              className="absolute top-4 right-4 text-black hover:text-[#E51B24] p-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="font-oswald text-xs tracking-widest text-[#E51B24] uppercase font-bold block">
              {selectedPress.outlet} · {selectedPress.tag}
            </span>

            <h3 className="text-xl sm:text-2xl font-archivo uppercase text-black leading-tight font-bold">
              {selectedPress.headline}
            </h3>

            <p className="text-sm sm:text-base leading-relaxed text-neutral-800 italic border-l-4 border-[#E51B24] pl-4 py-1">
              &quot;{selectedPress.snippet}&quot;
            </p>

            <div className="pt-4 border-t border-neutral-300 flex items-center justify-between">
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent('LOVNIS ' + selectedPress.outlet + ' ' + selectedPress.headline)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-oswald text-xs font-bold tracking-widest text-[#E51B24] hover:text-black uppercase flex items-center gap-1.5"
              >
                <span>SEARCH OUTLET ARCHIVES</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setSelectedPress(null)}
                className="font-oswald text-xs font-bold tracking-widest text-neutral-600 hover:text-black uppercase"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
