import React, { useState } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'DEBUT LP PRE-SALE', href: '#debut-lp-archive' },
    { name: 'BIO', href: '#bio' },
    { name: 'VIDEOS', href: '#music' },
    { name: 'PRESS', href: '#press' },
    { name: 'CONNECT', href: '#connect' },
  ];

  return (
    <header
      id="main-navigation"
      className="sticky top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b-2 border-black shadow-xs"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Name + Inline Navigation Menu replacing the previous text */}
        <div className="flex items-center gap-4 lg:gap-8">
          <a
            id="nav-logo"
            href="#"
            className="flex items-center group select-none shrink-0"
            aria-label="LOVNIS"
          >
            <span className="text-3xl sm:text-4xl font-archivo uppercase tracking-tight text-black group-hover:text-[#E51B24] transition-colors font-black">
              LOVNIS
            </span>
          </a>

          {/* User Request: Place menu where the text "DEBUT LP PRE_SALE 30.10.2026" was */}
          <nav className="hidden md:flex items-center space-x-5 lg:space-x-7 border-l-2 border-[#E51B24] pl-4 lg:pl-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-oswald font-bold tracking-wider text-neutral-800 hover:text-[#E51B24] transition-colors uppercase whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>

        {/* Primary Action Button */}
        <div className="hidden md:flex items-center">
          <a
            id="nav-presale-cta"
            href="#debut-lp-archive"
            className="inline-flex items-center gap-2 bg-[#E51B24] hover:bg-black text-white px-4 py-2 text-xs font-oswald font-bold tracking-widest uppercase transition-colors shadow-xs"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>PRE-ORDER LP</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center">
          <button
            id="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-black hover:text-[#E51B24]"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b-2 border-black px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3 font-oswald text-sm font-bold tracking-wider uppercase">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-neutral-800 hover:text-[#E51B24] transition-colors py-1.5 border-b border-neutral-100"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2">
            <a
              href="#album-hub"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-[#E51B24] text-white py-3 text-xs font-oswald font-bold tracking-widest uppercase transition-colors"
            >
              PRE-ORDER VINYL &amp; MERCH &rarr;
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
