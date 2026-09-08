import React, { useState } from 'react';
import { Shield, Crosshair, Check } from 'lucide-react';

const SUITS = [
  {
    id: 'raimi-classic',
    name: 'Raimi Classic Suit',
    hero: 'Tobey Maguire',
    universe: 'Earth-96283',
    year: '2002',
    img: './assets/spiderman_raimi.jpg',
    color: '#ef4444',
    material: 'Natural Spandex & Screen-printed Foam Latex Webs',
    features: ['Raised Silver Metallic Webbing', 'Reflective Triangular Mirror Lenses', 'Organic Web Channeling'],
    stats: { defense: 88, agility: 92, tech: 60, stealth: 75 },
    description:
      'Handcrafted by Peter Parker after the wrestling arena bout. Iconic for its raised three-dimensional silver webbing and durable multi-layer fabric that weathered encounters with the Green Goblin and Doctor Octopus.',
  },
  {
    id: 'amazing-2',
    name: 'The Amazing Spidey II Suit',
    hero: 'Andrew Garfield',
    universe: 'Earth-120703',
    year: '2014',
    img: './assets/spiderman_amazing.jpg',
    color: '#06b6d4',
    material: 'High-Tensile Poly-Elastane & Oscorp Silicone',
    features: ['Oversized White Bug-Eye Lenses', 'Twin High-Pressure Rotary Web-Shooters', 'Rubberized Insulating Soles'],
    stats: { defense: 84, agility: 98, tech: 86, stealth: 80 },
    description:
      'Engineered specifically for peak acrobatic momentum and high-altitude web swinging across Manhattan skyscrapers. Features modified electro-grounded circuitry to counter Electro’s power surges.',
  },
  {
    id: 'mcu-integrated',
    name: 'MCU Integrated Suit',
    hero: 'Tom Holland',
    universe: 'Earth-199999 / 616',
    year: '2021',
    img: './assets/spiderman_mcu.jpg',
    color: '#f59e0b',
    material: 'Stark Liquid Nanotech & Enchanted Mystical Fabric',
    features: ['Golden Mystic Spider Emblem', 'Nanotech Self-Healing Weave', 'Expressive Mechanical Shutter Lenses'],
    stats: { defense: 96, agility: 94, tech: 98, stealth: 90 },
    description:
      'Forged during the Statue of Liberty multiverse convergence. Combines the red-and-black Upgraded suit with the remnants of the Iron Spider nanotech and Doctor Strange’s dimensional tethering.',
  },
];

export default function SuitVault() {
  const [selectedSuit, setSelectedSuit] = useState(SUITS[0]);

  const handleSelect = (suit) => {
    setSelectedSuit(suit);
  };

  return (
    <section id="suit-vault" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 text-xs font-tech tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
          <Shield className="w-3.5 h-3.5" />
          Multiverse Armory & Tech
        </div>
        <h2 className="text-4xl sm:text-6xl font-bebas tracking-wide text-white uppercase">
          Iconic <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-cyan-400 to-amber-400">Suit Vault</span>
        </h2>
        <p className="mt-3 text-slate-400 max-w-2xl mx-auto text-base sm:text-lg font-outfit">
          Compare the engineering, materials, and specialized gadgetry powering Tobey, Andrew, and Tom across dimensions.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12">
        {SUITS.map((suit) => {
          const isSelected = selectedSuit.id === suit.id;
          return (
            <button
              key={suit.id}
              onClick={() => handleSelect(suit)}
              className={`interactive-control px-5 py-3 rounded-2xl border text-xs sm:text-sm font-tech uppercase tracking-wider transition-all flex items-center gap-2.5 ${
                isSelected
                  ? 'bg-slate-800 border-red-500 text-white shadow-[0_0_25px_rgba(239,68,68,0.4)] scale-105'
                  : 'bg-slate-900/70 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white'
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: suit.color }}
              />
              {suit.name}
              {isSelected && <Check className="w-3.5 h-3.5 text-red-400" />}
            </button>
          );
        })}
      </div>

      <div className="relative rounded-3xl overflow-hidden bg-slate-900/90 border border-slate-800 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 relative group">
            <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-700 shadow-xl bg-black">
              <img
                src={selectedSuit.img}
                alt={selectedSuit.name}
                className="w-full h-full object-cover object-center filter contrast-110 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-md bg-black/70 backdrop-blur-md border border-slate-700 text-xs font-tech text-cyan-300">
                MODEL: {selectedSuit.year} // {selectedSuit.universe}
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-tech text-white">
                <span className="bg-red-600/80 px-2.5 py-1 rounded">PILOT: {selectedSuit.hero}</span>
                <span className="text-slate-300">SYSTEM: ONLINE</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-tech uppercase tracking-widest text-slate-400">
                  {selectedSuit.universe}
                </span>
                <span className="text-xs font-mono text-cyan-400">● VERIFIED STARK/OSCORP DATA</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-bebas text-white tracking-wide mb-3">
                {selectedSuit.name}
              </h3>
              <p className="text-slate-300 font-outfit text-sm sm:text-base leading-relaxed mb-6">
                {selectedSuit.description}
              </p>

              <div className="mb-6 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-xs font-tech uppercase tracking-wider text-slate-400 block mb-1">
                  Material Composition
                </span>
                <p className="text-sm font-outfit text-slate-200 font-medium">{selectedSuit.material}</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {Object.entries(selectedSuit.stats).map(([stat, val]) => (
                  <div key={stat} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-center">
                    <span className="text-[11px] font-tech uppercase text-slate-400 block mb-1">
                      {stat}
                    </span>
                    <span className="text-2xl font-bebas text-white">{val}%</span>
                    <div className="h-1 w-full bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${val}%`, backgroundColor: selectedSuit.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <span className="text-xs font-tech uppercase tracking-wider text-slate-400 block">
                  Integrated Gadgets & Systems
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedSuit.features.map((feature, i) => (
                    <span
                      key={i}
                      className="text-xs font-tech px-3 py-1 rounded-lg bg-slate-800/80 text-slate-200 border border-slate-700 flex items-center gap-1.5"
                    >
                      <Crosshair className="w-3 h-3 text-cyan-400" />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
