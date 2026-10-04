import React from 'react';
import { ShoppingBag, Disc } from 'lucide-react';

export const TopHeroVideo: React.FC = () => {
  return (
    <section id="concert-hero" className="bg-black text-white border-b-2 border-black">
      {/* 1. Full-width Amanda's Last Concert Video */}
      <div className="w-full mx-auto">
        <div className="relative w-full aspect-video sm:aspect-[21/9] max-h-[70vh] bg-black overflow-hidden shadow-2xl">
          <iframe
            src="https://www.youtube-nocookie.com/embed/Lud4zu2C0aY?rel=0&modestbranding=1"
            title="Amanda Longo's Last Concert with LOVNIS in Berlin"
            className="w-full h-full border-0 absolute inset-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* 2. Sleek Horizontal Stripe Below Video (As Requested: Small text after historic concert footage, brief archival lore, and aligned CTAs) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-5 border-t border-neutral-800">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Left: Small header & archival note */}
            <div className="space-y-1.5 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E51B24] inline-block animate-pulse shrink-0" />
                <span className="text-[11px] font-mono-space tracking-wider text-[#E51B24] uppercase font-bold">
                  HISTORIC CONCERT FOOTAGE · AMANDA LONGO&apos;S LAST CONCERT WITH LOVNIS
                </span>
                <span className="text-neutral-600 hidden sm:inline">|</span>
                <span className="text-[11px] font-mono-space text-neutral-400 hidden sm:inline">
                  BERLIN, NOVEMBER 2024
                </span>
              </div>

              <p className="text-xs sm:text-[13px] text-neutral-300 leading-relaxed font-sans">
                Recorded live in Berlin days before Amanda&apos;s passing in November 2024. In celebration of her fearless spirit, LOVNIS brings their debut album—fully recorded together—to life.
              </p>
            </div>

            {/* Right: Aligned Action Stripe Group */}
            <div className="flex flex-wrap items-center gap-3 shrink-0 pt-1 lg:pt-0">
              <a
                id="hero-bar-preorder-cta"
                href="#presale-merch"
                className="inline-flex items-center justify-center gap-2 bg-[#E51B24] hover:bg-white hover:text-black text-white px-4 py-2 text-xs font-oswald font-bold tracking-widest uppercase transition-colors shrink-0 shadow-xs"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>PRE-ORDER LP (€28)</span>
              </a>

              <a
                href="#album-player"
                className="inline-flex items-center justify-center gap-2 border border-neutral-700 hover:border-white text-neutral-300 hover:text-white px-3.5 py-2 text-xs font-oswald font-bold tracking-widest uppercase transition-colors shrink-0"
              >
                <Disc className="w-3.5 h-3.5 text-[#E51B24]" />
                <span>TRACKLIST &amp; PLAYER ↓</span>
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
