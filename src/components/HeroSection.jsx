import React, { useEffect, useRef } from 'react';
import { Sparkles, Zap, ArrowDown, ChevronRight } from 'lucide-react';
import gsap from 'gsap';

export default function HeroSection() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const badgeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(badgeRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from(titleRef.current.children, {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'back.out(1.7)',
        delay: 0.2,
      });

      gsap.from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.6,
      });

      gsap.from(ctaRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.8,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative z-10 pt-16 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[85vh] text-center"
    >
      <div
        ref={badgeRef}
        className="cursor-pointer interactive-control inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 border border-red-500/40 text-red-400 font-tech uppercase text-xs sm:text-sm tracking-widest shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:scale-105 transition-transform mb-8"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
        </span>
        Dimensional Rift Detected: Spider-Sense Active
        <Zap className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
      </div>

      <div ref={titleRef} className="max-w-5xl">
        <h2 className="font-tech text-base sm:text-2xl text-cyan-400 tracking-[0.25em] uppercase mb-2">
          Three Generations // One Destiny
        </h2>
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bebas tracking-wide text-white uppercase leading-[0.9] drop-shadow-2xl">
          THE <span className="text-red-500 drop-shadow-[0_0_35px_rgba(239,68,68,0.6)]">SPIDER-MEN</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-cyan-400">
            MULTIVERSE NEXUS
          </span>
        </h1>
      </div>

      <p
        ref={subtitleRef}
        className="mt-6 text-slate-300 max-w-2xl text-base sm:text-xl font-outfit leading-relaxed drop-shadow"
      >
        Experience the legend of <strong className="text-white font-semibold">Tobey Maguire</strong>,{' '}
        <strong className="text-white font-semibold">Andrew Garfield</strong>, and{' '}
        <strong className="text-white font-semibold">Tom Holland</strong>. Hover over their iconic masks
        to reveal the heroes underneath.
      </p>

      <div
        ref={ctaRef}
        className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
      >
        <a
          href="#trio-nexus"
          className="interactive-control px-7 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-tech uppercase tracking-wider text-sm sm:text-base font-bold flex items-center gap-2 shadow-[0_0_25px_rgba(239,68,68,0.5)] hover:scale-105 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          Enter The Trio Nexus
          <ChevronRight className="w-4 h-4" />
        </a>
      </div>

      <a
        href="#trio-nexus"
        className="mt-12 text-slate-400 hover:text-red-400 transition-colors flex flex-col items-center gap-1 text-xs font-tech tracking-widest uppercase animate-bounce"
      >
        <span>Scroll to Explore</span>
        <ArrowDown className="w-4 h-4 text-red-500" />
      </a>
    </section>
  );
}
