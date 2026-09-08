import React, { useState, useRef, useEffect, memo } from 'react';
import { Zap, Sparkles, Eye, EyeOff, Award } from 'lucide-react';

const SPIDER_HEROES = [
  {
    id: 'tobey',
    actorName: 'Tobey Maguire',
    heroAlias: 'The Friendly Neighborhood Spider-Man',
    universe: 'Earth-96283 (Raimi-Verse)',
    year: '2002 – 2007, 2021',
    suitName: 'Classic Raimi Suit',
    maskImg: './assets/spiderman_raimi.jpg',
    faceImg: './assets/tobey_face.jpg',
    suitPosition: 'object-[center_top]',
    facePosition: 'object-[center_15%]',
    themeColor: 'from-red-600 via-rose-700 to-slate-900',
    accentColor: '#ef4444',
    borderGlow: 'hover:border-red-500 hover:shadow-[0_0_40px_rgba(239,68,68,0.5)]',
    badge: 'Peter-Two // The Veteran',
    signatureQuote: '"With great power comes great responsibility."',
    trivia: '"You\'re in the Avengers?! That\'s great! What is that?!"',
    stats: [
      { label: 'Combat Experience', val: 98 },
      { label: 'Organic Web Strength', val: 99 },
      { label: 'Spider-Sense Precision', val: 94 },
    ],
    features: ['Organic Bio-Web Shooters', 'Raised Silver Webbing', 'Bullet-Proof Willpower'],
  },
  {
    id: 'andrew',
    actorName: 'Andrew Garfield',
    heroAlias: 'The Amazing Spider-Man',
    universe: 'Earth-120703 (Webb-Verse)',
    year: '2012 – 2014, 2021',
    suitName: 'Amazing Spidey II Suit',
    maskImg: './assets/spiderman_amazing.jpg',
    faceImg: './assets/andrew_face.jpg',
    suitPosition: 'object-[center_top]',
    facePosition: 'object-[center_20%]',
    themeColor: 'from-cyan-600 via-blue-700 to-slate-900',
    accentColor: '#06b6d4',
    borderGlow: 'hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(6,182,212,0.5)]',
    badge: 'Peter-Three // The Acrobat',
    signatureQuote: '"I\'m Peter three! Peter three!"',
    trivia: '"You\'re in agony, you\'re in pain... and there\'s a reason."',
    stats: [
      { label: 'Acrobatic Agility', val: 100 },
      { label: 'Bio-Chemical Ingenuity', val: 96 },
      { label: 'Web-Shooter Velocity', val: 95 },
    ],
    features: ['Oscorp Engineered Web Fluid', 'Oversized Expressive Bug Eyes', 'Dynamic Free-fall Acrobatics'],
  },
  {
    id: 'tom',
    actorName: 'Tom Holland',
    heroAlias: 'The Integrated MCU Spider-Man',
    universe: 'Earth-199999 / 616 (MCU)',
    year: '2016 – Present',
    suitName: 'Integrated Nanotech Suit',
    maskImg: './assets/spiderman_mcu.jpg',
    faceImg: './assets/tom_face.jpg',
    suitPosition: 'object-[center_top]',
    facePosition: 'object-[center_10%]',
    themeColor: 'from-amber-500 via-red-600 to-slate-900',
    accentColor: '#f59e0b',
    borderGlow: 'hover:border-amber-400 hover:shadow-[0_0_40px_rgba(245,158,11,0.5)]',
    badge: 'Peter-One // The Avenger',
    signatureQuote: '"If you\'re nothing without the suit, then you shouldn\'t have it."',
    trivia: '"I can\'t save everyone... but I have to try."',
    stats: [
      { label: 'Stark Nanotech Tech', val: 99 },
      { label: 'Cosmic / Mystic Battle', val: 97 },
      { label: 'Adaptability & Heart', val: 98 },
    ],
    features: ['Nanotech Armor & Gold Trim', 'Multi-Web Combinations', 'Avengers Level Arsenal'],
  },
];

