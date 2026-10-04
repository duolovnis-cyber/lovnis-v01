import React, { useState } from 'react';
import { GALLERY_PHOTOS } from '../data/lovnisData';
import { LightboxModal } from './LightboxModal';
import { ImagePlaceholder } from './ImagePlaceholder';

export const GallerySection: React.FC = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="bg-[#FAFAFA] text-neutral-900 py-20 sm:py-28 px-6 sm:px-12 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header: Black Title, Red Subtitle */}
        <div className="border-b-2 border-black pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-sm sm:text-base font-oswald tracking-widest text-[#E51B24] uppercase font-bold block mb-1">
              ANALOG 35MM ARCHIVES
            </span>
            <h2
              id="gallery-heading"
              className="text-4xl sm:text-6xl font-archivo text-black tracking-tight uppercase"
            >
              Live &amp; Backstage
            </h2>
          </div>
          <span className="text-sm sm:text-base font-mono-space text-neutral-600 uppercase font-semibold">
            BERLIN UNDERGROUND
          </span>
        </div>

        {/* 6-Photo Clean Grid using Placeholders with Ample Spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {GALLERY_PHOTOS.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhotoIndex(index)}
              className="group relative aspect-square bg-white border-2 border-neutral-300 hover:border-black cursor-pointer overflow-hidden transition-colors shadow-xs flex flex-col justify-between"
            >
              <ImagePlaceholder
                label={photo.title}
                sublabel={photo.location}
                aspect="aspect-square"
                className="w-full h-full"
              />

              {/* Minimalist Hover Overlay */}
              <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-6 text-white">
                <span className="font-oswald text-xs sm:text-sm uppercase tracking-wider text-[#E51B24] font-bold">
                  {photo.location}
                </span>

                <div>
                  <h4 className="font-archivo text-xl uppercase leading-tight tracking-wide font-bold">
                    {photo.title}
                  </h4>
                  <p className="text-sm text-neutral-200 mt-2 leading-relaxed">
                    {photo.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        photos={GALLERY_PHOTOS}
        currentIndex={selectedPhotoIndex}
        onClose={() => setSelectedPhotoIndex(null)}
        onNavigate={(idx) => setSelectedPhotoIndex(idx)}
      />
    </section>
  );
};
