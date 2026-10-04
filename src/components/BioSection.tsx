import React from 'react';

export const BioSection: React.FC = () => {
  return (
    <section id="bio" className="bg-white text-neutral-900 py-14 sm:py-20 px-6 sm:px-12 border-b-2 border-black">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Editorial Headline Lockup */}
        <div className="border-b-2 border-black pb-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <span className="text-[11px] font-mono-space tracking-widest text-[#E51B24] uppercase font-bold block mb-1">
              OFFICIAL BAND BIOGRAPHY · BERLIN
            </span>
            <h2
              id="bio-heading"
              className="text-3xl sm:text-5xl lg:text-6xl font-archivo text-black tracking-tight uppercase font-black"
            >
              The Story of LOVNIS
            </h2>
          </div>
          <span className="text-xs font-mono-space text-neutral-500 uppercase">
            BRAZIL · BERLIN UNDERGROUND · 2020—2026
          </span>
        </div>

        {/* Magazine Editorial Spread Layout: Balanced Multi-Column Typography */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start font-sans">
          
          {/* Column 1: Lead Editorial Kicker & Origins */}
          <div className="md:col-span-6 space-y-5 text-sm sm:text-base leading-relaxed text-neutral-800">
            <p className="text-lg sm:text-xl font-medium text-black leading-snug font-sans">
              LOVNIS was born between Brazil and the cold concrete of Berlin, founded in 2020 by <strong>Murilo Sá</strong> and <strong>Amanda Longo</strong>. Later joined by <strong>Putti</strong> on drums and <strong>Bernar Gomma</strong> on bass, the four-piece forged a transcontinental sonic bridge blending Brazilian psych-rock, Tropicália, and 1960s garage/surf urgency.
            </p>

            <p className="text-neutral-700 leading-relaxed">
              Living through temporary flats, squats, and DIY mobile studios, Amanda and Murilo filled spaces with cut-up collages, vintage tape reels, lit candles, full ashtrays, and relentless late-night songwriting. When concerts were permitted again, the duo took to Berlin underground stages with a cassette player before meeting Putti and Bernar.
            </p>

            <p className="text-neutral-700 leading-relaxed">
              In August 2024, LOVNIS released <em>&quot;Running Out of Luck&quot;</em>, their first English single, met with critical acclaim across independent outlets. The band operates entirely with independent self-determination—recording, producing, illustrating, and filming every piece of their sonic identity.
            </p>
          </div>

          {/* Column 2: In Memoriam Dedication & Debut LP Manifesto */}
          <div className="md:col-span-6 space-y-5 text-sm sm:text-base leading-relaxed text-neutral-800 border-t md:border-t-0 md:border-l-2 md:border-black pt-6 md:pt-0 md:pl-8 lg:pl-10">
            <div className="space-y-3">
              <span className="text-xs font-mono-space tracking-widest text-[#E51B24] uppercase font-bold block">
                IN MEMORIAM · AMANDA LONGO (1987 — 2024)
              </span>
              <p className="text-sm sm:text-base text-neutral-800 italic border-l-2 border-[#E51B24] pl-4 py-1 leading-relaxed bg-[#FAFAFA]">
                &quot;Amanda co-founded LOVNIS and infused the project with fearless energy, visual artistry, and soulful songwriting. Following her tragic loss in November 2024, the band honors her indelible spirit by bringing their self-titled debut album—fully recorded together—to life in October 2026.&quot;
              </p>
            </div>

            <p className="text-neutral-700 leading-relaxed">
              Following Amanda&apos;s passing, Murilo, Bernar, and Putti reunited in the studio with all 13 album tracks already laid to tape—featuring Amanda&apos;s lead vocals, bass, and guitar work. Together, they finalized the mixes as an act of profound dedication and artistic closure.
            </p>

            <p className="text-neutral-900 font-medium leading-relaxed">
              The self-titled debut LP will be released on <strong className="text-[#E51B24]">October 30, 2026</strong> on 12&quot; Vinyl, vintage analog cassette tape, and all digital platforms.
            </p>

            <div className="pt-2">
              <a
                href="#album-archive"
                className="inline-flex items-center gap-2 text-xs font-oswald uppercase tracking-widest font-bold text-black hover:text-[#E51B24] transition-colors"
              >
                <span>EXPLORE ALBUM ARCHIVE &amp; LINER NOTES</span>
                <span>&rarr;</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