const SpiderCard = memo(function SpiderCard({
  hero,
  currentPct,
  onRevealChange,
  isSenseOn,
  onTriggerSense,
}) {
  const cardRef = useRef(null);
  const rafId = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.style.setProperty('--reveal-pct', `${currentPct}%`);
    }
  }, [currentPct]);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;

    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      const rotateY = ((x / width) - 0.5) * 14;
      const rotateX = -((y / height) - 0.5) * 14;
      card.style.setProperty('--tilt-x', `${rotateX}deg`);
      card.style.setProperty('--tilt-y', `${rotateY}deg`);

      const pct = Math.round(Math.min(100, Math.max(0, (x / width) * 100)));
      card.style.setProperty('--reveal-pct', `${pct}%`);
    });
  };

  const handleMouseLeave = () => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
    card.style.setProperty('--reveal-pct', `${currentPct}%`);
  };

  return (
    <div
      ref={cardRef}
      className="relative group perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        '--tilt-x': '0deg',
        '--tilt-y': '0deg',
        '--reveal-pct': `${currentPct}%`,
      }}
    >
      {isSenseOn && (
        <div className="absolute -inset-4 pointer-events-none z-30 flex items-center justify-center">
          <div className="w-full h-full rounded-3xl border-2 border-red-500 spider-sense-ring" />
          <div className="absolute -top-6 bg-red-600 text-white font-tech font-bold text-xs uppercase px-3 py-1 rounded-full shadow-[0_0_20px_#ef4444] animate-bounce">
            ⚡ SPIDER-SENSE TINGLING! ⚡
          </div>
        </div>
      )}

      <div
        style={{
          transform: 'perspective(1000px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))',
          transition: 'transform 0.12s ease-out',
          willChange: 'transform',
        }}
        className={`relative rounded-3xl overflow-hidden bg-gradient-to-b from-slate-900/95 via-slate-900/80 to-[#0c0e17]/95 border border-slate-800 transition-shadow duration-200 ${hero.borderGlow} flex flex-col`}
      >
        <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/40">
          <div>
            <span className="text-xs font-tech uppercase tracking-widest text-slate-400 block">
              {hero.universe}
            </span>
            <h3 className="text-xl sm:text-2xl font-bebas text-white tracking-wide">
              {hero.actorName}
            </h3>
          </div>
          <span
            className="text-[10px] font-tech font-bold uppercase px-2.5 py-1 rounded-full border shadow-sm"
            style={{ borderColor: hero.accentColor, color: hero.accentColor }}
          >
            {hero.badge}
          </span>
        </div>

        <div className="relative h-[420px] sm:h-[460px] w-full overflow-hidden bg-black select-none">
          <img
            src={hero.faceImg}
            alt={`${hero.actorName} Unmasked`}
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 w-full h-full object-cover ${hero.facePosition} filter brightness-95 contrast-105`}
          />

          <div className="absolute top-2.5 right-2.5 z-10 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-slate-700 text-[10px] font-tech text-cyan-300 pointer-events-none">
            ACTOR: {hero.actorName.toUpperCase()}
          </div>

          <div
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{
              clipPath: 'polygon(0 0, calc(100% - var(--reveal-pct, 0%)) 0, calc(100% - var(--reveal-pct, 0%)) 100%, 0 100%)',
              willChange: 'clip-path',
            }}
          >
            <img
              src={hero.maskImg}
              alt={`${hero.heroAlias} Suit`}
              loading="lazy"
              decoding="async"
              className={`absolute inset-0 w-full h-full object-cover ${hero.suitPosition} filter contrast-105`}
            />

            <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-red-950/80 backdrop-blur-md border border-red-500/50 text-[10px] font-tech text-red-300 pointer-events-none">
              SUIT: {hero.suitName.toUpperCase()}
            </div>
          </div>

          <div
            className="absolute top-0 bottom-0 w-[3px] bg-gradient-to-b from-cyan-400 via-white to-red-500 pointer-events-none z-20 shadow-[0_0_15px_#ffffff]"
            style={{
              left: 'calc(100% - var(--reveal-pct, 0%))',
            }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-2 border-red-600 shadow-[0_0_10px_#ef4444] flex items-center justify-center text-[8px] font-bold text-black">
              ⚡
            </div>
          </div>

          <div className="absolute bottom-3 inset-x-3 z-20 bg-slate-950/85 backdrop-blur-md rounded-2xl p-3 border border-slate-700/80 shadow-2xl">
            <div className="flex items-center justify-between text-xs font-tech uppercase mb-1.5 pointer-events-none">
              <span className="text-red-400 font-bold flex items-center gap-1">
                <EyeOff className="w-3 h-3" /> Mask
              </span>
              <span className="text-white font-mono">{100 - currentPct}% MASK / {currentPct}% FACE</span>
              <span className="text-cyan-400 font-bold flex items-center gap-1">
                Face <Eye className="w-3 h-3" />
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={currentPct}
              onChange={(e) => onRevealChange(hero.id, Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500 interactive-control"
            />

            <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-800">
              <button
                onClick={() => onRevealChange(hero.id, currentPct > 50 ? 0 : 100)}
                className="text-[11px] font-tech text-slate-300 hover:text-white px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 border border-slate-600 transition-colors flex items-center gap-1.5 interactive-control"
              >
                {currentPct > 50 ? <EyeOff className="w-3 h-3 text-red-400" /> : <Eye className="w-3 h-3 text-cyan-400" />}
                {currentPct > 50 ? 'Equip Mask' : 'Reveal Actor'}
              </button>

              <button
                onClick={() => onTriggerSense(hero.id)}
                className="text-[11px] font-tech text-amber-300 hover:text-amber-200 px-2.5 py-1 rounded-md bg-amber-950/60 hover:bg-amber-900/80 border border-amber-500/40 transition-colors flex items-center gap-1.5 interactive-control"
              >
                <Zap className="w-3 h-3 text-amber-400 animate-pulse" />
                Spider-Sense
              </button>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
          <div>
            <blockquote className="italic text-slate-300 text-sm mb-4 border-l-2 pl-3 py-0.5" style={{ borderColor: hero.accentColor }}>
              {hero.signatureQuote}
            </blockquote>

            <div className="space-y-2.5 mb-5">
              {hero.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="flex justify-between text-[11px] font-tech uppercase text-slate-400 mb-1">
                    <span>{stat.label}</span>
                    <span className="text-white font-mono">{stat.val}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${stat.val}%`,
                        backgroundColor: hero.accentColor,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {hero.features.map((feat, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-tech uppercase px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700"
                >
                  ✦ {feat}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-tech text-slate-400">
            <span>TIMELINE: {hero.year}</span>
            <span className="flex items-center gap-1 text-slate-400">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              MARVEL CANON
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default function SpiderTrioSection() {
  const [revealMap, setRevealMap] = useState({
    tobey: 0,
    andrew: 0,
    tom: 0,
  });

  const [spiderSenseActive, setSpiderSenseActive] = useState({});
  const timeoutRefs = useRef({});

  useEffect(() => {
    const timeouts = timeoutRefs.current;
    return () => {
      Object.values(timeouts).forEach((id) => clearTimeout(id));
    };
  }, []);

  const handleRevealChange = (id, pct) => {
    setRevealMap((prev) => ({
      ...prev,
      [id]: pct,
    }));
  };

  const triggerSpiderSense = (id) => {
    setSpiderSenseActive((prev) => ({ ...prev, [id]: true }));
    if (timeoutRefs.current[id]) {
      clearTimeout(timeoutRefs.current[id]);
    }
    timeoutRefs.current[id] = setTimeout(() => {
      setSpiderSenseActive((prev) => ({ ...prev, [id]: false }));
    }, 1800);
  };

  const setAllReveal = (pct) => {
    setRevealMap({
      tobey: pct,
      andrew: pct,
      tom: pct,
    });
  };

  return (
    <section id="trio-nexus" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/60 border border-red-500/40 text-red-400 text-xs font-tech tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
          <Sparkles className="w-3.5 h-3.5 animate-spin" />
          Multiverse Variant Nexus
        </div>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bebas tracking-wide text-white uppercase drop-shadow-md">
          The Three <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-cyan-400">Spider-Men</span>
        </h2>
        <p className="mt-3 text-slate-400 max-w-2xl mx-auto text-base sm:text-lg font-outfit">
          Hover over each suit or slide across to peel back the Spider-Man mask and reveal the actor beneath.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setAllReveal(0)}
            className="interactive-control px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-red-950/70 border border-slate-700 hover:border-red-500 text-xs font-tech uppercase tracking-wider text-slate-200 transition-all flex items-center gap-2 hover:scale-105 shadow-lg"
          >
            <EyeOff className="w-3.5 h-3.5 text-red-400" />
            Mask All (100% Mask)
          </button>
          <button
            onClick={() => setAllReveal(100)}
            className="interactive-control px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-amber-950/70 border border-slate-700 hover:border-amber-500 text-xs font-tech uppercase tracking-wider text-slate-200 transition-all flex items-center gap-2 hover:scale-105 shadow-lg"
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            Unmask All (100% Face)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
        {SPIDER_HEROES.map((hero) => (
          <SpiderCard
            key={hero.id}
            hero={hero}
            currentPct={revealMap[hero.id] ?? 0}
            onRevealChange={handleRevealChange}
            isSenseOn={spiderSenseActive[hero.id]}
            onTriggerSense={triggerSpiderSense}
          />
        ))}
      </div>
    </section>
  );
}
