import React from 'react';
import { ShoppingBag, Disc } from 'lucide-react';
import { PRESALE_CONFIG } from '../data/lovnisData';
import { ImagePlaceholder } from './ImagePlaceholder';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="bg-white text-neutral-900 border-b-2 border-black">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-xs sm:text-sm font-oswald font-semibold tracking-widest text-[#E51B24] uppercase mb-1 block">
              Brazilian Psych-Rock · Berlin
            </span>

            <h2
              id="hero-title"
              className="text-5xl sm:text-7xl font-archivo font-black text-black tracking-tight leading-[0.95] mb-4 uppercase"
            >
              LOVNIS
            </h2>

            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed mb-6 font-normal">
              A Brazilian band based in Berlin, founded by <strong>Murilo Sá</strong> and <strong>Amanda Longo</strong>, later joined by <strong>Putti</strong> (drums) and <strong>Bernar Gomma</strong> (bass). Brazilian psych-rock, Tropicália and 1960s garage/surf music are among their influences and sound.
            </p>

            <div className="border-l-4 border-[#E51B24] pl-4 py-2 mb-6 bg-[#FAFAFA] border-y border-r border-neutral-200">
              <span className="text-xs font-oswald uppercase tracking-widest text-[#E51B24] block font-bold">
                OFFICIAL DEBUT ALBUM PRE-SALE
              </span>
              <p className="text-sm text-neutral-900 font-medium mt-0.5">
                Online release date: <strong className="text-black font-bold">{PRESALE_CONFIG.onlineReleaseDate}</strong>.
              </p>
              <span className="text-xs font-mono-space text-neutral-600 block mt-0.5">
                Forecast for vinyl delivery: {PRESALE_CONFIG.vinylDeliveryForecast}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                id="hero-presale-cta"
                href="#presale-merch"
                className="inline-flex items-center gap-2 bg-[#E51B24] hover:bg-black text-white px-5 py-2.5 text-xs font-oswald font-bold tracking-widest uppercase transition-colors shadow-xs"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>PRE-SALE VINYL &amp; MERCH</span>
              </a>

              <a
                id="hero-player-cta"
                href="#album-player"
                className="inline-flex items-center gap-2 border-2 border-black hover:border-[#E51B24] hover:text-[#E51B24] text-black px-4 py-2 text-xs font-oswald font-bold tracking-widest uppercase transition-colors"
              >
                <Disc className="w-3.5 h-3.5" />
                <span>ALBUM PLAYER &amp; TRACKS ↓</span>
              </a>
            </div>
          </div>

          {/* Right Column: Real Album Gatefold / Back Cover Art from Google Drive */}
          <div className="lg:col-span-6">
            <div className="border-2 border-black bg-white p-2 shadow-xs group">
              <div className="aspect-[4/3] overflow-hidden bg-neutral-100 border border-neutral-200">
                <img
                  src="/assets/drive/back-cover.jpg"
                  alt="LOVNIS Vinyl Back Cover & Band Members"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                />
              </div>
              <div className="bg-white pt-2.5 pb-1 px-2 flex items-center justify-between border-t border-neutral-200 text-xs font-mono-space text-neutral-600">
                <span className="uppercase font-bold text-black">VINYL GATEFOLD &amp; LINEUP</span>
                <span className="text-[#E51B24] font-bold">RELEASE: 30.10.2026</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
