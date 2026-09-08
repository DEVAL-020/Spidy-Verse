class SpiderAudioEngine {
  constructor() {
    this.muted = true;
  }

  init() {}
  toggleMute() { return true; }
  isMuted() { return true; }

  playWebThwip() {}
  playSpiderSense() {}
  playMaskReveal() {}
  playPortalPulse() {}
}

export const spiderAudio = new SpiderAudioEngine();
