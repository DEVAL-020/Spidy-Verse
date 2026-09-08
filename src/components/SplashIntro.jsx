import React, { useState, useEffect } from 'react';

export default function SplashIntro({ onEnter }) {
  const [isExiting, setIsExiting] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [webLines, setWebLines] = useState([]);

  useEffect(() => {
    // Stagger content appearance
    const t1 = setTimeout(() => setShowContent(true), 300);
    const t2 = setTimeout(() => setShowButton(true), 1200);

    // Generate random web lines
    const lines = [];
    for (let i = 0; i < 12; i++) {
      lines.push({
        id: i,
        angle: (i * 30) + Math.random() * 15,
        delay: Math.random() * 2,
        length: 60 + Math.random() * 40,
      });
    }
    setWebLines(lines);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleEnter = () => {
    setIsExiting(true);
    // Dispatch a custom event so BackgroundMusic knows to start
    window.dispatchEvent(new CustomEvent('splash-entered'));
    setTimeout(() => {
      onEnter();
    }, 800);
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-700 ${
        isExiting ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
      }`}
      style={{ backgroundColor: '#040510' }}
    >
      {/* Animated radial web pattern from center */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {webLines.map((line) => (
            <div
              key={line.id}
              className="absolute top-0 left-0 origin-center"
              style={{
                width: '2px',
                height: `${line.length}vh`,
                background: 'linear-gradient(to bottom, rgba(239,68,68,0.3), transparent)',
                transform: `rotate(${line.angle}deg)`,
                animation: `webShoot 2s ${line.delay}s ease-out forwards`,
                opacity: 0,
              }}
            />
          ))}
        </div>

        {/* Pulsing concentric circles */}
        {[1, 2, 3].map((ring) => (
          <div
            key={ring}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-500/20"
            style={{
              width: `${ring * 250}px`,
              height: `${ring * 250}px`,
              animation: `pulseRing 3s ${ring * 0.5}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(4,5,16,0.85) 70%, rgba(4,5,16,1) 100%)',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-2xl">
        {/* Spider emblem placeholder */}
        <div
          className={`mx-auto mb-8 transition-all duration-1000 ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="relative inline-block">
            <svg
              viewBox="0 0 100 100"
              className="w-24 h-24 mx-auto"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Spider symbol */}
              <circle cx="50" cy="50" r="48" stroke="rgba(239,68,68,0.3)" strokeWidth="1" />
              <circle cx="50" cy="50" r="35" stroke="rgba(239,68,68,0.15)" strokeWidth="0.5" />
              {/* Spider body */}
              <ellipse cx="50" cy="42" rx="8" ry="10" fill="#ef4444" opacity="0.9" />
              <ellipse cx="50" cy="56" rx="11" ry="13" fill="#ef4444" opacity="0.9" />
              {/* Spider legs */}
              <path d="M42 42 C35 35, 25 28, 15 22" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
              <path d="M58 42 C65 35, 75 28, 85 22" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
              <path d="M40 48 C32 46, 22 44, 10 42" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
              <path d="M60 48 C68 46, 78 44, 90 42" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
              <path d="M40 55 C32 58, 22 62, 12 68" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
              <path d="M60 55 C68 58, 78 62, 88 68" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
              <path d="M43 62 C38 70, 30 78, 22 85" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
              <path d="M57 62 C62 70, 70 78, 78 85" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
            </svg>
            {/* Glow behind spider */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(239,68,68,0.2) 0%, transparent 70%)',
                filter: 'blur(20px)',
                transform: 'scale(2)',
              }}
            />
          </div>
        </div>

        {/* Title */}
        <h1
          className={`font-bebas text-6xl sm:text-7xl md:text-8xl tracking-wider text-white mb-2 transition-all duration-1000 delay-200 ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            textShadow: '0 0 40px rgba(239,68,68,0.5), 0 0 80px rgba(239,68,68,0.2)',
          }}
        >
          SPIDER-<span className="text-red-500">MAN</span>
        </h1>

        {/* Subtitle */}
        <p
          className={`font-tech text-sm sm:text-base tracking-[0.3em] uppercase text-red-400/80 mb-2 transition-all duration-1000 delay-400 ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          Multiverse Nexus
        </p>

        {/* Divider */}
        <div
          className={`mx-auto w-32 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent mb-6 transition-all duration-1000 delay-500 ${
            showContent ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`}
        />

        {/* Subtitle text */}
        <p
          className={`font-outfit text-slate-400 text-sm sm:text-base mb-10 max-w-md mx-auto transition-all duration-1000 delay-600 ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Three Spider-Men. One Multiverse. An immersive cinematic experience with music, animations, and web-slinging effects.
        </p>

        {/* Enter button */}
        <div
          className={`transition-all duration-700 ${
            showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <button
            onClick={handleEnter}
            className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full font-tech text-base sm:text-lg tracking-[0.2em] uppercase text-white overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #dc2626, #991b1b)',
              boxShadow: '0 0 40px rgba(239,68,68,0.4), 0 0 80px rgba(239,68,68,0.15), inset 0 1px 0 rgba(255,255,255,0.1)',
            }}
          >
            {/* Shimmer effect */}
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                animation: 'shimmer 2s infinite',
              }}
            />

            {/* Button content */}
            <svg className="w-5 h-5 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
            </svg>
            <span className="relative z-10 font-bold">Enter the Multiverse</span>

            {/* Pulse rings */}
            <span className="absolute inset-0 rounded-full border-2 border-red-400/30 spider-sense-ring" />
            <span className="absolute inset-0 rounded-full border border-red-400/20 spider-sense-ring" style={{ animationDelay: '0.5s' }} />
          </button>

          {/* Hint text */}
          <p className="mt-5 text-[11px] font-tech text-slate-500 tracking-widest uppercase flex items-center justify-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500/60 animate-pulse" />
            Click to enter with music & sound
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500/60 animate-pulse" />
          </p>
        </div>
      </div>

      {/* Inline keyframes */}
      <style>{`
        @keyframes webShoot {
          0% { opacity: 0; height: 0; }
          50% { opacity: 0.6; }
          100% { opacity: 0.15; height: ${100}vh; }
        }
        @keyframes pulseRing {
          0%, 100% { opacity: 0.15; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.3; transform: translate(-50%, -50%) scale(1.08); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
