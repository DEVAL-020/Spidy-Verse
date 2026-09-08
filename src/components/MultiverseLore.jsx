import React from 'react';
import { Calendar, Sparkles } from 'lucide-react';

const TIMELINE_EVENTS = [
  {
    year: '2002 – 2007',
    actor: 'Tobey Maguire',
    title: 'The Raimi Trilogy: The Birth of Cinema Spider-Man',
    desc: 'Bitten by a genetically altered super-spider, high school student Peter Parker learns that with great power comes great responsibility. Facing the Green Goblin, Doctor Octopus, and the alien Symbiote.',
    color: '#ef4444',
    badge: 'Earth-96283',
    quote: '"I believe there\'s a hero in all of us, that keeps us honest, gives us strength, makes us noble."',
  },
  {
    year: '2012 – 2014',
    actor: 'Andrew Garfield',
    title: 'The Amazing Spider-Man: The Oscorp Conspiracy',
    desc: 'Uncovering the truth of his parents disappearance while fighting the Lizard and Electro. Known for electrifying acrobatic speed, heartfelt humanity, and surviving profound heartbreak.',
    color: '#06b6d4',
    badge: 'Earth-120703',
    quote: '"You\'re Spider-Man, and I love that. But I love Peter Parker more."',
  },
  {
    year: '2016 – Present',
    actor: 'Tom Holland',
    title: 'The Marvel Cinematic Universe: The Cosmic Avenger',
    desc: 'Recruited by Tony Stark, battle veteran on Titan against Thanos, fighting Mysterio in Europe, and ultimately facing the shattering of the Multiverse in New York City.',
    color: '#f59e0b',
    badge: 'Earth-199999',
    quote: '"When you can do the things that I can, but you don\'t, and then the bad things happen... they happen because of you."',
  },
  {
    year: '2021',
    actor: 'The Trio Convergence',
    title: 'Spider-Man: No Way Home // The Multiverse Nexus',
    desc: 'A spell gone awry breaches the boundaries between dimensions. Peter-One, Peter-Two, and Peter-Three stand together atop the Statue of Liberty, curing their greatest foes and healing generations.',
    color: '#a855f7',
    badge: 'Nexus Event',
    quote: '"I love you guys!" — "Thank you."',
  },
];

export default function MultiverseLore() {
  return (
    <section id="multiverse-lore" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-400 text-xs font-tech tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
          <Sparkles className="w-3.5 h-3.5" />
          Dimensional Archives
        </div>
        <h2 className="text-4xl sm:text-6xl font-bebas tracking-wide text-white uppercase">
          Multiverse <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-500">Chronology</span>
        </h2>
        <p className="mt-3 text-slate-400 max-w-2xl mx-auto text-base sm:text-lg font-outfit">
          From Queens to Titan to the Statue of Liberty: explore the key chapters of the three cinematic Spider-Men.
        </p>
      </div>

      <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
        {TIMELINE_EVENTS.map((event, idx) => (
          <div
            key={idx}
            className="group relative rounded-3xl p-6 sm:p-8 bg-slate-900/80 border border-slate-800 hover:border-slate-600 transition-all duration-300 hover:scale-[1.01] shadow-xl backdrop-blur-md"
          >
            <div
              className="absolute left-0 top-6 bottom-6 w-1.5 rounded-r-full"
              style={{ backgroundColor: event.color }}
            />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-3">
                <span
                  className="text-xs font-tech font-bold uppercase px-3 py-1 rounded-full border"
                  style={{ borderColor: event.color, color: event.color }}
                >
                  {event.badge}
                </span>
                <span className="text-sm font-tech text-slate-400 font-bold">{event.actor}</span>
              </div>
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                {event.year}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bebas text-white tracking-wide mb-2">
              {event.title}
            </h3>

            <p className="text-slate-300 font-outfit text-sm sm:text-base leading-relaxed mb-4">
              {event.desc}
            </p>

            <blockquote
              className="italic text-slate-400 text-xs sm:text-sm border-l-2 border-slate-700 pl-3 py-1"
            >
              {event.quote}
            </blockquote>
          </div>
        ))}
      </div>
    </section>
  );
}
