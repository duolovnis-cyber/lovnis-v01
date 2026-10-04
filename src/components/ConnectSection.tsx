import React, { useState } from 'react';
import { ExternalLink, Mail, MessageSquare, Send, Check } from 'lucide-react';
import { BAND_INFO } from '../data/lovnisData';

export const ConnectSection: React.FC = () => {
  const [name, setName] = useState('');
  const [emailOrCity, setEmailOrCity] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[LOVNIS Inquiry] ${name}`);
    const body = encodeURIComponent(
      `Hello LOVNIS,\n\nName: ${name}\nLocation / Contact: ${emailOrCity}\n\nMessage:\n${message}\n\nSent via lovnis.com`
    );
    window.location.href = `mailto:${BAND_INFO.contacts.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="connect" className="bg-[#FAF9F6] text-neutral-900 py-14 sm:py-16 px-6 sm:px-12 border-b-2 border-black">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Minimal Header */}
        <div className="border-b-2 border-black pb-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <span className="text-[11px] font-oswald tracking-widest text-[#E51B24] uppercase font-bold block mb-1">
              DIRECT BOOKING &amp; PRODUCTION CONTACT
            </span>
            <h2 className="text-3xl sm:text-5xl font-archivo uppercase text-black tracking-tight font-black">
              Connect &amp; Bookings
            </h2>
          </div>
          <span className="text-xs font-mono-space text-neutral-500 uppercase">
            BERLIN · BRAZIL · WORLDWIDE
          </span>
        </div>

        {/* Minimal 3-Item Quick Action Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Stage Rider */}
          <a
            href={BAND_INFO.contacts.riderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-white border-2 border-black hover:border-[#E51B24] transition-colors group flex flex-col justify-between shadow-xs"
          >
            <div>
              <span className="text-[10px] font-mono-space text-[#E51B24] font-bold uppercase block mb-1">
                TECHNICAL SPECS
              </span>
              <h3 className="font-archivo text-base uppercase text-black font-bold group-hover:text-[#E51B24] transition-colors flex items-center gap-1.5">
                <span>Stage Rider (PDF)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </h3>
            </div>
            <span className="text-xs font-mono-space text-neutral-500 mt-2">
              Patch list &amp; stage map &rarr;
            </span>
          </a>

          {/* Email */}
          <a
            href={`mailto:${BAND_INFO.contacts.email}`}
            className="p-4 bg-white border-2 border-black hover:border-[#E51B24] transition-colors group flex flex-col justify-between shadow-xs"
          >
            <div>
              <span className="text-[10px] font-mono-space text-[#E51B24] font-bold uppercase block mb-1">
                DIRECT EMAIL
              </span>
              <h3 className="font-archivo text-base uppercase text-black font-bold group-hover:text-[#E51B24] transition-colors flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-[#E51B24]" />
                <span className="truncate">{BAND_INFO.contacts.email}</span>
              </h3>
            </div>
            <span className="text-xs font-mono-space text-neutral-500 mt-2">
              Send direct email &rarr;
            </span>
          </a>

          {/* Phone / Whatsapp */}
          <a
            href={BAND_INFO.contacts.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-white border-2 border-black hover:border-[#E51B24] transition-colors group flex flex-col justify-between shadow-xs"
          >
            <div>
              <span className="text-[10px] font-mono-space text-[#E51B24] font-bold uppercase block mb-1">
                WHATSAPP / TELEGRAM
              </span>
              <h3 className="font-archivo text-base uppercase text-black font-bold group-hover:text-[#E51B24] transition-colors flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-[#E51B24]" />
                <span>+49 176 25876173</span>
              </h3>
            </div>
            <span className="text-xs font-mono-space text-neutral-500 mt-2">
              Murilo Sá (Berlin) &rarr;
            </span>
          </a>
        </div>

        {/* Minimal Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border-2 border-black p-5 sm:p-6 space-y-4 shadow-xs"
        >
          <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
            <span className="text-xs font-oswald uppercase text-black font-bold tracking-wider">
              QUICK INQUIRY DISPATCH
            </span>
            {sent && (
              <span className="text-xs font-mono-space text-emerald-600 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Email formatted!
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name / Venue / Festival"
              className="bg-neutral-50 border border-neutral-300 p-2.5 text-xs sm:text-sm text-black focus:outline-none focus:border-black"
            />
            <input
              type="text"
              required
              value={emailOrCity}
              onChange={(e) => setEmailOrCity(e.target.value)}
              placeholder="Your Email or City"
              className="bg-neutral-50 border border-neutral-300 p-2.5 text-xs sm:text-sm text-black focus:outline-none focus:border-black"
            />
          </div>

          <textarea
            rows={3}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us about the concert date, venue, or proposal..."
            className="w-full bg-neutral-50 border border-neutral-300 p-2.5 text-xs sm:text-sm text-black focus:outline-none focus:border-black resize-none"
          />

          <button
            type="submit"
            className="w-full bg-black hover:bg-[#E51B24] text-white py-3 text-xs font-oswald font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2"
          >
            <Send className="w-3.5 h-3.5" />
            <span>DISPATCH INQUIRY</span>
          </button>
        </form>

      </div>
    </section>
  );
};
