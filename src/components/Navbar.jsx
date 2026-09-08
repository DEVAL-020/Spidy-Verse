import React from 'react';
import { Zap, Compass, Shield, Sparkles } from 'lucide-react';

export default function Navbar() {
  const handleNavShootWeb = () => {
    const event = new PointerEvent('pointerdown', {
      clientX: window.innerWidth / 2,
      clientY: window.innerHeight / 2,
    });
    window.dispatchEvent(event);
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#06070d]/80 border-b border-red-500/20 px-4 sm:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-rose-900 border border-red-400/50 flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.4)] group-hover:scale-110 transition-transform">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-white group-hover:rotate-12 transition-transform"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
            <span className="absolute -inset-0.5 rounded-xl border border-red-400 animate-ping opacity-25 pointer-events-none" />
          </div>

          <div>
            <span className="font-bebas text-2xl sm:text-3xl tracking-wider text-white flex items-center gap-1.5 leading-none">
              SPIDER<span className="text-red-500">VERSE</span>
            </span>
            <span className="text-[10px] font-tech uppercase tracking-widest text-slate-400 block -mt-0.5">
              Multiverse Nexus // Earth-616
            </span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-xs font-tech uppercase tracking-wider text-slate-300">
          <a
            href="#trio-nexus"
            className="hover:text-red-400 transition-colors flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5 text-red-500" />
            The Three Spider-Men
          </a>
          <a
            href="#suit-vault"
            className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
          >
            <Shield className="w-3.5 h-3.5 text-cyan-500" />
            Suit Armory
          </a>
          <a
            href="#multiverse-lore"
            className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
          >
            <Compass className="w-3.5 h-3.5 text-amber-500" />
            Timeline Lore
          </a>
        </nav>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={handleNavShootWeb}
            className="interactive-control px-3.5 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 border border-red-500/50 text-red-400 hover:text-red-300 text-xs font-tech tracking-wider uppercase flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(239,68,68,0.25)] hover:scale-105"
            title="Fire web shooter animation"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Shoot Web</span>
          </button>
        </div>
      </div>
    </header>
  );
}
