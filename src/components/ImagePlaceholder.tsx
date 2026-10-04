import React from 'react';
import { Camera } from 'lucide-react';

interface ImagePlaceholderProps {
  label?: string;
  sublabel?: string;
  aspect?: string;
  className?: string;
  dark?: boolean;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  label = 'PHOTO PLACEHOLDER',
  sublabel,
  aspect = 'aspect-video',
  className = '',
  dark = false,
}) => {
  return (
    <div
      className={`relative w-full ${aspect} flex flex-col items-center justify-center p-4 text-center select-none transition-colors ${
        dark
          ? 'bg-neutral-900 border-2 border-dashed border-neutral-700 text-neutral-300'
          : 'bg-neutral-100 border-2 border-dashed border-neutral-300 text-neutral-700'
      } ${className}`}
    >
      {/* Corner Registration Marks */}
      <span
        className={`absolute top-1.5 left-1.5 w-2 h-2 border-t-2 border-l-2 ${
          dark ? 'border-[#E51B24]' : 'border-[#E51B24]'
        }`}
      />
      <span
        className={`absolute top-1.5 right-1.5 w-2 h-2 border-t-2 border-r-2 ${
          dark ? 'border-[#E51B24]' : 'border-[#E51B24]'
        }`}
      />
      <span
        className={`absolute bottom-1.5 left-1.5 w-2 h-2 border-b-2 border-l-2 ${
          dark ? 'border-[#E51B24]' : 'border-[#E51B24]'
        }`}
      />
      <span
        className={`absolute bottom-1.5 right-1.5 w-2 h-2 border-b-2 border-r-2 ${
          dark ? 'border-[#E51B24]' : 'border-[#E51B24]'
        }`}
      />

      <div className="flex flex-col items-center justify-center space-y-2 p-2">
        <Camera
          className={`w-7 h-7 mb-1 ${
            dark ? 'text-neutral-400' : 'text-neutral-500'
          }`}
        />
        <span className="font-oswald text-sm sm:text-base tracking-wider text-[#E51B24] uppercase font-bold">
          {label}
        </span>
        {sublabel && (
          <span
            className={`font-sans text-xs sm:text-sm font-medium max-w-[90%] leading-normal ${
              dark ? 'text-neutral-300' : 'text-neutral-600'
            }`}
          >
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
};
