import React, { useState } from 'react';
import { ShoppingBag, ZoomIn, X, Check, Mail, Calendar, Clock } from 'lucide-react';
import {
  LP_TRACKS_SIDE_ONE,
  LP_TRACKS_SIDE_TWO,
  ALBUM_CREDITS,
  LINER_NOTES,
  BAND_MEMBERS_CREDITS,
  PRESALE_CONFIG,
  MERCH_ITEMS,
} from '../data/lovnisData';
import { MerchItem, TrackItem } from '../types';
import { SamplyPlayer } from './SamplyPlayer';
import { vinylPlayer } from '../utils/audioPreview';

export const DebutAlbumSection: React.FC = () => {
  const allTracks = [...LP_TRACKS_SIDE_ONE, ...LP_TRACKS_SIDE_TWO];
  const [selectedMerch, setSelectedMerch] = useState<MerchItem | null>(null);
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [orderComplete, setOrderComplete] = useState(false);

  // Artwork expand modal state (supports viewing both front and back)
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [expandedCaption, setExpandedCaption] = useState<string>('');
  const [modalView, setModalView] = useState<'front' | 'back'>('front');

  // Pre-listen email unlock state
  const [emailInput, setEmailInput] = useState('');
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    try {
      return localStorage.getItem('lovnis_album_unlocked') === 'true';
    } catch {
      return false;
    }
  });
  const [listenerEmail, setListenerEmail] = useState<string>(() => {
    try {
      return localStorage.getItem('lovnis_listener_email') || '';
    } catch {
      return '';
    }
  });

  // Newsletter
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const [activeTrack, setActiveTrack] = useState<TrackItem>(allTracks[0]);

  const handlePreListenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) return;

    try {
      localStorage.setItem('lovnis_album_unlocked', 'true');
      localStorage.setItem('lovnis_listener_email', emailInput);
      const subscribers = JSON.parse(localStorage.getItem('lovnis_subscribers') || '[]');
      subscribers.push({ email: emailInput, source: 'album-player-prelisten', date: new Date().toISOString() });
      localStorage.setItem('lovnis_subscribers', JSON.stringify(subscribers));
    } catch {
      // Fallback
    }

    setListenerEmail(emailInput);
    setIsUnlocked(true);
  };

  const handleOpenPreorder = (item: MerchItem) => {
    setSelectedMerch(item);
    setOrderComplete(false);
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderComplete(true);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    try {
      localStorage.setItem('lovnis_album_unlocked', 'true');
      localStorage.setItem('lovnis_listener_email', newsletterEmail);
      const existing = JSON.parse(localStorage.getItem('lovnis_subscribers') || '[]');
      existing.push({ email: newsletterEmail, source: 'album-newsletter', date: new Date().toISOString() });
      localStorage.setItem('lovnis_subscribers', JSON.stringify(existing));
    } catch {
      // Fallback
    }
    setNewsletterSubmitted(true);
  };

  const handlePlayTrack = (track: TrackItem) => {
    setActiveTrack(track);
    vinylPlayer.setMaxDuration(180);
    vinylPlayer.playTrack(track.number, 0);
  };

  return (
    <section
      id="debut-lp-archive"
      className="bg-[#FAF9F6] text-neutral-900 py-12 sm:py-16 px-4 sm:px-8 lg:px-12 border-b-2 border-black scroll-mt-20"
    >
      {/* Anchor targets for navbar & footer links */}
      <div id="album-hub" className="-mt-20 pt-20" />
      <div id="album-archive" className="-mt-20 pt-20" />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* ============================================================ */}
        {/* 01. ALBUM PLAYER & COMPLETE TRACKLIST (Clean 50% Smaller Heading) */}
        {/* ============================================================ */}
        <div id="album-player" className="space-y-6 scroll-mt-20">
          
          {/* Header Row: Clean, Elegant, Sized Down by 50% */}
          <div className="border-b-2 border-black pb-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
            <div>
              <h2 className="text-sm sm:text-base font-archivo uppercase text-black tracking-wider font-bold">
                01 / Album Player &amp; Complete Tracklist
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono-space">
              <div className="bg-white border border-black px-2.5 py-1 flex items-center gap-1.5 shadow-xs">
                <Calendar className="w-3.5 h-3.5 text-[#E51B24]" />
                <span>Online Release: <strong className="font-bold">{PRESALE_CONFIG.onlineReleaseDate}</strong></span>
              </div>
              <div className="bg-white border border-black px-2.5 py-1 flex items-center gap-1.5 shadow-xs">
                <Clock className="w-3.5 h-3.5 text-[#E51B24]" />
                <span>Vinyl Delivery: <strong className="font-bold">~3 months</strong></span>
              </div>
            </div>
          </div>

          {/* PRE-LISTEN THE ALBUM NOW Box (White text with discrete red project shadow) */}
          <div className="bg-[#111111] text-white border-2 border-black p-4 sm:p-5 shadow-lg">
            {isUnlocked ? (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs font-mono-space bg-black/60 border border-neutral-700 px-3.5 py-2.5">
                <div className="flex items-center gap-2 text-neutral-200">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Album stream unlocked for <strong className="text-white">{listenerEmail}</strong>. Direct link sent to your email.</span>
                </div>
                <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 text-[10px] uppercase font-bold shrink-0">
                  STREAM ACTIVE
                </span>
              </div>
            ) : (
              <div className="space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-2 border-b border-neutral-800 gap-1.5">
                  <h3
                    className="text-xl sm:text-2xl lg:text-3xl font-archivo uppercase text-white font-bold tracking-wider"
                    style={{ textShadow: '2px 2px 0px #E51B24' }}
                  >
                    PRE-LISTEN THE ALBUM NOW
                  </h3>
                  <span className="text-[10px] font-mono-space text-neutral-400 bg-neutral-900 border border-neutral-800 px-2 py-0.5 uppercase self-start sm:self-auto">
                    13 TRACKS · ADVANCE STREAM
                  </span>
                </div>

                <p className="text-xs sm:text-[13px] text-neutral-300 font-sans leading-relaxed">
                  Enter your email to stream the full album immediately. You&apos;ll also receive your private listening link in your email.
                </p>

                <form onSubmit={handlePreListenSubmit} className="flex flex-col sm:flex-row gap-2 pt-0.5">
                  <div className="relative flex-1">
                    <Mail className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="Your email address..."
                      className="w-full bg-neutral-900 border border-neutral-700 pl-8 pr-3 py-1.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#E51B24] placeholder:text-neutral-500 font-sans"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-[#E51B24] hover:bg-white hover:text-black text-white px-5 py-1.5 text-xs font-oswald font-bold tracking-widest uppercase transition-colors shrink-0 flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <span>LISTEN →</span>
                  </button>
                </form>

                <div className="text-[11px] font-mono-space text-neutral-400">
                  Includes discounts &amp; unreleased materials access
                </div>
              </div>
            )}
          </div>

          {/* Master Split Grid: Cover Art (Hover reveals Back Cover) + Ultra-Minimal Player & Non-Bold Tracklist */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            
            {/* Left Column (lg:col-span-4): Front Cover with Hover revealing Back Cover, Both Clickable & Expansible */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-3">
              <div
                onClick={() => {
                  setExpandedImage('/assets/drive/cover-art-new.jpg');
                  setExpandedCaption('LOVNIS — Debut Album Cover Artwork (Collage by Murilo Sá)');
                  setModalView('front');
                }}
                className="bg-white border-2 border-black p-2 cursor-pointer group shadow-sm hover:border-[#E51B24] transition-all relative overflow-hidden select-none"
                title="Click to expand high-res album cover"
              >
                <div className="relative aspect-square w-full bg-neutral-100 overflow-hidden">
                  {/* Front Cover Image */}
                  <img
                    src="/assets/drive/cover-art-new.jpg"
                    alt="LOVNIS Debut LP Front Cover"
                    className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                  />
                  {/* Back Cover Image (Revealed smoothly on hover) */}
                  <img
                    src="/assets/drive/back-cover.jpg"
                    alt="LOVNIS Debut LP Back Cover"
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />

                  {/* Expand Overlay Pill */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 flex items-center justify-center transition-colors pointer-events-none">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white px-3 py-1.5 text-[11px] font-oswald uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>CLICK TO EXPAND ARTWORK</span>
                    </div>
                  </div>
                </div>

                <div className="p-2 bg-white border-t border-neutral-200 flex items-center justify-between text-[11px] font-mono-space text-neutral-600">
                  <span className="font-bold text-black uppercase group-hover:hidden">FRONT (HOVER FOR BACK)</span>
                  <span className="font-bold text-[#E51B24] uppercase hidden group-hover:inline">BACK COVER ARTWORK</span>
                  <span className="text-[#E51B24] font-bold text-[10px]">EXPAND ↗</span>
                </div>
              </div>

              <div className="p-2.5 bg-white border border-neutral-300 text-xs font-mono-space text-neutral-600 space-y-1">
                <div><strong>Format:</strong> 12&quot; Vinyl LP + Cassette + Digital</div>
                <div><strong>Mastering:</strong> 33⅓ RPM Analog Master</div>
              </div>

              {/* Direct Action Button Anchored Under Cover */}
              <button
                onClick={() => handleOpenPreorder(MERCH_ITEMS[0])}
                className="w-full bg-[#E51B24] hover:bg-black text-white py-2.5 px-3 text-xs font-oswald font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>PRE-ORDER VINYL LP (€28)</span>
              </button>
            </div>

            {/* Right Column (lg:col-span-8): Half-Height Minimal Player + Refined Non-Bold Tracklists */}
            <div className="lg:col-span-8 space-y-5">
              
              {/* Ultra-Minimal Half-Height Player */}
              <SamplyPlayer onTrackChange={(t) => setActiveTrack(t)} />

              {/* Side One & Side Two Tracklists (Refined, Non-Bold, Elegant Typography) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Side One (Lado A) */}
                <div className="bg-white border-2 border-black p-4 space-y-2.5 shadow-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-black">
                    <h4 className="font-archivo text-sm uppercase text-black font-normal tracking-wide">
                      Side One (Lado A)
                    </h4>
                    <span className="text-[10px] font-mono-space bg-black text-white px-2 py-0.5 font-normal">
                      6 TRACKS
                    </span>
                  </div>

                  <div className="divide-y divide-neutral-100">
                    {LP_TRACKS_SIDE_ONE.map((track) => (
                      <div
                        key={track.number}
                        onClick={() => handlePlayTrack(track)}
                        className={`py-1.5 px-2 hover:bg-neutral-50 cursor-pointer flex flex-col group transition-colors ${
                          activeTrack.title === track.title ? 'bg-red-50/70 border-l-2 border-[#E51B24]' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between text-neutral-800">
                          <div className="flex items-center gap-2.5 truncate">
                            <span className="font-mono text-xs text-neutral-400 group-hover:text-[#E51B24] transition-colors shrink-0">
                              {String(track.number).padStart(2, '0')}
                            </span>
                            <span className="font-sans text-xs sm:text-sm tracking-normal text-neutral-900 group-hover:text-[#E51B24] transition-colors font-normal truncate">
                              {track.title}
                            </span>
                          </div>
                          <span className="text-xs font-mono text-neutral-400 font-normal shrink-0 ml-2">
                            {track.duration}
                          </span>
                        </div>
                        {track.guests && (
                          <p className="mt-0.5 ml-6 text-[11px] text-neutral-500 font-sans italic font-normal">
                            ★ {track.guests}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Side Two (Lado B) */}
                <div className="bg-white border-2 border-black p-4 space-y-2.5 shadow-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-black">
                    <h4 className="font-archivo text-sm uppercase text-black font-normal tracking-wide">
                      Side Two (Lado B)
                    </h4>
                    <span className="text-[10px] font-mono-space bg-black text-white px-2 py-0.5 font-normal">
                      7 TRACKS
                    </span>
                  </div>

                  <div className="divide-y divide-neutral-100">
                    {LP_TRACKS_SIDE_TWO.map((track) => (
                      <div
                        key={track.number}
                        onClick={() => handlePlayTrack(track)}
                        className={`py-1.5 px-2 hover:bg-neutral-50 cursor-pointer flex flex-col group transition-colors ${
                          activeTrack.title === track.title ? 'bg-red-50/70 border-l-2 border-[#E51B24]' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between text-neutral-800">
                          <div className="flex items-center gap-2.5 truncate">
                            <span className="font-mono text-xs text-neutral-400 group-hover:text-[#E51B24] transition-colors shrink-0">
                              {String(track.number).padStart(2, '0')}
                            </span>
                            <span className="font-sans text-xs sm:text-sm tracking-normal text-neutral-900 group-hover:text-[#E51B24] transition-colors font-normal truncate">
                              {track.title}
                            </span>
                          </div>
                          <span className="text-xs font-mono text-neutral-400 font-normal shrink-0 ml-2">
                            {track.duration}
                          </span>
                        </div>
                        {track.guests && (
                          <p className="mt-0.5 ml-6 text-[11px] text-neutral-500 font-sans italic font-normal">
                            ★ {track.guests}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* ============================================================ */}
        {/* ALBUM ESSAY & BAND LINEUP (Magazine Article Layout)           */}
        {/* ============================================================ */}
        <div id="band-lineup" className="space-y-8 pt-6 border-t-2 border-black scroll-mt-20">
          
          {/* Magazine Article Spread: Headline without floating image */}
          <div className="bg-white border-2 border-black p-5 sm:p-8 shadow-xs">
            
            {/* Article Top Header (Matching user reference image.png) */}
            <div className="border-b border-black pb-3 mb-5">
              <span className="text-xs font-mono-space text-[#E51B24] uppercase font-bold tracking-widest block mb-1">
                ALBUM ESSAY &amp; MANIFESTO
              </span>
              <h4 className="text-lg sm:text-2xl font-archivo uppercase text-black font-black tracking-tight leading-snug">
                IN MEMORY OF AMANDA LONGO A.K.A. SUZAN FLAG (1987-2024)
              </h4>
            </div>

            {/* 3-Column Magazine Essay Text */}
            <div className="text-xs sm:text-[13px] text-neutral-800 leading-relaxed font-sans space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Column 1 */}
                <div className="space-y-3">
                  <p className="whitespace-pre-line text-justify leading-relaxed">
                    {LINER_NOTES.columns[0]}
                  </p>
                </div>

                {/* Column 2 */}
                <div className="space-y-3">
                  <p className="whitespace-pre-line text-justify leading-relaxed">
                    {LINER_NOTES.columns[1]}
                  </p>
                </div>

                {/* Column 3 */}
                <div className="space-y-3 flex flex-col justify-between">
                  <p className="whitespace-pre-line text-justify leading-relaxed">
                    {LINER_NOTES.columns[2]}
                  </p>
                  <div className="pt-3 border-t border-black mt-3">
                    <span className="text-2xl sm:text-3xl font-caveat text-black block">{LINER_NOTES.authorSignature}</span>
                    <span className="text-xs font-mono-space text-neutral-500">Murilo Sá · Berlin</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* 4 Inline Band Member Cards (Clean photos with no hover swap) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-oswald text-[#E51B24] uppercase font-bold tracking-widest block">
                BAND LINEUP
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
              {BAND_MEMBERS_CREDITS.map((member, idx) => (
                <div
                  key={idx}
                  className="bg-white border-2 border-black p-3 flex flex-col justify-between shadow-xs hover:border-[#E51B24] transition-colors group"
                >
                  <div>
                    {/* Member Photo without hover swap */}
                    <div
                      onClick={() => {
                        setExpandedImage(member.image);
                        setExpandedCaption(`${member.name} · LOVNIS Berlin Sessions`);
                      }}
                      className="relative border border-neutral-300 mb-2.5 bg-neutral-100 aspect-[4/5] overflow-hidden cursor-pointer"
                    >
                      <img
                        src={member.image}
                        alt={`${member.name} Photo`}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <h4 className="font-archivo text-sm uppercase text-black font-bold">
                      {member.name}
                    </h4>
                    {member.years && (
                      <span className="text-[10px] font-mono-space text-[#E51B24] font-bold block mt-0.5">
                        ({member.years})
                      </span>
                    )}
                    <p className="text-xs text-neutral-600 mt-1 leading-relaxed font-sans line-clamp-3">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Production Credits with Special Guests inside */}
          <div className="bg-white border-2 border-black p-5 space-y-3 shadow-xs">
            <div className="border-b border-black pb-2">
              <span className="text-[10px] font-mono-space text-[#E51B24] uppercase font-bold tracking-widest block mb-0.5">
                TECHNICAL METADATA &amp; COLLABORATORS
              </span>
              <h4 className="font-archivo text-base sm:text-lg uppercase text-black font-bold">
                Album Credits &amp; Special Guests
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs text-neutral-800 font-sans leading-relaxed">
              <div className="space-y-1.5">
                <p><strong>Production:</strong> {ALBUM_CREDITS.producedAndRecorded}</p>
                <p><strong>Mixing:</strong> {ALBUM_CREDITS.mixedBy}</p>
                <p><strong>Artwork &amp; Design:</strong> {ALBUM_CREDITS.coverArtwork} · {ALBUM_CREDITS.albumDesign}</p>
                <p className="text-neutral-500 pt-1.5 border-t border-neutral-200">{ALBUM_CREDITS.photographers}</p>
              </div>

              <div className="bg-neutral-50 p-3.5 border border-neutral-200 space-y-1.5">
                <span className="text-xs font-oswald text-[#E51B24] uppercase font-bold tracking-wider block">
                  SPECIAL GUEST MUSICIANS:
                </span>
                <ul className="space-y-1 text-xs text-neutral-700">
                  {ALBUM_CREDITS.specialGuests.map((g, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#E51B24] font-bold">★</span>
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>

        {/* ============================================================ */}
        {/* OFFICIAL PHYSICAL PRE-SALE & MERCH (4 Columns Layout)        */}
        {/* ============================================================ */}
        <div id="presale-merch" className="space-y-8 pt-6 border-t-2 border-black scroll-mt-20">
          <div className="border-b-2 border-black pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#E51B24]" />
              <h3 className="font-archivo text-sm sm:text-base uppercase font-bold text-black tracking-wider">
                Official Merchandise &amp; Pre-Sale
              </h3>
            </div>
            <span className="text-xs font-mono-space text-neutral-500 uppercase">
              SHIPPING WORLDWIDE
            </span>
          </div>

          {/* 4 Unique Merch Items from Google Drive & Catalog */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {MERCH_ITEMS.map((item) => (
              <div
                key={item.id}
                className="bg-white border-2 border-black flex flex-col justify-between shadow-xs hover:border-[#E51B24] transition-colors group"
              >
                <div>
                  {/* Merch Image with Smooth Hover Swap to Next Image */}
                  <div
                    onClick={() => {
                      setExpandedImage(item.image);
                      setExpandedCaption(`${item.title} — ${item.price}`);
                    }}
                    className="relative border-b-2 border-black bg-neutral-100 aspect-square overflow-hidden cursor-pointer"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className={`w-full h-full object-cover transition-opacity duration-300 ${
                        item.hoverImage && item.hoverImage !== item.image ? 'group-hover:opacity-0' : 'group-hover:scale-103'
                      }`}
                    />
                    {item.hoverImage && item.hoverImage !== item.image && (
                      <img
                        src={item.hoverImage}
                        alt={`${item.title} alternate view`}
                        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    )}
                  </div>

                  <div className="p-4 space-y-2">
                    {item.badge && (
                      <span className="inline-block bg-[#E51B24] text-white px-2 py-0.5 text-[9px] font-oswald font-bold uppercase tracking-wider">
                        {item.badge}
                      </span>
                    )}
                    <h4 className="font-archivo text-base uppercase text-black font-bold group-hover:text-[#E51B24] transition-colors line-clamp-1">
                      {item.title}
                    </h4>
                    <span className="font-archivo text-xl text-black block font-bold">
                      {item.price}
                    </span>
                    <p className="text-xs text-neutral-600 line-clamp-2">
                      {item.subtitle}
                    </p>
                    <div className="pt-2 text-[10px] font-mono-space text-neutral-500 border-t border-neutral-200">
                      <span className="text-[#E51B24] font-bold block">AVAILABILITY:</span>
                      <span>{item.deliveryForecast}</span>
                    </div>
                  </div>
                </div>

                {/* Appropriate Action Button: PRE-ORDER for Vinyl, ORDER NOW for Cassette & Tote */}
                <div className="p-4 pt-0">
                  <button
                    onClick={() => handleOpenPreorder(item)}
                    className="w-full bg-black hover:bg-[#E51B24] text-white py-2.5 text-xs font-oswald font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{item.isPreorder ? 'PRE-ORDER NOW' : 'ORDER NOW'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter Box (High Focus as requested) */}
          <div className="bg-black text-white p-5 sm:p-7 border-4 border-[#E51B24] shadow-xl">
            <div className="max-w-2xl mx-auto space-y-2.5 text-center sm:text-left">
              <span className="text-[10px] font-mono-space tracking-widest text-[#E51B24] uppercase font-bold block">
                NEWSLETTER DISPATCH
              </span>
              <h4 className="text-lg sm:text-xl font-archivo uppercase text-white font-bold">
                Stay Connected with LOVNIS
              </h4>
              <p className="text-xs sm:text-[13px] text-neutral-200 font-sans leading-relaxed">
                Sign up for discounts, ticket promos and exclusive unreleased material access.
              </p>

              {newsletterSubmitted ? (
                <div className="bg-neutral-900 border border-[#E51B24] p-2.5 text-center text-xs text-neutral-200">
                  ✓ You are subscribed! Check your inbox for updates and exclusive material.
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 pt-1">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Your email address..."
                    className="flex-1 bg-neutral-900 border border-neutral-700 px-3.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#E51B24]"
                  />
                  <button
                    type="submit"
                    className="bg-[#E51B24] hover:bg-white hover:text-black text-white px-5 py-1.5 font-oswald text-xs uppercase font-bold tracking-widest transition-colors shrink-0"
                  >
                    SUBSCRIBE
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Expanded Lightbox Modal (Supports viewing both Front and Back cover) */}
      {expandedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 sm:p-8"
          onClick={() => setExpandedImage(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-white border-2 border-black p-4 space-y-3 text-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setExpandedImage(null)}
              className="absolute top-3 right-3 text-black hover:text-[#E51B24] p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Front / Back / Vinyl Mockup Toggle if viewing album artwork */}
            {expandedImage.includes('cover') || expandedImage.includes('vinyl') || expandedImage.includes('mockup') ? (
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => {
                    setModalView('front');
                    setExpandedImage('/assets/drive/cover-art-new.jpg');
                    setExpandedCaption('LOVNIS — Debut Album Front Cover Artwork (Collage by Murilo Sá)');
                  }}
                  className={`px-3 py-1 text-xs font-oswald uppercase tracking-wider font-bold border ${
                    modalView === 'front' ? 'bg-black text-white border-black' : 'bg-white text-black border-neutral-300'
                  }`}
                >
                  FRONT COVER
                </button>
                <button
                  onClick={() => {
                    setModalView('back');
                    setExpandedImage('/assets/drive/back-cover.jpg');
                    setExpandedCaption('LOVNIS — Debut Album Back Cover Artwork & Tracklist');
                  }}
                  className={`px-3 py-1 text-xs font-oswald uppercase tracking-wider font-bold border ${
                    modalView === 'back' ? 'bg-black text-white border-black' : 'bg-white text-black border-neutral-300'
                  }`}
                >
                  BACK COVER
                </button>
                <button
                  onClick={() => {
                    setModalView('front');
                    setExpandedImage('/assets/drive/vinyl-mockup.png');
                    setExpandedCaption('LOVNIS — Debut LP 12" Vinyl Record Mockup');
                  }}
                  className="px-3 py-1 text-xs font-oswald uppercase tracking-wider font-bold border bg-white text-black border-neutral-300 hover:border-black"
                >
                  VINYL MOCKUP
                </button>
              </div>
            ) : (
              <span className="text-xs font-oswald text-[#E51B24] uppercase font-bold tracking-wider block">
                LOVNIS ARCHIVE VIEW
              </span>
            )}

            <div className="border border-neutral-300 bg-neutral-100 max-h-[72vh] flex items-center justify-center overflow-hidden">
              <img
                src={expandedImage}
                alt="Expanded view"
                className="max-h-[68vh] w-auto object-contain mx-auto"
              />
            </div>

            <p className="text-xs text-neutral-700 font-mono-space">
              {expandedCaption}
            </p>
          </div>
        </div>
      )}

      {/* Pre-order / Order Modal */}
      {selectedMerch && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-black max-w-md w-full p-6 text-black relative shadow-2xl space-y-4">
            <button
              onClick={() => setSelectedMerch(null)}
              className="absolute top-4 right-4 text-black hover:text-[#E51B24]"
            >
              <X className="w-5 h-5" />
            </button>

            {orderComplete ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-10 h-10 bg-[#E51B24] text-white rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="text-xl font-archivo uppercase text-black font-bold">
                  {selectedMerch.isPreorder ? 'Pre-Order Recorded' : 'Order Confirmed'}
                </h4>
                <p className="text-xs text-neutral-700">
                  Confirmation sent to {buyerEmail || 'your email'}. Thank you for supporting LOVNIS!
                </p>
                <button
                  onClick={() => setSelectedMerch(null)}
                  className="bg-black text-white px-5 py-2 text-xs font-oswald uppercase tracking-wider font-bold"
                >
                  CLOSE
                </button>
              </div>
            ) : (
              <form onSubmit={handleCompleteOrder} className="space-y-3">
                <div>
                  <span className="text-[10px] font-mono-space text-[#E51B24] uppercase font-bold tracking-wider">
                    {selectedMerch.isPreorder ? 'PRE-ORDER' : 'ORDER'}
                  </span>
                  <h4 className="text-lg font-archivo uppercase text-black font-bold">
                    {selectedMerch.title}
                  </h4>
                  <div className="text-base font-archivo font-bold text-[#E51B24] mt-0.5">
                    {selectedMerch.price}
                  </div>
                </div>

                <div className="space-y-2.5 pt-1">
                  <div>
                    <label className="block text-[11px] font-oswald uppercase text-neutral-700 font-bold mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full bg-neutral-50 border border-neutral-300 p-2 text-xs text-black focus:outline-none focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-oswald uppercase text-neutral-700 font-bold mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      placeholder="Your Email"
                      className="w-full bg-neutral-50 border border-neutral-300 p-2 text-xs text-black focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#E51B24] hover:bg-black text-white py-2.5 text-xs font-oswald font-bold uppercase tracking-widest transition-colors mt-2"
                >
                  {selectedMerch.isPreorder ? 'CONFIRM PRE-ORDER RESERVATION' : 'CONFIRM ORDER'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
