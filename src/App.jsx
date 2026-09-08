import React, { useState } from 'react';
import ThreePortal from './components/ThreePortal';
import WebShooterCanvas from './components/WebShooterCanvas';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import DialogueBanner from './components/DialogueBanner';
import SpiderTrioSection from './components/SpiderTrioSection';
import SuitVault from './components/SuitVault';
import MultiverseLore from './components/MultiverseLore';
import Footer from './components/Footer';
import BackgroundMusic from './components/BackgroundMusic';
import SplashIntro from './components/SplashIntro';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#06070d] text-slate-100 overflow-x-hidden select-none">
      {!hasEntered && (
        <SplashIntro onEnter={() => setHasEntered(true)} />
      )}
      {hasEntered && (
        <>
          <ThreePortal />
          <WebShooterCanvas />
          <BackgroundMusic />
          <div className="fixed inset-0 pointer-events-none z-[1] web-pattern opacity-60" />
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              <HeroSection />
              <DialogueBanner />
              <SpiderTrioSection />
              <SuitVault />
              <MultiverseLore />
            </main>
            <Footer />
          </div>
        </>
      )}
    </div>
  );
}
