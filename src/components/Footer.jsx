import React from 'react';
import { Sparkles, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-slate-800/80 bg-[#040508] py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div>
          <div className="font-bebas text-3xl tracking-wider text-white">
            SPIDER<span className="text-red-500">VERSE</span> NEXUS
          </div>
          <p className="mt-1 text-xs font-tech text-slate-400 tracking-wider uppercase">
            Earth-96283 // Earth-120703 // Earth-199999
          </p>
          <p className="mt-3 text-sm italic font-outfit text-slate-400 max-w-md">
            "With great power comes great responsibility."
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-3">
          <div className="text-xs text-slate-400 font-outfit flex items-center gap-1">
            Created with Three.js, GSAP, React & TailwindCSS
          </div>

          <button
            onClick={scrollToTop}
            className="interactive-control mt-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-red-950/80 border border-slate-700 hover:border-red-500/60 text-xs font-tech text-slate-200 hover:text-white uppercase tracking-wider flex items-center gap-2 transition-all hover:scale-105"
          >
            <ArrowUp className="w-3.5 h-3.5 text-red-400" />
            Swing Back to Top
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-slate-900 flex items-center justify-center text-xs text-slate-400 font-tech uppercase tracking-wider text-center">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-red-500" />
          <span>
            Made with <span className="text-red-400 font-semibold">Spidy Sence</span> by{' '}
            <strong className="text-white font-bold tracking-widest">Deval patel</strong>
          </span>
          <Sparkles className="w-3.5 h-3.5 text-red-500" />
        </div>
      </div>
    </footer>
  );
}
