import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { VideoItem } from '../types';

interface VideoModalProps {
  video: VideoItem | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (video) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [video, onClose]);

  if (!video) return null;

  // Compute embed URL: If concrete youtubeId is provided, use it directly;
  // otherwise fallback to clean search list embed or direct link
  const embedUrl = video.youtubeId && video.youtubeId !== video.id
    ? `https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`
    : `https://www.youtube-nocookie.com/embed?listType=search&list=${encodeURIComponent(video.youtubeQuery || 'LOVNIS')}&autoplay=1`;

  return (
    <div
      id="video-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90"
      onClick={onClose}
    >
      <div
        id="video-modal-content"
        className="relative w-full max-w-4xl bg-black border-2 border-neutral-700 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Minimal Modal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-neutral-950 border-b border-neutral-800 text-white">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E51B24]" />
            <span className="font-archivo text-xs sm:text-sm uppercase tracking-wide truncate max-w-md">
              {video.title} {video.year ? `(${video.year})` : ''}
            </span>
          </div>

          <button
            id="close-video-modal-btn"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player: Pure video iframe with NO text overlay and NO external Watch on YouTube link */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={embedUrl}
            title={video.title}
            className="w-full h-full border-0 absolute inset-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};
