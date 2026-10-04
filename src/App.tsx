import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { StreamingLinksBar } from './components/StreamingLinksBar';
import { TopHeroVideo } from './components/TopHeroVideo';
import { DebutAlbumSection } from './components/DebutAlbumSection';
import { BioSection } from './components/BioSection';
import { MusicSection } from './components/MusicSection';
import { PressSection } from './components/PressSection';
import { ConnectSection } from './components/ConnectSection';
import { Footer } from './components/Footer';
import { InMemoriamDock } from './components/InMemoriamDock';
import { VideoModal } from './components/VideoModal';
import { LightboxModal } from './components/LightboxModal';
import { ALL_VIDEOS, GALLERY_PHOTOS } from './data/lovnisData';
import { VideoItem } from './types';

export default function App() {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);

  const handleOpenGallery = () => {
    setGalleryIndex(0);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-[#E51B24] selection:text-white pb-16 sm:pb-20">
      {/* Top Navigation Bar */}
      <Navbar />

      {/* Discrete, Clean Official Streaming & Discography Links Strip */}
      <StreamingLinksBar />

      {/* Main Content Sections */}
      <main>
        {/* 1. Full-width Amanda's Last Concert Video + Archival Note Stripe */}
        <TopHeroVideo />

        {/* 2. Flagship Debut LP Pre-Sale Row & Archive (Cover Art with Back-cover hover, Pre-Listen with red shadow, Minimal Player, Tracklist, Essay & Merch) */}
        <DebutAlbumSection />

        {/* 3. Biography & Amanda Longo Legacy */}
        <BioSection />

        {/* 4. Videos & Archives (4-in-a-row Filtered Grid) */}
        <MusicSection onSelectVideo={(video) => setActiveVideo(video)} />

        {/* 5. Press Highlights (Minimal Editorial Notes) */}
        <PressSection />

        {/* 6. Minimalist Connect & Bookings */}
        <ConnectSection />
      </main>

      {/* Rock Band Footer */}
      <Footer />

      {/* Ultra-Slim Fixed Bottom In Memoriam Bar (Height ~44px, clicking photo opens Gallery) */}
      <InMemoriamDock onOpenGallery={handleOpenGallery} />

      {/* Direct Video Player Modal */}
      <VideoModal
        video={activeVideo}
        onClose={() => setActiveVideo(null)}
      />

      {/* Photo Gallery Lightbox Modal with Placeholders */}
      <LightboxModal
        photos={GALLERY_PHOTOS}
        currentIndex={galleryIndex}
        onClose={() => setGalleryIndex(null)}
        onNavigate={(idx) => setGalleryIndex(idx)}
      />
    </div>
  );
}
