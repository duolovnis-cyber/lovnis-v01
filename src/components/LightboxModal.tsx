import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryPhoto } from '../types';
import { ImagePlaceholder } from './ImagePlaceholder';

interface LightboxModalProps {
  photos: GalleryPhoto[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  photos,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % photos.length);
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + photos.length) % photos.length);
    };

    if (currentIndex !== null) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, photos.length, onClose, onNavigate]);

  if (currentIndex === null || !photos[currentIndex]) return null;

  const currentPhoto = photos[currentIndex];

  return (
    <div
      id="lightbox-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 select-none"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        id="close-lightbox-btn"
        onClick={onClose}
        className="absolute top-6 right-6 z-20 p-3 bg-black border-2 border-white text-white hover:border-[#E51B24] hover:text-[#E51B24] transition-colors"
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev Button */}
      <button
        id="prev-lightbox-btn"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((currentIndex - 1 + photos.length) % photos.length);
        }}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 bg-black border-2 border-white text-white hover:border-[#E51B24] hover:text-[#E51B24] transition-colors"
        aria-label="Previous"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next Button */}
      <button
        id="next-lightbox-btn"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((currentIndex + 1) % photos.length);
        }}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 bg-black border-2 border-white text-white hover:border-[#E51B24] hover:text-[#E51B24] transition-colors"
        aria-label="Next"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Content Box */}
      <div
        id="lightbox-content-box"
        className="relative max-w-4xl w-full flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full bg-black border-2 border-white overflow-hidden shadow-2xl">
          <ImagePlaceholder
            label={currentPhoto.title}
            sublabel={`${currentPhoto.location} · 35MM ARCHIVE`}
            aspect="aspect-[16/10]"
            dark={true}
            className="w-full"
          />

          <div className="p-4 md:p-6 bg-black border-t-2 border-white flex flex-col md:flex-row md:items-center justify-between gap-4 text-white">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-oswald text-sm uppercase tracking-wider text-[#E51B24] font-bold">
                  {currentPhoto.location}
                </span>
                <span className="text-xs sm:text-sm font-mono-space text-neutral-300">
                  PHOTO {currentIndex + 1} OF {photos.length}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-archivo uppercase text-white">
                {currentPhoto.title}
              </h3>
              <p className="text-sm md:text-base text-neutral-200 mt-2 max-w-2xl leading-relaxed">
                {currentPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
