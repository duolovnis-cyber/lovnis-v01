import React, { useState } from 'react';
import { ShoppingBag, Check, Mail, Clock, Calendar, Sparkles, X } from 'lucide-react';
import { MERCH_ITEMS, PRESALE_CONFIG } from '../data/lovnisData';
import { MerchItem } from '../types';

export const PresaleSection: React.FC = () => {
  const [selectedMerch, setSelectedMerch] = useState<MerchItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerName, setBuyerName] = useState('');
  const [shippingCountry, setShippingCountry] = useState('Germany');
  const [orderComplete, setOrderComplete] = useState(false);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

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
      existing.push({ email: newsletterEmail, source: 'newsletter', date: new Date().toISOString() });
      localStorage.setItem('lovnis_subscribers', JSON.stringify(existing));
    } catch {
      // LocalStorage fallback
    }
    setNewsletterSubmitted(true);
  };

  return (
    <section id="presale" className="bg-[#FAF9F6] text-neutral-900 py-16 sm:py-24 px-6 sm:px-12 border-b-2 border-black">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header: Bold Pre-Sale Headline & Timeline Highlights */}
        <div className="border-b-2 border-black pb-8">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="bg-[#E51B24] text-white px-2.5 py-0.5 text-xs font-oswald font-bold tracking-widest uppercase">
              OFFICIAL PRE-SALE
            </span>
            <span className="text-xs sm:text-sm font-mono-space font-bold text-neutral-700 uppercase">
              FIRST EDITION PHYSICAL COPIES &amp; MERCH
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-archivo uppercase text-black tracking-tight leading-none">
              Album Pre-Sale
            </h2>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm font-mono-space">
              <div className="bg-white border-2 border-black px-3.5 py-2 flex items-center gap-2 shadow-xs">
                <Calendar className="w-4 h-4 text-[#E51B24]" />
                <span>Online Release Date: <strong className="text-black font-bold">{PRESALE_CONFIG.onlineReleaseDate}</strong></span>
              </div>
              <div className="bg-white border-2 border-black px-3.5 py-2 flex items-center gap-2 shadow-xs">
                <Clock className="w-4 h-4 text-[#E51B24]" />
                <span>Vinyl Delivery: <strong className="text-black font-bold">~3 months from now</strong></span>
              </div>
            </div>
          </div>

          <p className="mt-4 text-base sm:text-lg text-neutral-700 max-w-3xl leading-relaxed">
            Support independent music and secure your limited copy of the LOVNIS self-titled debut album on 12&quot; Vinyl, vintage analog cassette tape, and screenprinted merchandise. All vinyl copies come with printed lyric inner sleeves, liner notes, and high-fidelity digital audio.
          </p>
        </div>

        {/* ============================================================ */}
        {/* MERCHANDISE GRID                                            */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {MERCH_ITEMS.map((item) => (
            <div
              key={item.id}
              className="bg-white border-2 border-black flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow group"
            >
              <div>
                {/* Product Image */}
                <div className="relative aspect-square w-full overflow-hidden bg-neutral-100 border-b-2 border-black">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.badge && (
                    <span className="absolute top-3 left-3 bg-[#E51B24] text-white px-2.5 py-1 text-xs font-oswald font-bold tracking-wider uppercase shadow-xs">
                      {item.badge}
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 bg-black/85 text-white px-2.5 py-1 text-xs font-mono-space font-bold uppercase">
                    {item.format}
                  </span>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-archivo text-xl uppercase text-black font-bold leading-snug group-hover:text-[#E51B24] transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <span className="font-archivo text-2xl text-black block font-bold">
                    {item.price}
                  </span>

                  <p className="text-xs sm:text-sm text-neutral-600 font-medium">
                    {item.subtitle}
                  </p>

                  <div className="pt-2 text-xs font-mono-space text-neutral-500 border-t border-neutral-200">
                    <span className="text-[#E51B24] font-bold block mb-1">SHIPPING FORECAST:</span>
                    <span>{item.deliveryForecast}</span>
                  </div>

                  <ul className="pt-2 space-y-1 text-xs text-neutral-700">
                    {item.features.slice(0, 2).map((feat, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#E51B24] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => handleOpenPreorder(item)}
                  className="w-full bg-black hover:bg-[#E51B24] text-white py-3 text-xs sm:text-sm font-oswald font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>PRE-ORDER NOW</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ============================================================ */}
        {/* NEWSLETTER SUBMISSION BOX (VERY IN FOCUS AS REQUESTED)        */}
        {/* ============================================================ */}
        <div className="bg-black text-white p-8 sm:p-12 border-4 border-[#E51B24] shadow-xl relative overflow-hidden">
          {/* Subtle graphic accent */}
          <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
            <span className="text-9xl font-archivo font-black uppercase text-white">
              LOVNIS
            </span>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto space-y-6 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
              <div>
                <span className="text-xs sm:text-sm font-oswald tracking-widest text-[#E51B24] uppercase font-bold block mb-1">
                  OFFICIAL DISPATCH &amp; FAN PRIVILEGES
                </span>
                <h3 className="text-2xl sm:text-4xl font-archivo uppercase text-white tracking-tight">
                  Join the LOVNIS Newsletter
                </h3>
              </div>
              <div className="inline-flex items-center justify-center sm:justify-start gap-2 text-xs font-mono-space text-neutral-400 bg-neutral-900 px-3 py-1.5 border border-neutral-700">
                <Sparkles className="w-4 h-4 text-[#E51B24]" />
                <span>UNRELEASED ARCHIVES &amp; PROMOS</span>
              </div>
            </div>

            {/* Mandatory requested text */}
            <p className="text-base sm:text-lg text-neutral-200 font-sans leading-relaxed">
              Sign up for discounts, ticket promos and exclusive unreleased material access.
            </p>

            {newsletterSubmitted ? (
              <div className="bg-neutral-900 border-2 border-[#E51B24] p-5 text-center space-y-2">
                <div className="flex items-center justify-center gap-2 text-[#E51B24]">
                  <Check className="w-6 h-6" />
                  <span className="font-archivo text-xl uppercase tracking-wider text-white">
                    You Are On The Guestlist
                  </span>
                </div>
                <p className="text-sm text-neutral-300">
                  Thank you for keeping Amanda&apos;s flame alive. We will email you exclusive download links, ticket pre-sales, and shipping updates for the October 30 release.
                </p>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full bg-neutral-900 text-white pl-12 pr-4 py-3.5 border-2 border-neutral-700 focus:border-[#E51B24] focus:outline-none text-base placeholder:text-neutral-500 font-sans"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#E51B24] hover:bg-white hover:text-black text-white px-8 py-3.5 font-oswald text-sm sm:text-base font-bold tracking-widest uppercase transition-colors shrink-0 flex items-center justify-center gap-2"
                >
                  <span>SUBSCRIBE NOW</span>
                </button>
              </form>
            )}

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-mono-space text-neutral-400 pt-2">
              <span>✓ No spam guarantee</span>
              <span>·</span>
              <span>✓ Unsubscribe anytime</span>
              <span>·</span>
              <span>✓ Debut LP Drops 30.10.2026</span>
            </div>
          </div>
        </div>

      </div>

      {/* ============================================================ */}
      {/* PRE-ORDER MODAL                                              */}
      {/* ============================================================ */}
      {selectedMerch && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-black max-w-xl w-full p-6 sm:p-8 text-black relative shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedMerch(null)}
              className="absolute top-5 right-5 text-black hover:text-[#E51B24] p-1"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            {orderComplete ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-[#E51B24] text-white rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <span className="text-xs font-oswald tracking-widest text-[#E51B24] uppercase font-bold block">
                  ORDER RESERVATION CONFIRMED
                </span>
                <h3 className="text-3xl font-archivo uppercase text-black">
                  Thank You, {buyerName || 'Friend'}!
                </h3>
                <p className="text-sm text-neutral-700 leading-relaxed max-w-md mx-auto">
                  Your pre-order for <strong>{quantity}x {selectedMerch.title}</strong> has been recorded. A confirmation receipt has been dispatched to <strong>{buyerEmail || 'your email'}</strong>.
                </p>
                <div className="p-4 bg-neutral-100 border border-neutral-300 text-xs font-mono-space text-neutral-700 text-left space-y-1">
                  <div><strong>Format:</strong> {selectedMerch.format}</div>
                  <div><strong>Release Date:</strong> {PRESALE_CONFIG.onlineReleaseDate}</div>
                  <div><strong>Delivery Schedule:</strong> {selectedMerch.deliveryForecast}</div>
                </div>
                <button
                  onClick={() => setSelectedMerch(null)}
                  className="bg-black hover:bg-[#E51B24] text-white px-8 py-3 text-xs font-oswald font-bold tracking-widest uppercase transition-colors"
                >
                  RETURN TO SITE
                </button>
              </div>
            ) : (
              <form onSubmit={handleCompleteOrder} className="space-y-5">
                <div className="border-b-2 border-black pb-4">
                  <span className="text-xs font-oswald tracking-widest text-[#E51B24] uppercase font-bold block">
                    PRE-ORDER CHECKOUT
                  </span>
                  <h3 className="text-2xl font-archivo uppercase text-black mt-1">
                    {selectedMerch.title}
                  </h3>
                  <div className="flex items-center justify-between text-lg font-archivo font-bold mt-2">
                    <span className="text-[#E51B24]">{selectedMerch.price}</span>
                    <span className="text-xs font-mono-space text-neutral-600 bg-neutral-100 px-2 py-0.5 border border-neutral-200">
                      {selectedMerch.format}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {selectedMerch.description}
                </p>

                <div className="p-3 bg-neutral-100 border border-neutral-300 text-xs font-mono-space text-neutral-700">
                  <span className="text-[#E51B24] font-bold">ESTIMATED DELIVERY:</span> {selectedMerch.deliveryForecast}
                </div>

                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-oswald uppercase text-neutral-700 font-bold mb-1">
                        Quantity
                      </label>
                      <select
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="w-full bg-neutral-50 border border-neutral-300 p-2.5 text-sm font-mono-space"
                      >
                        {[1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? 'copy' : 'copies'}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-oswald uppercase text-neutral-700 font-bold mb-1">
                        Shipping Country
                      </label>
                      <select
                        value={shippingCountry}
                        onChange={(e) => setShippingCountry(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-300 p-2.5 text-sm font-sans"
                      >
                        <option value="Germany">Germany (Domestic)</option>
                        <option value="Brazil">Brazil</option>
                        <option value="UK">United Kingdom</option>
                        <option value="EU">European Union</option>
                        <option value="US">United States / Worldwide</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-oswald uppercase text-neutral-700 font-bold mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      placeholder="e.g. Maria Silva"
                      className="w-full bg-neutral-50 border border-neutral-300 p-2.5 text-sm focus:border-black focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-oswald uppercase text-neutral-700 font-bold mb-1">
                      Email Address (for download &amp; tracking)
                    </label>
                    <input
                      type="email"
                      required
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      placeholder="e.g. maria@example.com"
                      className="w-full bg-neutral-50 border border-neutral-300 p-2.5 text-sm focus:border-black focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-300 flex items-center justify-between gap-4">
                  <div className="font-archivo text-xl text-black">
                    Total: <span className="text-[#E51B24]">€ {(parseFloat(selectedMerch.price.replace('€', '').trim()) * quantity).toFixed(2)}</span>
                  </div>

                  <button
                    type="submit"
                    className="bg-black hover:bg-[#E51B24] text-white px-6 py-3 text-xs font-oswald font-bold tracking-widest uppercase transition-colors"
                  >
                    CONFIRM PRE-ORDER
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
