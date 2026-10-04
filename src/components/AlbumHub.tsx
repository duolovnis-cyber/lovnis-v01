import React, { useState } from 'react';
import { ShoppingBag, Disc, Music, FileText, Check, Mail, Sparkles, ExternalLink, Calendar, Clock, X } from 'lucide-react';
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
import { ImagePlaceholder } from './ImagePlaceholder';
import { SamplyPlayer } from './SamplyPlayer';
import { vinylPlayer } from '../utils/audioPreview';

export const AlbumHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'presale' | 'player' | 'artwork' | 'credits'>('presale');
  const [selectedMerch, setSelectedMerch] = useState<MerchItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [orderComplete, setOrderComplete] = useState(false);

  // Newsletter
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const allTracks = [...LP_TRACKS_SIDE_ONE, ...LP_TRACKS_SIDE_TWO];
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);

  const handleOpenPreorder = (item: MerchItem) => {
    setSelectedMerch(item);
    setQuantity(1);
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
      existing.push({ email: newsletterEmail, source: 'album-hub-newsletter', date: new Date().toISOString() });
      localStorage.setItem('lovnis_subscribers', JSON.stringify(existing));
    } catch {
      // Fallback
    }
    setNewsletterSubmitted(true);
  };

  return (
    <section id="album-hub" className="bg-[#FAF9F6] text-neutral-900 py-16 sm:py-20 px-6 sm:px-12 border-b-2 border-black">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Master Section Header */}
        <div className="border-b-2 border-black pb-6 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#E51B24] text-white px-2.5 py-0.5 text-xs font-oswald font-bold tracking-widest uppercase">
                DEBUT LP ARCHIVE
              </span>
              <span className="text-xs font-mono-space text-neutral-600 font-bold uppercase">
                LOVNIS · BERLIN
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-archivo uppercase text-black tracking-tight leading-none">
              LOVNIS Debut Album
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-mono-space">
            <div className="bg-white border-2 border-black px-3 py-1.5 flex items-center gap-2 shadow-xs">
              <Calendar className="w-4 h-4 text-[#E51B24]" />
              <span>Release: <strong className="font-bold">{PRESALE_CONFIG.onlineReleaseDate}</strong></span>
            </div>
            <div className="bg-white border-2 border-black px-3 py-1.5 flex items-center gap-2 shadow-xs">
              <Clock className="w-4 h-4 text-[#E51B24]" />
              <span>Vinyl Deliver: <strong className="font-bold">~3 months</strong></span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* BLENDED TAB NAVIGATION (Keeps everything together seamlessly) */}
        {/* ============================================================ */}
        <div className="flex flex-wrap items-center gap-2 border-b-2 border-black pb-3">
          <button
            onClick={() => setActiveTab('presale')}
            className={`px-5 py-2.5 text-xs sm:text-sm font-oswald uppercase tracking-wider font-bold transition-all flex items-center gap-2 border-2 ${
              activeTab === 'presale'
                ? 'bg-black text-white border-black shadow-xs'
                : 'bg-white text-neutral-800 border-neutral-300 hover:border-black'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-[#E51B24]" />
            <span>Pre-Sale &amp; Merch</span>
          </button>

          <button
            onClick={() => setActiveTab('player')}
            className={`px-5 py-2.5 text-xs sm:text-sm font-oswald uppercase tracking-wider font-bold transition-all flex items-center gap-2 border-2 ${
              activeTab === 'player'
                ? 'bg-black text-white border-black shadow-xs'
                : 'bg-white text-neutral-800 border-neutral-300 hover:border-black'
            }`}
          >
            <Disc className="w-4 h-4 text-[#E51B24]" />
            <span>Album Player &amp; Tracklist</span>
          </button>

          <button
            onClick={() => setActiveTab('artwork')}
            className={`px-5 py-2.5 text-xs sm:text-sm font-oswald uppercase tracking-wider font-bold transition-all flex items-center gap-2 border-2 ${
              activeTab === 'artwork'
                ? 'bg-black text-white border-black shadow-xs'
                : 'bg-white text-neutral-800 border-neutral-300 hover:border-black'
            }`}
          >
            <Music className="w-4 h-4 text-[#E51B24]" />
            <span>Artwork &amp; Streaming</span>
          </button>

          <button
            onClick={() => setActiveTab('credits')}
            className={`px-5 py-2.5 text-xs sm:text-sm font-oswald uppercase tracking-wider font-bold transition-all flex items-center gap-2 border-2 ${
              activeTab === 'credits'
                ? 'bg-black text-white border-black shadow-xs'
                : 'bg-white text-neutral-800 border-neutral-300 hover:border-black'
            }`}
          >
            <FileText className="w-4 h-4 text-[#E51B24]" />
            <span>Band &amp; Liner Notes</span>
          </button>
        </div>

        {/* ============================================================ */}
        {/* TAB 1: PRE-SALE & MERCH + NEWSLETTER BOX                     */}
        {/* ============================================================ */}
        {activeTab === 'presale' && (
          <div className="space-y-12 animate-fadeIn">
            {/* Merch Grid with Clean Placeholders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {MERCH_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border-2 border-black flex flex-col justify-between shadow-xs hover:border-[#E51B24] transition-colors group"
                >
                  <div>
                    {/* Placeholder image as requested */}
                    <div className="border-b-2 border-black bg-neutral-100">
                      <ImagePlaceholder
                        label={item.title}
                        sublabel={item.format}
                        aspect="aspect-square"
                      />
                    </div>

                    <div className="p-5 space-y-2.5">
                      {item.badge && (
                        <span className="inline-block bg-[#E51B24] text-white px-2 py-0.5 text-[10px] font-oswald font-bold uppercase tracking-wider">
                          {item.badge}
                        </span>
                      )}
                      <h3 className="font-archivo text-lg uppercase text-black font-bold group-hover:text-[#E51B24] transition-colors line-clamp-1">
                        {item.title}
                      </h3>
                      <span className="font-archivo text-2xl text-black block font-bold">
                        {item.price}
                      </span>
                      <p className="text-xs text-neutral-600 line-clamp-2">
                        {item.subtitle}
                      </p>

                      <div className="pt-2 text-[11px] font-mono-space text-neutral-500 border-t border-neutral-200">
                        <span className="text-[#E51B24] font-bold block">FORECAST:</span>
                        <span>{item.deliveryForecast}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <button
                      onClick={() => handleOpenPreorder(item)}
                      className="w-full bg-black hover:bg-[#E51B24] text-white py-3 text-xs font-oswald font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>PRE-ORDER NOW</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Newsletter Box (High Focus) */}
            <div className="bg-black text-white p-6 sm:p-10 border-4 border-[#E51B24] shadow-xl">
              <div className="max-w-3xl mx-auto space-y-4 text-center sm:text-left">
                <span className="text-xs font-oswald tracking-widest text-[#E51B24] uppercase font-bold block">
                  NEWSLETTER SUBMISSION
                </span>
                <h3 className="text-2xl sm:text-3xl font-archivo uppercase text-white font-bold">
                  Keep the Fire Burning
                </h3>
                <p className="text-sm sm:text-base text-neutral-200 font-sans leading-relaxed">
                  Sign up for discounts, ticket promos and exclusive unreleased material access.
                </p>

                {newsletterSubmitted ? (
                  <div className="bg-neutral-900 border border-[#E51B24] p-4 text-center text-xs text-neutral-200">
                    ✓ You are on the list! Album stream is unlocked and discounts are on the way.
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 pt-2">
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Your email address..."
                      className="flex-1 bg-neutral-900 border-2 border-neutral-700 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E51B24]"
                    />
                    <button
                      type="submit"
                      className="bg-[#E51B24] hover:bg-white hover:text-black text-white px-7 py-3 font-oswald text-xs uppercase font-bold tracking-widest transition-colors shrink-0"
                    >
                      SUBSCRIBE NOW
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: ALBUM PLAYER & TRACKLIST                              */}
        {/* ============================================================ */}
        {activeTab === 'player' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Embedded Samply / Untitled Player */}
            <SamplyPlayer onTrackChange={(t) => {
              const idx = allTracks.findIndex((track) => track.title === t.title);
              if (idx !== -1) setActiveTrackIndex(idx);
            }} />

            {/* Side A & Side B Interactive Tracklist Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* SIDE ONE */}
              <div className="bg-white border-2 border-black p-6 space-y-4 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b-2 border-black">
                  <h4 className="font-archivo text-xl uppercase font-bold text-black">
                    Side One (Lado A)
                  </h4>
                  <span className="text-xs font-mono-space bg-black text-white px-2 py-0.5">
                    6 TRACKS · 33⅓ RPM
                  </span>
                </div>

                <div className="divide-y divide-neutral-200">
                  {LP_TRACKS_SIDE_ONE.map((track) => (
                    <div
                      key={track.number}
                      onClick={() => {
                        vinylPlayer.setMaxDuration(180);
                        vinylPlayer.playTrack(track.number, 0);
                      }}
                      className="py-3 px-2 hover:bg-neutral-50 cursor-pointer flex flex-col group transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono-space font-bold text-xs text-[#E51B24]">
                            {String(track.number).padStart(2, '0')}
                          </span>
                          <span className="font-archivo text-sm sm:text-base uppercase group-hover:text-[#E51B24] font-bold transition-colors">
                            {track.title}
                          </span>
                        </div>
                        <span className="text-xs font-mono-space text-neutral-500">
                          {track.duration}
                        </span>
                      </div>
                      {track.guests && (
                        <p className="mt-1 ml-6 text-xs text-[#E51B24]">
                          ★ {track.guests}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* SIDE TWO */}
              <div className="bg-white border-2 border-black p-6 space-y-4 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b-2 border-black">
                  <h4 className="font-archivo text-xl uppercase font-bold text-black">
                    Side Two (Lado B)
                  </h4>
                  <span className="text-xs font-mono-space bg-black text-white px-2 py-0.5">
                    7 TRACKS · 33⅓ RPM
                  </span>
                </div>

                <div className="divide-y divide-neutral-200">
                  {LP_TRACKS_SIDE_TWO.map((track) => (
                    <div
                      key={track.number}
                      onClick={() => {
                        vinylPlayer.setMaxDuration(180);
                        vinylPlayer.playTrack(track.number, 0);
                      }}
                      className="py-3 px-2 hover:bg-neutral-50 cursor-pointer flex flex-col group transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono-space font-bold text-xs text-[#E51B24]">
                            {String(track.number).padStart(2, '0')}
                          </span>
                          <span className="font-archivo text-sm sm:text-base uppercase group-hover:text-[#E51B24] font-bold transition-colors">
                            {track.title}
                          </span>
                        </div>
                        <span className="text-xs font-mono-space text-neutral-500">
                          {track.duration}
                        </span>
                      </div>
                      {track.guests && (
                        <p className="mt-1 ml-6 text-xs text-[#E51B24]">
                          ★ {track.guests}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: ARTWORK & STREAMING LINKS                             */}
        {/* ============================================================ */}
        {activeTab === 'artwork' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Artwork Placeholder Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white border-2 border-black p-6 sm:p-10 shadow-xs">
              <div className="max-w-md mx-auto w-full border-2 border-black">
                <ImagePlaceholder
                  label="ALBUM ARTWORK COVER"
                  sublabel="MURILO SÁ · AMANDA LONGO · PUTTI · BERNAR GOMMA"
                  aspect="aspect-square"
                />
              </div>

              <div className="space-y-4">
                <span className="text-xs font-oswald tracking-widest text-[#E51B24] uppercase font-bold block">
                  COVER ARTWORK BY MURILO SÁ
                </span>
                <h3 className="text-2xl sm:text-3xl font-archivo uppercase text-black font-bold">
                  Tropicália Collage &amp; Berlin Noir
                </h3>
                <p className="text-sm text-neutral-700 leading-relaxed font-sans">
                  The visual identity of LOVNIS reflects their living spaces in Berlin: cut-up photographs, high-contrast halftones, full ashtrays, bold red cadmium fields, and handwritten poetry. Featuring Amanda Longo, Murilo Sá, Bernar Gomma and Putti.
                </p>
                <div className="p-3 bg-neutral-50 border border-neutral-300 text-xs font-mono-space text-neutral-700 space-y-1">
                  <div><strong>Format:</strong> 12&quot; Vinyl Gatefold LP + Cassette + Digital</div>
                  <div><strong>Online Release:</strong> {PRESALE_CONFIG.onlineReleaseDate}</div>
                  <div><strong>Vinyl Delivery:</strong> {PRESALE_CONFIG.vinylDeliveryForecast}</div>
                </div>
              </div>
            </div>

            {/* Official Platform Logos */}
            <div className="bg-white border-2 border-black p-6 sm:p-8 space-y-4 shadow-xs">
              <span className="text-xs font-oswald text-[#E51B24] uppercase font-bold tracking-widest block">
                OFFICIAL STREAMING &amp; DISCOGRAPHY LINKS
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {/* Bandcamp */}
                <a
                  href="https://lovnis.bandcamp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 border-2 border-neutral-300 hover:border-black flex flex-col items-center justify-center text-center group transition-colors"
                >
                  <span className="font-archivo text-sm uppercase text-black font-bold group-hover:text-[#E51B24]">
                    Bandcamp
                  </span>
                  <span className="text-[10px] font-mono-space text-neutral-500 mt-1">Pre-Sale</span>
                </a>

                {/* SoundCloud */}
                <a
                  href="https://soundcloud.com/lovnis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 border-2 border-neutral-300 hover:border-black flex flex-col items-center justify-center text-center group transition-colors"
                >
                  <span className="font-archivo text-sm uppercase text-black font-bold group-hover:text-[#E51B24]">
                    SoundCloud
                  </span>
                  <span className="text-[10px] font-mono-space text-neutral-500 mt-1">Audio Reel</span>
                </a>

                {/* Spotify */}
                <a
                  href="https://open.spotify.com/search/LOVNIS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 border-2 border-neutral-300 hover:border-black flex flex-col items-center justify-center text-center group transition-colors"
                >
                  <span className="font-archivo text-sm uppercase text-black font-bold group-hover:text-[#E51B24]">
                    Spotify
                  </span>
                  <span className="text-[10px] font-mono-space text-neutral-500 mt-1">Pre-Save</span>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com/c/LOVNISDUO"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 border-2 border-neutral-300 hover:border-black flex flex-col items-center justify-center text-center group transition-colors"
                >
                  <span className="font-archivo text-sm uppercase text-black font-bold group-hover:text-[#E51B24]">
                    YouTube
                  </span>
                  <span className="text-[10px] font-mono-space text-neutral-500 mt-1">Videos</span>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/lovnisduo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 border-2 border-neutral-300 hover:border-black flex flex-col items-center justify-center text-center group transition-colors"
                >
                  <span className="font-archivo text-sm uppercase text-black font-bold group-hover:text-[#E51B24]">
                    Instagram
                  </span>
                  <span className="text-[10px] font-mono-space text-neutral-500 mt-1">@lovnisduo</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 4: BAND & LINER NOTES                                    */}
        {/* ============================================================ */}
        {activeTab === 'credits' && (
          <div className="space-y-10 animate-fadeIn">
            {/* Inline 4 Band Members (Placeholders as user requested) */}
            <div className="space-y-4">
              <span className="text-xs font-oswald text-[#E51B24] uppercase font-bold tracking-widest block">
                LINEUP &amp; RECORDING SESSIONS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {BAND_MEMBERS_CREDITS.map((member, idx) => (
                  <div key={idx} className="bg-white border-2 border-black p-4 flex flex-col justify-between shadow-xs">
                    <div>
                      <div className="border border-neutral-300 mb-3 bg-neutral-100">
                        <ImagePlaceholder
                          label={member.name}
                          sublabel={member.aka}
                          aspect="aspect-[4/5]"
                        />
                      </div>

                      <h4 className="font-archivo text-lg uppercase text-black font-bold">
                        {member.name}
                      </h4>
                      {member.years && (
                        <span className="text-xs font-mono-space text-[#E51B24] font-bold block mt-0.5">
                          ({member.years})
                        </span>
                      )}
                      <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                        {member.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Album Credits with Special Guests inside */}
            <div className="bg-white border-2 border-black p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="border-b border-black pb-3">
                <span className="text-xs font-oswald text-[#E51B24] uppercase font-bold tracking-widest block">
                  TECHNICAL METADATA
                </span>
                <h4 className="text-xl font-archivo uppercase text-black font-bold">
                  Album Credits &amp; Collaborators
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-neutral-800 font-sans">
                <div className="space-y-2">
                  <p><strong>Production:</strong> {ALBUM_CREDITS.producedAndRecorded}</p>
                  <p><strong>Mixing:</strong> {ALBUM_CREDITS.mixedBy}</p>
                  <p><strong>Artwork &amp; Design:</strong> {ALBUM_CREDITS.coverArtwork} · {ALBUM_CREDITS.albumDesign}</p>
                  <p className="text-neutral-500 pt-2 border-t border-neutral-200">{ALBUM_CREDITS.photographers}</p>
                </div>

                <div className="space-y-1.5 bg-neutral-50 p-4 border border-neutral-200">
                  <span className="text-xs font-oswald text-[#E51B24] uppercase font-bold block mb-1">
                    SPECIAL GUESTS
                  </span>
                  {ALBUM_CREDITS.specialGuests.map((g, i) => (
                    <div key={i} className="text-xs text-neutral-700">★ {g}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Liner Notes Essay */}
            <div className="bg-white border-2 border-black p-6 sm:p-10 space-y-6 shadow-xs">
              <div className="border-b border-black pb-4">
                <span className="text-xs font-oswald text-[#E51B24] uppercase font-bold tracking-widest block">
                  ALBUM MANIFESTO
                </span>
                <h4 className="text-xl sm:text-2xl font-archivo uppercase text-black font-bold">
                  {LINER_NOTES.dedication}
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-neutral-800 leading-relaxed font-sans">
                <p className="whitespace-pre-line">{LINER_NOTES.columns[0]}</p>
                <p className="whitespace-pre-line">{LINER_NOTES.columns[1]}</p>
                <div className="flex flex-col justify-between">
                  <p className="whitespace-pre-line">{LINER_NOTES.columns[2]}</p>
                  <div className="pt-4 border-t border-black mt-4">
                    <span className="text-2xl font-caveat text-black block">{LINER_NOTES.authorSignature}</span>
                    <span className="text-xs font-mono-space text-neutral-500">Murilo Sá · Berlin</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Pre-order modal */}
      {selectedMerch && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-black max-w-lg w-full p-6 text-black relative shadow-2xl space-y-4">
            <button
              onClick={() => setSelectedMerch(null)}
              className="absolute top-4 right-4 text-black hover:text-[#E51B24]"
            >
              <X className="w-5 h-5" />
            </button>

            {orderComplete ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 bg-[#E51B24] text-white rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-archivo uppercase text-black">Pre-Order Recorded</h3>
                <p className="text-xs sm:text-sm text-neutral-700">
                  Confirmation dispatched to {buyerEmail || 'your email'}. Thank you for supporting LOVNIS!
                </p>
                <button
                  onClick={() => setSelectedMerch(null)}
                  className="bg-black text-white px-6 py-2.5 text-xs font-oswald uppercase tracking-wider font-bold"
                >
                  CLOSE
                </button>
              </div>
            ) : (
              <form onSubmit={handleCompleteOrder} className="space-y-4">
                <div>
                  <span className="text-xs font-oswald text-[#E51B24] uppercase font-bold tracking-wider">
                    PRE-ORDER
                  </span>
                  <h3 className="text-xl font-archivo uppercase text-black font-bold">
                    {selectedMerch.title}
                  </h3>
                  <div className="text-lg font-archivo font-bold text-[#E51B24] mt-1">
                    {selectedMerch.price}
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-oswald uppercase text-neutral-700 font-bold mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full bg-neutral-50 border border-neutral-300 p-2 text-sm text-black focus:outline-none focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-oswald uppercase text-neutral-700 font-bold mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      placeholder="Your Email"
                      className="w-full bg-neutral-50 border border-neutral-300 p-2 text-sm text-black focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#E51B24] hover:bg-black text-white py-3 text-xs font-oswald font-bold uppercase tracking-widest transition-colors"
                >
                  CONFIRM PRE-ORDER RESERVATION
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
